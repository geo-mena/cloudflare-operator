# CRD Migration to v1alpha2

[PR #145](https://github.com/geo-mena/cloudflare-operator/pull/145) (operator release 0.13.0) introduced `v1alpha2` for Tunnel and ClusterTunnel resources.

## Removed fields

The following fields were removed from `Cluster/Tunnel.Spec`:

- `image`
- `size`
- `nodeSelectors`
- `tolerations`

## New `deployPatch` field

In place of the removed fields, a new `deployPatch` field is introduced. This allows any [kubectl style json/yaml patches](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_patch/) to be applied to the `cloudflared` deployment, making any changes needed by the user possible without a CRD update.

Existing `v1alpha1` CRDs are automatically migrated to `v1alpha2` (now the default storage version).

## Example

```yaml
apiVersion: networking.cfargotunnel.com/v1alpha2
kind: ClusterTunnel
...
spec:
  deployPatch: |
    spec:
      replicas: 2                     # instead of size
      template:
        spec:
          tolerations: ...            # tolerations as before
          nodeSelector: ...           # note: singular (not nodeSelectors)
          containers:
          - name: cloudflared         # use cloudflared name to select the container
            image: ...               # image as before
...
```
