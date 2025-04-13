import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { ion } from "starlight-ion-theme";

// https://astro.build/config
export default defineConfig({
  site: "https://drupalmcp.io",
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
          label: "Introduction",
          items: [{ label: "Introduction", slug: "introduction" }],
        },
        {
          label: "Quick Setup",
          items: [{ label: "Quick Setup", slug: "quick-setup" }],
        },
        {
          label: "Guides",
          items: [{ label: "Guides", slug: "guides" }],
        },
        {
          label: "Drupal MCP Server",
          items: [{ label: "Drupal MCP Server", slug: "drupal-mcp-server" }],
        },
        {
          label: "Drupal MCP Client",
          items: [{ label: "Drupal MCP Client", slug: "drupal-mcp-client" }],
        },
        {
          label: "STDIO Binary",
          items: [{ label: "STDIO Binary", slug: "stdio-binary" }],
        },
      ],
      customCss: ["./src/styles/drupal.css"],
      plugins: [ion()],
    }),
  ],
});
