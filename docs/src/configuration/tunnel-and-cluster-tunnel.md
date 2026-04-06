# Tunnel and ClusterTunnel Configuration

The Tunnel and the ClusterTunnel have the exact same configuration options. The best way to get the latest documentation on them is to run:

```bash
kubectl explain tunnel.spec
```

Here is an overview of a ClusterTunnel as YAML for `v1alpha2`. Also look at the [v1alpha2 migration docs](/migrations/crd-v1alpha2).

```yaml
apiVersion: networking.cfargotunnel.com/v1alpha2
kind: ClusterTunnel     # or Tunnel
metadata:
  name: tunnel-cr-name
spec:
  # Cloudflare details
  cloudflare:
    ## AccountName and AccountId cannot be both empty.
    ## If both are provided, Account ID is used if valid, else falls back to Account Name
    accountId: account-id
    accountName: Account Name
    domain: example.com
    email: admin@example.com
    # Cloudflare credentials secret, and its key overrides (all optional)
    secret: cloudflare-secrets
    CLOUDFLARE_API_TOKEN: CLOUDFLARE_API_TOKEN
    CLOUDFLARE_API_KEY: CLOUDFLARE_API_KEY
    CLOUDFLARE_TUNNEL_CREDENTIAL_FILE: CLOUDFLARE_TUNNEL_CREDENTIAL_FILE
    CLOUDFLARE_TUNNEL_CREDENTIAL_SECRET: CLOUDFLARE_TUNNEL_CREDENTIAL_SECRET

  # Either existingTunnel or newTunnel can be specified, not both
  newTunnel:
    name: new-tunnel
  existingTunnel:
    id: <tunnel-id>
    name: existing-tunnel

  # cloudflared configuration
  fallbackTarget: http_status:404
  noTlsVerify: false
  originCaPool: homelab-ca
  deployPatch: |
    spec:
      replicas: 2
      template:
        spec:
          containers:
            - name: cloudflared
              image: cloudflare/cloudflared:2025.4.0
```
