---
title: Connect to LLMs
description: Connect to LLMs
---

If you're using MCP clients that support HTTP, you can point them directly to your Drupal site URL — assuming you've [set up and configured the MCP server module](/en/mcp-server/setup-configure/) as described earlier.

All the STDIO transport examples below require [our binary](/en/developers/stdio-binary/). Don’t worry — it’s fully dockerized, so in most cases, you won’t even notice it running.

Here’s the general config object used to add a Drupal MCP server for various LLM clients.

Replace `DRUPAL_AUTH_USER` and `DRUPAL_AUTH_PASSWORD` with the Drupal credentials you'd like the MCP server to use.

**IMPORTANT:** If you're running Drupal locally with DDEV, you’ll need to specify the correct `--network` (check `docker network ls` for the name), and set the URL as `http://web`.  
If your Drupal site is publicly accessible, you can skip the `--network` and use your full public URL instead.

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
        "--network=17c76994121c",
        "ghcr.io/omedia/mcp-server-drupal:latest",
        "--drupal-url=http://web"
      ],
      "env": {
        "DRUPAL_AUTH_USER": "admin",
        "DRUPAL_AUTH_PASSWORD": "changeme"
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

##### STDIO Transport

Paste the config object into that file. Don’t forget to update the credentials and `--network` value.

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
        "--network=17c76994121c",
        "ghcr.io/omedia/mcp-server-drupal:latest",
        "--drupal-url=http://web"
      ],
      "env": {
        "DRUPAL_AUTH_USER": "admin",
        "DRUPAL_AUTH_PASSWORD": "changeme"
      }
    }
  },
  "globalShortcut": ""
}
```

##### HTTP Transport

To use Drupal MCP with Claude Desktop over HTTP transport, you’ll need a small helper because remote MCP servers aren’t supported **natively** yet. The package [MCP Remote](https://www.npmjs.com/package/mcp-remote) does the job. Just remember to replace the `url` value with the endpoint of your own Drupal MCP server.

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://demo.drupalmcp.io/mcp/post",
        "--transport",
        "http-only",
        "-y"
      ]
    }
  }
}
```

After saving the file, restart Claude Desktop. You should see your Drupal MCP server listed under servers, along with the number of tools (actions) it exposes. If you see that number, you're good to go.

![Claude Desktop tools count](/images/claude-tools.png)

### Claude Code

As with Claude Desktop, you’ll need to run the MCP binary as a Docker container. Replace `--network`, `DRUPAL_AUTH_USER`, and `DRUPAL_AUTH_PASSWORD` as needed:

```bash
claude mcp add --scope project mcp-server-drupal docker -e DRUPAL_AUTH_USER=admin -e DRUPAL_AUTH_PASSWORD=changeme -- run -i --rm -e DRUPAL_AUTH_USER -e DRUPAL_AUTH_PASSWORD --network=1bca71ea7302 ghcr.io/omedia/mcp-server-drupal:latest --drupal-url=http://web
```

Once set up, Claude Code will be able to talk to your Drupal site via MCP. If you’ve enabled the right MCP plugins, you’ll even be able to do things like create content types, add fields, and configure blocks — all from the terminal, without using the UI.

### Cursor
To connect [Cursor](https://www.cursor.com/downloads), add the MCP server config to the `mcp.json` file. This file is located at:

- **Linux:** `~/.cursor/mcp.json`
- **MacOS:** `~/.cursor/mcp.json`
- **Windows:** `%USERPROFILE%\.cursor\mcp.json`

You can also view and edit it from within Cursor settings.

###### STDIO Transport

To use Drupal MCP with Cursor using STDIO transport, you can use the exact same configuration as for Claude Desktop. Just remember to update the credentials and `--network`.

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
        "--network=17c76994121c",
        "ghcr.io/omedia/mcp-server-drupal:latest",
        "--drupal-url=http://web"
      ],
      "env": {
        "DRUPAL_AUTH_USER": "admin",
        "DRUPAL_AUTH_PASSWORD": "changeme"
      }
    }
  },
  "globalShortcut": ""
}
```

###### HTTP Transport

To use Drupal MCP with Cursor over HTTP transport, use the configuration below. Just remember to replace the `url` value with the endpoint of your own Drupal MCP server.

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "type": "streamable-http",
      "url": "https://demo.drupalmcp.io/mcp/post"
    }
  }
}
```