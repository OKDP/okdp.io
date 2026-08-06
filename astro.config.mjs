// @ts-check

import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

import { defaultLocale, locales } from "./src/i18n/config";

const site = process.env.ASTRO_SITE ?? "https://okdp.io";
const base = process.env.ASTRO_BASE ?? "/";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: { plugins: [tailwindcss()] },
  integrations: [
    starlight({
      title: "Open Kubernetes Data Platform",
      favicon: "/okdp-notext.svg",
      logo: {
        src: "./src/assets/logos/okdp-notext.svg",
        alt: "OKDP",
      },
      components: {
        SiteTitle: "./src/components/docs/SiteTitle.astro",
      },

      defaultLocale,
      locales,
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/OKDP/" },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "reference" } }],
        },
      ],
    }),
  ],
});
