---
title: Streamable HTTP Transport
description: Connect to your Drupal MCP server using HTTP transport
---

## What is Streamable HTTP Transport?

Streamable HTTP transport is a modern communication protocol for MCP that uses standard HTTP requests with the ability to support streaming responses. It provides several advantages:

- **Direct HTTP Communication**: Connect to your Drupal site without additional binaries or Docker containers
- **Remote Access**: Easily connect to publicly accessible Drupal sites
- **Future Streaming Support**: Designed to support Server-Sent Events (SSE) for real-time communication

:::note[Current Implementation]
The Drupal MCP module currently supports HTTP transport without streaming capabilities. Full streaming support with Server-Sent Events (SSE) will be added in a future release. This means you can use all MCP features through standard HTTP POST requests, but real-time server-to-client communication is not yet available.
:::

:::caution[Security]
- Always use HTTPS in production environments
- Users must have the "Use MCP server" permission in Drupal
- Create dedicated MCP user accounts with only necessary permissions
:::


## Configuration Examples

### Claude Desktop

Claude Desktop doesn't natively support HTTP transport yet, but you can use the `mcp-remote` package as a bridge:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://your-drupal-site.com/mcp/post",
        "--transport",
        "http-only",
        "-y"
      ]
    }
  }
}
```

Replace `https://your-drupal-site.com/mcp/post` with your actual Drupal site URL. The `/mcp/post` endpoint is the standard MCP HTTP endpoint provided by the Drupal module.


### Cursor

Cursor has native support for streamable HTTP transport:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "type": "streamable-http",
      "url": "https://your-drupal-site.com/mcp/post"
    }
  }
}
```

This configuration is simpler and doesn't require additional packages.

## Authentication

HTTP transport supports the same authentication methods as STDIO transport:

### Token Authentication

Configure token authentication in your Drupal MCP settings and include the token in your client configuration:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "type": "streamable-http",
      "url": "https://your-drupal-site.com/mcp/post",
      "headers": {
        "Authorization": "Basic BASE64_ENCODED_TOKEN"
      }
    }
  }
}
```

Where `BASE64_ENCODED_TOKEN` is the base64 encoding of your token. The Drupal MCP authentication provider expects all authentication to use the Basic auth format.

### Basic Authentication

For basic authentication, use the standard HTTP Basic authentication header format:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "type": "streamable-http",
      "url": "https://your-drupal-site.com/mcp/post",
      "headers": {
        "Authorization": "Basic BASE64_ENCODED_CREDENTIALS"
      }
    }
  }
}
```

Where `BASE64_ENCODED_CREDENTIALS` is the base64 encoding of `username:password`.

## Troubleshooting

### Connection Issues

If you're having trouble connecting:

1. **Verify the URL**: Ensure your Drupal site URL is correct and includes `/mcp/post`
2. **Check Authentication**: Confirm authentication is enabled in MCP settings
3. **Test Access**: Try accessing `https://your-site.com/mcp/post` in a browser (should return a method not allowed error)
4. **CORS Configuration**: For browser-based clients, ensure CORS is properly configured

### Common Errors

- **404 Not Found**: The MCP module might not be enabled or the URL is incorrect
- **401 Unauthorized**: Authentication credentials are missing or incorrect
- **403 Forbidden**: The user doesn't have the "Use MCP server" permission
- **500 Server Error**: Check Drupal logs for specific error messages

## Next Steps

Now that you've configured HTTP transport, you can:

- Test your connection by querying available tools
- Start using MCP features to interact with your Drupal site
- Monitor your Drupal logs for MCP activity
- Explore [what else you can do with MCP](/en/mcp-server/what-next/)