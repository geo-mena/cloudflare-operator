# Deploy a Cloudflare Tunnel

> This builds on the [Getting Started guide](/getting-started/), and it is recommended to read that first.

This example shows how to deploy a Cloudflare Tunnel/ClusterTunnel. This resource will generate a cloudflared deployment for you.

Once deployed, you can set up routing with a TunnelBinding. See the TunnelBinding examples for how to set up routing.

## Motivation

In order to route traffic from the internet to your cluster, a Tunnel/ClusterTunnel must be created. This resource manages a deployment of one or more cloudflared pods which create an outbound connection to Cloudflare's edge servers. When this outbound connection is established, cloudflared can route traffic from Cloudflare domains to cloudflared.

**Tunnels** and **ClusterTunnels** are almost identical. A Tunnel is simply a namespaced version of a ClusterTunnel (same abstraction as cert-manager's Issuer/ClusterIssuer). The practical difference is that TunnelBindings for a Tunnel must be in the same namespace, while a ClusterTunnel can be referenced from any namespace.

## Prerequisites

1. `kubectl` is installed
2. [You have deployed a secret for authentication](/examples/authentication)
3. [You have deployed cloudflare-operator](/getting-started/)

## Steps

1. Decide whether you want a **Tunnel** or **ClusterTunnel**.

2. Replace all placeholder values formatted `<like-this>` in your manifest:
   - `<email-address>`: email associated with your Cloudflare zone
   - `<domain>`: domain of your Cloudflare zone
   - `<secret-name>`: name of the secret containing your credentials
   - `<account-id>`: your Cloudflare account ID

3. Deploy your Tunnel/ClusterTunnel:
   ```bash
   # execute one of these, not both
   kubectl apply -f manifests/tunnel.yaml
   kubectl apply -f manifests/cluster-tunnel.yaml
   ```

4. Verify the resource was created:

   ```bash
   kubectl get clustertunnel
   kubectl get tunnel -n cloudflare-operator-system
   # NAME                 TUNNELID
   # k3s-cluster-tunnel   <uuid>
   ```

   ```bash
   kubectl get configmap k3s-cluster-tunnel -n cloudflare-operator-system
   # NAME                 DATA   AGE
   # k3s-cluster-tunnel   1      5m
   ```

   ```bash
   kubectl get deployment k3s-cluster-tunnel -n cloudflare-operator-system
   # NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
   # k3s-cluster-tunnel   1/1     1            1           5m
   ```

## Next steps

- [TunnelBinding (simple)](/examples/tunnel-binding-simple)
- [TunnelBinding (with reverse proxy)](/examples/tunnel-binding-reverse-proxy)
