# Operator Migration to v0.9

## Migrating from pre v0.9

Pre v0.9.x versions utilized service annotations with a service controller instead of the TunnelBinding resource. All the annotations neatly map to the custom resource definitions, and multiple services on the same tunnel can be mapped using a single TunnelBinding custom resource.

### Service annotations (deprecated)

The following annotations are no longer supported:

| Annotation | Description | Default |
|---|---|---|
| `cfargotunnel.com/tunnel` or `cfargotunnel.com/cluster-tunnel` | Name of the Tunnel/ClusterTunnel CRD | Required |
| `cfargotunnel.com/fqdn` | DNS name for the service | `service.name` + `tunnel.spec.domain` |
| `cfargotunnel.com/proto` | Protocol (`http`, `https`, `tcp`, `udp`, `ssh`, `rdp`) | `http` (with smart defaults for known ports) |
| `cfargotunnel.com/target` | Proxy target | `<protocol>://<service>.<namespace>.svc:<port>` |
| `cfargotunnel.com/caPool` | CA certificate key in the tunnel secret | - |
| `cfargotunnel.com/noTlsVerify` | Disable TLS verification | `false` |

Migrate these annotations to [TunnelBinding resources](/configuration/tunnel-binding).
