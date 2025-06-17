import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { ion } from "starlight-ion-theme";
import icon from "astro-icon";
import { siteConfig } from "./site.config.js";

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
        light: "./src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      head: [
        {
          tag: 'script',
          content:
            "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" + siteConfig.gtmId + "');",
        },
      ],
      // social: {
      //   github: "https://github.com/Omedia/mcp-server-drupal",
      // },
      defaultLocale: "en",
      locales: {
        en: {
          label: "English",
        },
        // fr: {
        //   label: "Français",
        // },
        // es: {
        //   label: "Español",
        // },
        // de: {
        //   label: "Deutsch",
        // },
        // ja: {
        //   label: "日本語",
        // },
      },
      sidebar: [
        {
          label: "Introduction",
          items: [
            { label: "What is MCP?", slug: "introduction/what-is-mcp" },
            {
              label: "Drupal as an MCP Server",
              slug: "introduction/drupal-as-an-mcp-server",
            },
            { label: "Key Components", slug: "introduction/key-components" },
          ],
        },
        {
          label: "MCP Server",
          items: [
            { label: "Setup & Configure", slug: "mcp-server/setup-configure" },
            {
              label: "Connect to LLMs",
              items: [
                {
                  label: "Connect to LLMs",
                  slug: "mcp-server/connect-to-llms",
                },
                {
                  label: "Streamable HTTP",
                  slug: "mcp-server/streamable-http",
                },
                {
                  label: "STDIO Transport",
                  slug: "mcp-server/stdio-transport",
                },
              ],
            },
            { label: "What next?", slug: "mcp-server/what-next" },
          ],
        },
        {
          label: "Plugins",
          items: [
            { label: "AI Agents", slug: "plugin-config/ai-plugins" },
            { label: "Dev Tools", slug: "plugin-config/dev-tools" },
            {
              label: "ECA Actions",
              slug: "plugin-config/eca-actions",
              badge: { text: "Soon", variant: "caution" },
            },
          ],
        },
        {
          label: "Developers",
          items: [
            {
              label: "Concepts & Architecture",
              slug: "developers/concepts-architecture",
            },
            { label: "Create your Plugin", slug: "developers/create-plugin" },
            { label: "Contributing", slug: "developers/contributing" },
            { label: "🚀 Roadmap", slug: "roadmap" },
          ],
        },
        // {
        //   label: "Resources",
        //   items: [
        //     { label: "FAQ", slug: "resources/faq" },
        //     { label: "Community", slug: "resources/community" },
        //   ],
        // },
      ],
      customCss: ["./src/styles/drupal.css"],
      plugins: [ion({})],
      components: {
        SkipLink: "./src/components/SkipLink.astro",
      },
    }),
    icon(),
  ],
});
