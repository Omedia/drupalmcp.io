---
title: AI Agents Configuration
description: How to configure AI agents for the MCP module
---

This guide explains how to configure AI agents for the MCP module, enabling AI function call capabilities in your Drupal MCP server.

## Prerequisites

Before configuring AI plugins, ensure you have:

1. Installed and configured the MCP module as described in the [Setup & Configure](/en/mcp-server/setup-configure/) guide
2. Installed the required Drupal AI modules:
   - The [Drupal AI module](https://drupal.org/project/ai)
   - The [AI Agents module](https://drupal.org/project/ai_agents)
   - An AI provider module (e.g., [OpenAI](https://drupal.org/project/ai_provider_openai))

```bash
# Install the required AI modules, version is important to be 1.1.x
ddev composer require 'drupal/ai:1.1.x-dev@dev'
ddev composer require 'drupal/ai_agents:1.1.x-dev@dev'

# Install an AI provider module (OpenAI example)
ddev composer require 'drupal/ai_provider_openai:1.1.x-dev@dev'

# Enable the MCP extra submodule
ddev drush en mcp_extra -y

# Enable the AI modules
ddev drush en ai ai_agents ai_agents_extra -y

# Enable the AI provider module
ddev drush en ai_provider_openai -y
```

> **Note:** You can choose any AI provider module that's compatible with the Drupal AI module. OpenAI is used as an example here.

## Configuring AI and MCP Modules

After installing the required modules, you need to configure both the AI module and the MCP module:

1. First, configure your AI provider (e.g., OpenAI) at `/admin/config/ai/providers`
2. Set your configured provider as the default provider at `/admin/config/ai/settings` and save the configuration
3. After the provider is configured, check that the MCP plugins `AI Agent Calling` and `AI Function Calling` are available and enabled at `/admin/config/mcp`

## Security Considerations

When using AI plugins with MCP, keep these security aspects in mind:

:::caution[Access Control]
- Users accessing AI functions through MCP must have the "Use MCP server" permission
- AI functions may expose sensitive operations, so carefully review permissions
- Consider creating dedicated user accounts with limited permissions for MCP access
- Monitor AI function usage through Drupal's logs
:::

:::note[Configuration Tips]
- Review the AI functions exposed through MCP at `/admin/config/mcp`
- Configure token authentication to use a dedicated Drupal user account
- Enable only the specific AI functions required for your use case
:::

## Next Steps

After configuring AI plugins, you might want to:

- [Connect your MCP server to LLMs](/en/mcp-server/connect-to-llms/)
- Explore other [MCP capabilities](/en/mcp-server/what-next/)