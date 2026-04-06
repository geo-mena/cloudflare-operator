# Deleting a Tunnel

Remember the delete order while deleting the tunnel.

If you delete the secrets before deleting the tunnel, the operator won't be able to clean up the tunnel from Cloudflare, since it no longer has the credentials for the same.

::: warning Correct deletion order
1. Delete the Tunnel/ClusterTunnel resource
2. Wait for it to actually get deleted (after the finalizer is removed)
3. Then delete the secret
:::
