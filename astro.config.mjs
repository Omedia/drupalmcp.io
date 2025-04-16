import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { ion } from "starlight-ion-theme";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://drupalmcp.io",
  redirects: {
    "/": "/en",
  },
  integrations: [starlight({
    title: "Drupal MCP",
    logo: {
      light: "./src/assets/logo-light.svg",
      dark: "./src/assets/logo-dark.svg",
      replacesTitle: true,
    },
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
          { label: "Drupal as an MCP Server", slug: "introduction/drupal-as-an-mcp-server" },
          { label: "Key Components", slug: "introduction/key-components" }
        ],
      },
      {
        label: "MCP Server",
        items: [
          { label: "Setup & Configure", slug: "mcp-server/setup-configure" },
          { label: "Connect to LLMs", slug: "mcp-server/connect-to-llms" },
          { label: "What next?", slug: "mcp-server/what-next" },
        ],
      },
      {
        label: "Developers",
        items: [
          { label: "Concepts & Architecture", slug: "developers/concepts-architecture" },
          { label: "Create your Plugin", slug: "developers/create-plugin" },
          { label: "STDIO Binary", slug: "developers/stdio-binary" },
          { label: "Contributing", slug: "developers/contributing" },
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
    plugins: [ion()],
    components: {
      Head: './src/components/Head.astro',
      Hero: './src/components/Hero.astro',
      Sidebar: './src/components/Sidebar.astro',
    },
  }), icon()],
});