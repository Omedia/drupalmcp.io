import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { ion } from "starlight-ion-theme";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/en",
  },
  integrations: [
    starlight({
      title: "Drupal MCP",
      logo: {
        src: "./src/assets/logo.svg",
      },
      social: {
        github: "https://github.com/Omedia/mcp-server-drupal",
      },
      defaultLocale: "en",
      locales: {
        en: {
          label: "English",
        },
        fr: {
          label: "Français",
        },
        es: {
          label: "Español",
        },
        de: {
          label: "Deutsch",
        },
        ja: {
          label: "日本語",
        },
      },
      sidebar: [
        {
          label: "About",
          items: [{ label: "About", slug: "about" }],
        },
        {
          label: "Guides",
          items: [{ label: "Example Guide", slug: "guides/example" }],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      customCss: ["./src/styles/drupal.css"],
      plugins: [ion()],
    }),
  ],
});
