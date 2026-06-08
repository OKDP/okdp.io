# OKDP.io

<div align="center">
  <img src="https://raw.githubusercontent.com/OKDP/OKDP/main/logo/inverted/okdp-inverted.png" alt="OKDP Logo" width="320" />

  <br/>

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Website](https://img.shields.io/badge/website-okdp.io-informational)](https://okdp.io)

</div>

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

## Preview deployments from forks

To let contributors share a live preview without deploying anything in the upstream `OKDP` organization, the repository includes a fork-only GitHub Actions workflow in `.github/workflows/preview.yml`.

### How it works

- it runs on every push to a non-`master` branch in a fork
- it publishes the built site to the fork's `gh-pages` branch under `previews/<branch-slug>/`
- it is skipped automatically in the upstream `OKDP/okdp.io` repository
- it removes the production `CNAME` file before publishing, so a fork preview never tries to claim `okdp.io`

### One-time setup in a fork

1. Fork `OKDP/okdp.io`
2. In the fork, enable GitHub Actions if prompted
3. In **Settings → Pages**, configure GitHub Pages to deploy from the `gh-pages` branch (root)
4. Push your feature branch to the fork

Your preview will then be available at:

```text
https://<fork-owner>.github.io/<fork-repo-name>/previews/<branch-slug>/
```

When opening a pull request against upstream, you can paste that preview URL into the PR description.

## Community

- Organization: [TOSIT Association](https://tosit.fr)
- Communication: [Github discussion](https://github.com/orgs/OKDP/discussions)
