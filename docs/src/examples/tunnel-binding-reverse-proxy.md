# Bring Your Own Reverse Proxy

> This builds on the [Getting Started guide](/getting-started/), and it is recommended to read that first.

This example configures cloudflared to send all traffic to a reverse proxy, and then configure routing in the reverse proxy.

```
+----------------------+
|   internet users     |
+----------------------+
           |
           v
+----------------------+
|  cloudflare tunnel   |
+----------------------+
           |
           v
+----------------------+
|    reverse proxy     |
+----------------------+
     |           |
     v           v
+---------+ +----------+
| App #1  | |  App #2  |
+---------+ +----------+
```

## Motivation

Cloudflare tunnels can forward traffic to an existing reverse proxy. This is useful when:

- You have significant existing reverse proxy configuration
- You require reverse proxy functionality that cloudflared does not have
- You want to keep reverse proxy configuration modular
- You use a service mesh with its own ingress implementation
- You have multiple load balancers pointing at your ingress (e.g., metallb + DNS entries for same-network access)

## What we'll set up

1. Deploy cloudflare-operator and configure a cluster tunnel
2. Deploy ingress-nginx as a reference reverse proxy, pointing the tunnel to it
3. Deploy an example application behind nginx with an ingress resource

## Prerequisites

1. `kubectl` is installed
2. `kustomize` is installed
3. `helm` is installed
4. [Authentication secret deployed](/examples/authentication)
5. [Cloudflare-operator installed](/getting-started/)
6. [Tunnel/ClusterTunnel deployed](/examples/tunnel-simple)

## Steps

1. Replace all `<like-this>` placeholder values:
   - In `manifests/hello/ingress.yaml` - `<domain>`: your Cloudflare zone domain
   - In `manifests/cloudflare-operator/tunnel-binding.yaml` - `<domain>`: same domain

2. Deploy the TunnelBinding:
   ```shell
   kubectl apply -f manifests/tunnel-binding.yaml
   ```

3. Deploy the reverse proxy:
   ```shell
   kustomize build --enable-helm manifests/ingress-nginx | kubectl apply -f -
   ```

4. Deploy the example application:
   ```shell
   kubectl apply -f manifests/hello/
   ```

5. Access the service on `hello.<domain>`

## Extending this example

### Custom SSO

Example using ingress-nginx and authelia:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: <app>
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/auth-method: "GET"
    nginx.ingress.kubernetes.io/auth-url: "http://authelia.authelia.svc.cluster.local:8080/api/authz/auth-request"
    nginx.ingress.kubernetes.io/auth-signin: "https://authelia.<domain>?rm=$request_method"
    nginx.ingress.kubernetes.io/auth-response-headers: "Remote-User,Remote-Name,Remote-Groups,Remote-Email"
```

### Using cloudflared for routing alongside ingress-nginx

You can add routes that bypass the reverse proxy when needed:

```yaml
apiVersion: networking.cfargotunnel.com/v1alpha1
kind: TunnelBinding
metadata:
  name: authelia
  namespace: authelia
subjects:
  - name: authelia
tunnelRef:
  kind: ClusterTunnel
  name: example-tunnel
---
apiVersion: networking.cfargotunnel.com/v1alpha1
kind: TunnelBinding
metadata:
  # Prefix with zz- to ensure this is the last route in cloudflared's config
  # (cloudflared processes routes in order)
  name: zz-ingress-nginx
subjects:
  - name: wildcard
    spec:
      fqdn: "*.<domain>"
      target: https://ingress-nginx-controller.ingress-nginx.svc.cluster.local:443
tunnelRef:
  kind: ClusterTunnel
  name: example-tunnel
```
