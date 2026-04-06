# Getting Started

## Prerequisites

To install this operator, you need the following:

- `kubectl`
- `kustomize` (Optional)
- A Kubernetes cluster with a recent enough version to support Custom Resource Definitions. The operator was initially built on `v1.22.5+k3s1` and being developed on `v1.25.4+k3s1`.

## Installation methods

### Declarative installation (recommended)

1. Find the [latest tag for cloudflare-operator](https://github.com/geo-mena/cloudflare-operator/tags).
2. Create a `kustomization.yaml` in your repository:
   ```yaml
   apiVersion: kustomize.config.k8s.io/v1beta1
   kind: Kustomization
   namespace: cloudflare-operator-system
   resources:
     # ensure you update the ref to the latest version
     - https://github.com/geo-mena/cloudflare-operator.git/config/default?ref=v0.13.1
   ```

3. Deploy the application:
   ```bash
   # either approach will work
   kubectl apply -k .
   kustomize build . | kubectl apply -f -
   ```

If you need to customize the operator, [you can do so with kustomize](https://glasskube.dev/blog/patching-with-kustomize/).

### Imperative installation

For a one-off installation, you can use any of the following methods.

#### Install a specific tag

In general, one should pick a specific tag. [You can find the latest tag here](https://github.com/geo-mena/cloudflare-operator/tags).

```bash
kubectl apply -k 'https://github.com/geo-mena/cloudflare-operator.git//config/default?ref=v0.13.1'
```

#### Install the latest version

To install the latest version without checking tags:

```bash
kubectl apply -k 'https://github.com/geo-mena/cloudflare-operator.git/config/default?ref=main'
kubectl apply -k 'https://github.com/geo-mena/cloudflare-operator/config/default'
```

## Next steps

Now that the operator is installed, we can make it useful:

1. [Deploy a secret with your API token](/examples/authentication)
2. [Create a Tunnel/ClusterTunnel resource](/examples/tunnel-simple)
3. Configure routing for your tunnel:
   - [Configure routing directly (simple)](/examples/tunnel-binding-simple)
   - [Configure routing with a reverse proxy](/examples/tunnel-binding-reverse-proxy)

## Additional info

- Check the [Configuration](/configuration/operator) section to understand configurable parameters.
- Check the [Migrations](/migrations/) section for upgrade guides.
