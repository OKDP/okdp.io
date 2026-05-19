# OKDP.io

<div align="center">
  <img src="https://raw.githubusercontent.com/OKDP/OKDP/main/logo/inverted/okdp-inverted.png" alt="OKDP Logo" width="320" />

  <br/>

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Website](https://img.shields.io/badge/website-okdp.io-informational)](https://okdp.io)

</div>

**Website for [OKDP](https://okdp.io) (Open Kubernetes Data Platform).**
A free, open-source, cloud-native data platform built on Kubernetes. Modular, sovereign, and community-driven.

## About the Site

This repository contains the source of the **okdp.io** marketing website, a bilingual (FR/EN) static site showcasing the OKDP platform, its architecture, modules, and roadmap.

## Development

```bash
# Install dependencies
npm install

# Generate HTML from templates, then start the dev server
npm run dev
```

`npm run dev` runs two steps in sequence:
1. `npm run generate`: compiles Handlebars templates with locale data from `src/locales`
2. `vite`: starts the dev server with hot reload

## Build

```bash
npm run build   # generate + vite build -> outputs to dist/
npm run preview # preview the production build locally
```

## Community

- Organization: [TOSIT Association](https://tosit.fr)
- Communication: [Github discussion](https://github.com/orgs/OKDP/discussions)
