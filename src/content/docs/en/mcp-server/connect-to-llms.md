---
title: Connect to LLMs
description: Connect to LLMs
---

If you're using MCP clients that support HTTP, you can point them directly to your Drupal site URL — assuming you've [set up and configured the MCP server module](/en/mcp-server/setup-configure/) as described earlier. For more information about HTTP transport configuration, see the [Streamable HTTP](/en/mcp-server/streamable-http) page.

All examples below use the STDIO transport, which means you'll need [our binary](/en/developers/stdio-binary/). Don't worry — it's fully dockerized, so in most cases, you won't even notice it running.

Here's the general config object used to add a Drupal MCP server for various LLM clients.

Replace `DRUPAL_AUTH_USER` and `DRUPAL_AUTH_PASSWORD` with the Drupal credentials you'd like the MCP server to use.

:::caution[Security Note]
The user account you specify must have the "Use MCP server" permission in Drupal. Create a dedicated Drupal user for MCP access with only the required permissions. See [STDIO Transport documentation](/en/mcp-server/stdio-transport/#authentication) for authentication options.
:::

For local development with DDEV, use `--network=host` and your DDEV site URL (e.g., `https://mysite.ddev.site`). You may need to add `--unsafe-net` if using self-signed certificates.

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "DRUPAL_AUTH_USER",
        "-e",
        "DRUPAL_AUTH_PASSWORD",
        "--network=host",
        "ghcr.io/omedia/mcp-server-drupal:latest",
        "--drupal-url=https://mysite.ddev.site",
        "--unsafe-net"
      ],
      "env": {
        "DRUPAL_AUTH_USER": "mcp_user",
        "DRUPAL_AUTH_PASSWORD": "secure_password_here"
      }
    }
  },
  "globalShortcut": ""
}
```

### Claude Desktop

To connect [Claude Desktop](https://claude.ai/download), add the MCP server config to the `claude_desktop_config.json` file. This file is located at:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%/Claude/claude_desktop_config.json`

You can also view and edit it from within Claude Desktop settings.

Paste the config object into that file and update the credentials.

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "DRUPAL_AUTH_USER",
        "-e",
        "DRUPAL_AUTH_PASSWORD",
        "--network=host",
        "ghcr.io/omedia/mcp-server-drupal:latest",
        "--drupal-url=https://mysite.ddev.site",
        "--unsafe-net"
      ],
      "env": {
        "DRUPAL_AUTH_USER": "mcp_user",
        "DRUPAL_AUTH_PASSWORD": "secure_password_here"
      }
    }
  },
  "globalShortcut": ""
}
```

After saving the file, restart Claude Desktop. You should see your Drupal MCP server listed under servers, along with the number of tools (actions) it exposes. If you see that number, you're good to go.

![Claude Desktop tools count](/images/claude-tools.png)

### Claude Code

As with Claude Desktop, you'll need to run the MCP binary as a Docker container. Replace `DRUPAL_AUTH_USER` and `DRUPAL_AUTH_PASSWORD` as needed:

```bash
claude mcp add --scope project mcp-server-drupal docker -e DRUPAL_AUTH_USER=mcp_user -e DRUPAL_AUTH_PASSWORD=secure_password_here -- run -i --rm -e DRUPAL_AUTH_USER -e DRUPAL_AUTH_PASSWORD --network=host ghcr.io/omedia/mcp-server-drupal:latest --drupal-url=https://mysite.ddev.site --unsafe-net
```

Once set up, Claude Code will be able to talk to your Drupal site via MCP. If you've enabled the right MCP plugins, you'll even be able to do things like create content types, add fields, and configure blocks — all from the terminal, without using the UI.

### Cursor

To use Drupal MCP with Cursor, you can use the exact same configuration as for Claude Desktop. Just remember to update the credentials.

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "DRUPAL_AUTH_USER",
        "-e",
        "DRUPAL_AUTH_PASSWORD",
        "--network=host",
        "ghcr.io/omedia/mcp-server-drupal:latest",
        "--drupal-url=https://mysite.ddev.site",
        "--unsafe-net"
      ],
      "env": {
        "DRUPAL_AUTH_USER": "mcp_user",
        "DRUPAL_AUTH_PASSWORD": "secure_password_here"
      }
    }
  },
  "globalShortcut": ""
}
```

## Alternative: HTTP Transport

If your MCP client supports streamable HTTP transport (like Cursor), you can connect directly to your Drupal site without the STDIO binary. This provides a simpler setup and is ideal for remote Drupal sites. See our [Streamable HTTP Transport](/en/mcp-server/streamable-http/) guide for configuration examples.