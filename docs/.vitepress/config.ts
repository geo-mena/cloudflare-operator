import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid(defineConfig({
  title: 'Cloudflare Operator',
  description: 'A Kubernetes Operator to create and manage Cloudflare Tunnels and DNS records',
  lang: 'en-US',
  lastUpdated: true,
  srcDir: './src',
  outDir: './dist',
  cleanUrls: true,

  markdown: {
    theme: {
      dark: 'github-dark',
      light: 'github-light',
    },
  },

  head: [
    ['meta', { name: 'author', content: 'geomena' }],
    ['meta', { name: 'keywords', content: 'cloudflare, operator, kubernetes, tunnel, dns, k8s' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#f48120' }],
    ['meta', { property: 'og:title', content: 'Cloudflare Operator Docs' }],
    ['meta', { property: 'og:description', content: 'A Kubernetes Operator to create and manage Cloudflare Tunnels and DNS records' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'Cloudflare Operator',

    nav: [
      { text: 'Guide', link: '/getting-started/' },
      { text: 'Configuration', link: '/configuration/operator' },
      { text: 'Examples', link: '/examples/authentication' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Getting Started', link: '/getting-started/' },
          { text: 'Deletion', link: '/getting-started/deletion' },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Operator', link: '/configuration/operator' },
          { text: 'Tunnel & ClusterTunnel', link: '/configuration/tunnel-and-cluster-tunnel' },
          { text: 'TunnelBinding', link: '/configuration/tunnel-binding' },
          { text: 'AccessTunnel', link: '/configuration/access-tunnel' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Authentication', link: '/examples/authentication' },
          { text: 'Deploy a Tunnel', link: '/examples/tunnel-simple' },
          { text: 'TunnelBinding (Simple)', link: '/examples/tunnel-binding-simple' },
          { text: 'TunnelBinding (Reverse Proxy)', link: '/examples/tunnel-binding-reverse-proxy' },
        ],
      },
      {
        text: 'Migrations',
        items: [
          { text: 'Overview', link: '/migrations/' },
          { text: 'CRD v1alpha2', link: '/migrations/crd-v1alpha2' },
          { text: 'Operator v0.9', link: '/migrations/operator-v0.9' },
          { text: 'Operator v0.13', link: '/migrations/operator-v0.13' },
        ],
      },
    ],

    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'Copyright 2024-present geomena',
    },

    editLink: {
      pattern: 'https://github.com/geo-mena/cloudflare-operator/edit/main/docs/src/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geo-mena/cloudflare-operator' },
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          searchOptions: {
            fuzzy: 0.3,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 },
          },
        },
      },
    },
  },
}));
