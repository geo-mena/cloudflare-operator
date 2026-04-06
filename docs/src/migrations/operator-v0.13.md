# Operator Migration to v0.13

See the [CRD migration guide](/migrations/crd-v1alpha2) for CRD migration details.

## New requirements

- [`cert-manager`](https://cert-manager.io/docs/installation/) >= v1.0 needs to be installed to get certificates for the webhook server.

::: tip Static certificates
Static certificates can be used, but configuring them is outside the scope of this project. The `webhook-server-cert` needs to be created and the webhook configurations need the correct CA bundle.
:::

## Changes in defaults

- The `cloudflared` image defaults to the `:latest` tag.
