---
title: STDIO Binary
description: Using the STDIO binary for Drupal MCP integration
---

# STDIO Binary

The Drupal MCP STDIO binary is a TypeScript-based application that acts as an intermediary between your Drupal site and LLM clients that require standard input/output (STDIO) for communication.

## What is the STDIO Binary?

The STDIO binary serves as a bridge between:

- **Drupal**: Your Drupal site with the MCP module installed
- **LLM Clients**: Applications like Claude Desktop App that require STDIO communication

It translates between:

- STDIO protocol used by the LLM client
- HTTP requests to your Drupal site's MCP endpoints

## Installation

### Download

You can download the latest version of the STDIO binary from the GitHub repository:

[https://github.com/Omedia/mcp-server-drupal/releases](https://github.com/Omedia/mcp-server-drupal/releases)

Select the appropriate binary for your operating system:

- `mcp-server-drupal-linux` for Linux
- `mcp-server-drupal-macos` for macOS
- `mcp-server-drupal-win.exe` for Windows

### Make Executable

After downloading, make the binary executable:

```bash
# For Linux/macOS
chmod +x path/to/mcp-server-drupal-macos

# For Windows
# No additional steps required
```

## Configuration

When using the STDIO binary, you need to configure it with your Drupal site URL:

```bash
./mcp-server-drupal-macos --drupalBaseUrl="https://your-drupal-site.com"
```

### Available Options

The binary supports the following options:

- `--drupalBaseUrl`: Your Drupal site URL (required)
- `--debug`: Enable debug mode for additional logging
- `--timeout`: Request timeout in milliseconds (default: 30000)
- `--user`: Username for basic authentication (optional)
- `--password`: Password for basic authentication (optional)

## Integration with LLM Clients

### Claude Desktop App

Configure Claude to use the binary:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "/path/to/mcp-server-drupal-macos",
      "args": ["--drupalBaseUrl", "https://your-drupal-site.com"],
      "env": {}
    }
  }
}
```

### Other STDIO-Compatible Clients

The binary should work with any LLM client that supports the MCP protocol over STDIO.

## Troubleshooting

### Common Issues

- **Permission Denied**: Make sure the binary is executable
- **Connection Failed**: Verify your Drupal site URL is correct and accessible
- **Authentication Failed**: Check your username and password if using authentication

### Logging

Enable debug mode for detailed logging:

```bash
./mcp-server-drupal-macos --drupalBaseUrl="https://your-drupal-site.com" --debug
```

## Building from Source

If you need to build the binary from source:

1. Clone the repository: `git clone https://github.com/Omedia/mcp-server-drupal.git`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Package as binary: `npm run package`

The built binaries will be available in the `dist` directory. 