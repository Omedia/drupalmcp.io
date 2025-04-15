---
title: STDIO Binary
description: STDIO Binary
---
[Here](https://github.com/Omedia/mcp-server-drupal/) you can find the code repository of the binary.

It is a typescript based companion for the [Drupal MCP module](https://www.drupal.org/project/mcp) that works with the `STDIO` transport. In order to use `HTTP` transport this server is
not required.

Here below you can find the three ways to download and setup the binary on your system.

## Docker

The server is available as docker [image](https://github.com/Omedia/mcp-server-drupal/pkgs/container/mcp-server-drupal) on GHCR.

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "ghcr.io/omedia/mcp-server-drupal",
        "--drupal-url=__DRUPAL_BASE_URL_"
      ],
      "env": {}
    }
  }
}
```

Specific version of the images are also avaiable.

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
        "DRUPAL_AUTH_TOKEN",
        "ghcr.io/omedia/mcp-server-drupal:1.0.0-alpha5",
        "--drupal-url=__DRUPAL_BASE_URL__"
      ],
      "env": {
        "DRUPAL_AUTH_TOKEN": "THEPASSWORD"
      }
    }
  }
}
```

#### Development Phase

If you are using the server in development phase and you have `ddev`, `lando` or simple `docker compose` keep in mind to run the server in the same network as the Drupal site using `--network` or `-n` flags. You can also achive the same with `host.docker.iternal`

## Binary

Download the binary for your system from the
  [releases](https://github.com/Omedia/mcp-server-drupal/releases) page

To use it with [Claude Desktop](https://claude.ai/download) you need to add
  the server config in the `claude_desktop_config.json` file. The file is
  located at the following path:

  - On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

  ```json
  {
    "mcpServers": {
      "mcp-server-drupal": {
        "command": "__BINARY_PATH__",
        "args": ["--drupal-url", "__DRUPAL_BASE_URL__"],
        "env": {}
      }
    }
  }
  ```

  `--drupal-url` is a required argument
  Replace `__BINARY_PATH__` with the path to the downloaded binary
  Replace `__DRUPAL_BASE_URL__` with the base URL of your Drupal site

To check the server and sdk version run the following command:

```bash
mcp-server-drupal --version
```

To check the available commands run the following command:

```bash
mcp-server-drupal --help
```

## Alternative usage

The server is also available as a deno module on [JSR](https://jsr.io/@omedia/mcp-server-drupal) so you can use via `npx`

```bash

{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "npx",
      "args": [
        "-y",
        "deno",
        "run",
        "-A",
        "jsr:@omedia/mcp-server-drupal@<VERSION>",
        "--drupal-url",
        "__DRUPAL_BASE_URL__"
      ],
      "env": {}
    }
  }
}
```

## Authentication

The server supports both authentication via environment variables. You can use either a auth token or a basic auth with username and password combination . The following environment variables are supported:

- `DRUPAL_AUTH_TOKEN`: The authentication token.
- `DRUPAL_AUTH_USER`: The username for authentication.
- `DRUPAL_AUTH_PASSWORD`: The password for authentication.

> [!NOTE]
> Make sure to turn the authentication on the Drupal MCP module settings page.

> [!NOTE]
> If both `DRUPAL_AUTH_TOKEN` and `DRUPAL_AUTH_USER`/`DRUPAL_AUTH_PASSWORD` are set, the token will be used over the username and password.

Example usage with token:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "__BINARY_PATH__",
      "args": ["--drupal-url", "__DRUPAL_BASE_URL__"],
      "env": {
        "DRUPAL_AUTH_TOKEN": "<AUTH_TOKEN>"
      }
    }
  }
}
```

Example usage with username and password:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "__BINARY_PATH__",
      "args": ["--drupal-url", "__DRUPAL_BASE_URL__"],
      "env": {
        "DRUPAL_AUTH_USER": "<BASIC_AUTH_USERNAME>",
        "DRUPAL_AUTH_PASSWORD": "<BASIC_AUTH_PASSWORD>"
      }
    }
  }
}
```

#### Docker

If you want to use the auth with docker do not forget to pass them as envriment variables

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
        "DRUPAL_AUTH_TOKEN",
        "ghcr.io/omedia/mcp-server-drupal",
        "--drupal-url=__DRUPAL_BASE_URL__"
      ],
      "env": {
        "DRUPAL_AUTH_TOKEN": "<AUTH_TOKEN>"
      }
    }
  }
}
```
