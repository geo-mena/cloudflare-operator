# TunnelBinding Configuration

The TunnelBinding resource, inspired by RoleBinding, uses a similar structure with `subjects` (target services to tunnel) and `tunnelRef` (what tunnel to use).

For the latest schema, use:

```bash
kubectl explain tunnelbinding.subjects
kubectl explain tunnelbinding.tunnelRef
```

## Options

- **`tunnelRef.disableDNSUpdates`**: Disables DNS record updates by the controller. You need to manually add the CNAME entries pointing to the tunnel domain (`tunnel-id.cfargotunnel.com`). The tunnel ID can be found using `kubectl get clustertunnel/tunnel <tunnel-name>`. You can also use [proxied wildcard domains](https://blog.cloudflare.com/wildcard-proxy-for-everyone/) to CNAME `*.domain.com` to your tunnel domain.

## Example

```yaml
apiVersion: networking.cfargotunnel.com/v1alpha1
kind: TunnelBinding
metadata:
  name: svc-binding
subjects:
  - kind: Service # Default
    name: svc01
    spec:
      fqdn: mysvc.example.com
      protocol: http
      target: http://svc01.ns.svc.cluster.local:8080
      caPool: custom.crt
      noTlsVerify: false
  - name: svc02  # Points to the second service
tunnelRef:
  kind: Tunnel # Or ClusterTunnel
  name: k3s-tunnel
  disableDNSUpdates: false
```
