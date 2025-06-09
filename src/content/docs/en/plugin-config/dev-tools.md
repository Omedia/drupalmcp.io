---
title: Dev Tools
description: Expose Drush commands as MCP tools for development
---

The `mcp_dev_tools` submodule exposes Drush commands as MCP tools, enabling AI assistants like Cursor, Claude, and other LLMs to execute Drupal development tasks directly. This is designed specifically for development environments where you want AI assistance with Drupal operations.

## What it does

This submodule makes Drush commands available through the MCP interface, allowing connected AI applications to:
- Clear caches
- Enable/disable modules
- Run database updates
- Execute migrations
- Manage configuration
- And execute any other Drush commands

## Installation

```bash
# Enable the dev tools submodule
drush en mcp_dev_tools

# Clear caches to register the tools
drush cr
```

Once enabled, all configured Drush commands become available as MCP tools that AI assistants can use when connected to your Drupal site.

## Security Considerations

For security reasons, the dev tools module does not expose any Drush commands by default. You must explicitly whitelist the commands you want to make available through MCP.

To configure allowed commands:
1. Navigate to the MCP configuration page at `/admin/config/mcp`
2. Find the "MCP Dev Tools" plugin configuration section
3. Add the specific Drush commands you want to expose to the whitelist
4. Save the configuration

This approach ensures that only the commands you explicitly approve can be executed through MCP, preventing unauthorized access to potentially dangerous operations.