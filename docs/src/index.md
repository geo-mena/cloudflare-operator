---
layout: home

hero:
  name: Cloudflare Operator
  text: Kubernetes Tunnels & DNS, Automated
  tagline: A Kubernetes Operator to create and manage Cloudflare Tunnels and DNS records for HTTP/TCP/UDP Service Resources.
  image:
    src: /CloudflareOperatorLogo.png
    alt: Cloudflare Operator Logo
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started/
    - theme: alt
      text: View on GitHub
      link: https://github.com/geo-mena/cloudflare-operator

features:
  - title: Tunnel Management
    details: Create new or use existing Cloudflare Tunnels via Custom Resources. Supports both Namespace (Tunnel) and Cluster (ClusterTunnel) scoped resources.
  - title: Automatic DNS
    details: Automatically creates and manages DNS records in Cloudflare when TunnelBinding resources are configured.
  - title: Scalable cloudflared
    details: Runs a managed, scalable Deployment of cloudflared with automatic ConfigMap management.
  - title: Flexible Routing
    details: Route traffic directly via cloudflared or through your own reverse proxy like ingress-nginx with TunnelBinding resources.
  - title: Cross-Cluster Access
    details: Use AccessTunnel to expose services across clusters using Cloudflare's Arbitrary TCP Access.
  - title: API Version Migration
    details: Built-in conversion webhooks for seamless v1alpha1 to v1alpha2 migration.
---

::: warning
This project is currently in **Alpha**.
:::

## Overview

The Cloudflare Operator provides a Kubernetes-native way of dynamically deploying the [cloudflared](https://github.com/cloudflare/cloudflared) daemon. Built using `operator-sdk`, once deployed it provides:

- **Tunnel/ClusterTunnel CRDs** - Accept a Secret for Cloudflare API Tokens, run a scaled Deployment of `cloudflared`, and manage ConfigMaps automatically
- **TunnelBinding controller** - Updates cloudflared configuration, restarts deployments, and manages DNS entries with proper cleanup via Finalizers
- **AccessTunnel CRD** - Enables cross-cluster service connectivity through Cloudflare's TCP Access

## Architecture

![Operator Architecture](/OperatorArchitecture.png)

::: info
This is **NOT** an official operator provided by Cloudflare Inc. It utilizes their [v4 API](https://api.cloudflare.com/) and their [`cloudflared`](https://github.com/cloudflare/cloudflared) to automate setting up of tunnels on Kubernetes.
:::
