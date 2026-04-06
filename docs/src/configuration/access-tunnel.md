# AccessTunnel Configuration

[Arbitrary TCP Access](https://developers.cloudflare.com/cloudflare-one/applications/non-http/cloudflared-authentication/arbitrary-tcp/) allows you to share a workload running on one cluster to be accessed by a service in another cluster that do not have local/tunnel connectivity between them. For example, a database running on cluster A exposed on port 5432 can be accessed by an application running on cluster B.

## Expose the service as a tunnel

In the source cluster, expose the service using a TunnelBinding with the protocol `tcp`. Cloudflare docs suggest `rdp`, `smb`, `ssh` work as well, but these have not been tested. `udp` is supported in the tunnel, but the access side currently does not support it.

::: warning
The protocol needs to be **TCP**. Leaving it empty would use the default of HTTP, which will not work with Access.
:::

::: danger
Creating a tunnel like this makes it available on the internet for anyone to access. Make sure the application is secure, or secure it by using [Cloudflare Access ZTNA](https://developers.cloudflare.com/cloudflare-one/). If using ZTNA, make sure to supply the Service Token.
:::

### Example: expose a postgres db on the source cluster

```yaml
apiVersion: networking.cfargotunnel.com/v1alpha1
kind: TunnelBinding
metadata:
  name: postgres
subjects:
  - kind: Service
    name: postgres
    spec:
      fqdn: db.example.com
      protocol: tcp
tunnelRef:
  kind: Tunnel
  name: k3s-tunnel
```

## Create an AccessTunnel on the client cluster

```yaml
apiVersion: networking.cfargotunnel.com/v1alpha1
kind: AccessTunnel
metadata:
  name: postgres
target:
  fqdn: db.example.com
  protocol: tcp
  svc:
    port: 5432
# serviceToken:             # Optional, needed if secured with Cloudflare Access
#   secretRef: nameOfSecret
#   CLOUDFLARE_ACCESS_SERVICE_TOKEN_ID: CLOUDFLARE_ACCESS_SERVICE_TOKEN_ID
#   CLOUDFLARE_ACCESS_SERVICE_TOKEN_TOKEN: CLOUDFLARE_ACCESS_SERVICE_TOKEN_TOKEN
```

The client cluster should now be able to connect to `postgres.default.svc:5432` and reach the source cluster's database.
