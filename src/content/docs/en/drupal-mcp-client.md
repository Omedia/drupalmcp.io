---
title: Drupal MCP Client
description: Using LLM clients with Drupal MCP
---

# Drupal MCP Client

This section covers how to connect various LLM clients to your Drupal MCP server.

## Supported Clients

Currently, the following LLM clients support the MCP protocol:

- **Claude Desktop App**: Anthropic's desktop application for interacting with Claude
- **Zed IDE**: A code editor with built-in support for the MCP protocol

## Claude Desktop App

### Configuration

To connect Claude Desktop App to your Drupal MCP server:

1. Open Claude Desktop App
2. Go to Settings > Advanced > MCP Servers
3. Add a new MCP server configuration:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "path/to/mcp-server-binary",
      "args": ["--drupalBaseUrl", "https://your-drupal-site.com"],
      "env": {}
    }
  }
}
```

4. Save the configuration and restart Claude Desktop App
5. In the chat interface, you can now access your Drupal MCP server

### Using Drupal Tools from Claude

Once connected, you can use the Drupal tools directly in your conversations with Claude:

1. Ask Claude to search for content on your Drupal site
2. Request information about users, content, or configuration
3. Perform administrative tasks on your Drupal site

Example prompts:

- "Search for articles about climate change on my Drupal site"
- "Show me the most recent content created on my site"
- "Check the status of my Drupal modules"

## Zed IDE

### Configuration

To connect Zed IDE to your Drupal MCP server:

1. Open Zed IDE
2. Navigate to Settings > AI > MCP Servers
3. Add a new MCP server configuration pointing to your Drupal MCP server
4. Save the configuration and restart Zed IDE

### Using Drupal Tools from Zed

Once connected, you can use Drupal tools directly within Zed IDE:

1. Access Drupal content while writing code
2. Query for examples or documentation from your Drupal site
3. Execute Drupal commands directly from Zed

## Troubleshooting

### Connection Issues

If you're having trouble connecting your LLM client to the Drupal MCP server:

1. Check that the Drupal MCP module is properly installed and enabled
2. Verify that your client configuration is correct
3. Ensure there are no network restrictions preventing the connection
4. Check the Drupal logs for any error messages

### Permission Issues

If you're connected but experiencing permission issues:

1. Verify that the user account used for the connection has the necessary permissions
2. Check the tool-specific permissions in the Drupal MCP module configuration
3. Review the Drupal logs for permission-related errors 