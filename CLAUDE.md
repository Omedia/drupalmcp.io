# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation website for Drupal MCP (Model Context Protocol), built with Astro and the Starlight documentation theme. The site explains how to integrate Drupal with AI applications through the MCP protocol.

## Common Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# or
pnpm start

# Build the site
pnpm build

# Preview built site
pnpm preview
```

## Architecture

### Technology Stack
- **Astro 5.5.3**: Static site generator
- **Starlight**: Documentation theme (Ion variant)
- **TypeScript**: Strict mode enabled
- **pnpm**: Package manager
- **Vercel**: Deployment platform with analytics

### Project Structure

The documentation content lives in `/src/content/docs/en/` with these main sections:
- `introduction/`: MCP concepts, Drupal integration basics
- `mcp-server/`: Setup and configuration guides
- `plugin-config/`: AI plugin configuration
- `developers/`: Architecture, plugin development, contributing

### Key Configuration Files

- `astro.config.mjs`: Site configuration, sidebar navigation, theme settings
- `content.config.ts`: Content collection schema definitions
- `vercel.json`: Root redirect to `/en`

### Styling and Assets

- Custom Drupal theme styling in `/src/styles/drupal.css`
- Logo variations for light/dark themes in `/src/assets/`
- Interactive UI elements via `/public/js/eye-follow.js`

## Important Development Notes

1. **No linting or testing setup** - Be careful with code quality as there are no automated checks
2. **Multi-language ready** - Structure supports multiple languages but only English (`/en`) is active
3. **Markdown/MDX content** - Documentation uses both `.md` and `.mdx` files
4. **Custom components** - Hero and sidebar components have custom implementations

## Content Guidelines

When editing documentation:
- Follow the existing sidebar structure defined in `astro.config.mjs`
- Use MDX for pages requiring interactive components
- Images go in `/public/images/`
- Maintain consistent terminology: "MCP Server", "MCP Client", "STDIO transport"