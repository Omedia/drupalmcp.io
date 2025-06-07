---
title: STDIO Transport
description: STDIO Transport
---

`STDIO Binary` is a typescript based companion for the [Drupal MCP module](https://www.drupal.org/project/mcp) that works with the `STDIO` transport. In order to use `HTTP` transport this server is not required.

## Installation

The STDIO Binary is available through multiple distribution channels to accommodate various environments:

- [Docker container](https://github.com/Omedia/mcp-server-drupal/pkgs/container/mcp-server-drupal)
- [Compiled binary](https://github.com/Omedia/mcp-server-drupal/releases)
- [JSR package](https://jsr.io/@omedia/mcp-server-drupal)

### Docker

Docker is the most common way to run the STDIO binary, it is available as a container image on the [**ghcr**](https://github.com/omedia/mcp-server-drupal/pkgs/container/mcp-server-drupal).

```json {11}
// [your_mcp_client].json
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

:::note[Required Configuration]
The `--drupal-url` argument is the only required parameter. It must point to the base URL of your Drupal website (e.g., <http://example.com> or <https://mysite.org>).
:::

:::tip[Local Environment]
If you are running the Drupal site locally, make sure that URL is accessible from the Docker container. You have several options:

1. **Using host networking (recommended for DDEV)**: Add `--network=host` to your Docker args. This allows the container to access your local services directly.
2. **Using host.docker.internal**: Use `host.docker.internal` to refer to the host machine from within the container.
3. **Using specific Docker network**: Pass the docker network name with the `--network` argument.

For DDEV users, the `--network=host` option is often the simplest approach.

If you want to use the self signed certificate you can use the `--unsafe-net` argument to disable the SSL verification. It will provide a better DX during the local development but it is not recommended for production.

```json {10}
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "ghcr.io/omedia/mcp-server-drupal",
        "--unsafe-net",
        "--drupal-url=__DRUPAL_BASE_URL_"
      ],
      "env": {}
    }
  }
}
```

:::

#### Docker Image Examples

##### Example 1: Using host networking (recommended for DDEV)

This configuration works well with DDEV and other local development environments:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--network=host",
        "ghcr.io/omedia/mcp-server-drupal:latest",
        "--drupal-url=https://netnode.nodehive.app.ddev.site",
        "--unsafe-net"
      ],
      "env": {}
    }
  }
}
```

##### Example 2: Using host.docker.internal

For accessing DDEV sites without host networking:

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
        "--unsafe-net",
        "--drupal-url=https://host.docker.internal:32778" // To access the `ddev` site from the container
      ],
      "env": {}
    }
  }
}
```

#### Docker Image Flags

The following flags are available for the Docker image:

- `--drupal-url`: The base URL of your Drupal site (required).
- `--unsafe-net`: Disable SSL verification (not recommended for production).
- `--help`: Show help information and see all available options.

```bash
docker run -i --rm ghcr.io/omedia/mcp-server-drupal --help
```

In addition to the `latest` tag, you can use specific versions of the image to ensure compatibility and stability:

#### Docker Image Versions

```json ins="1.0.0"
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "ghcr.io/omedia/mcp-server-drupal:1.0.0",
        "--drupal-url=__DRUPAL_BASE_URL_"
      ],
      "env": {}
    }
  }
}
```

#### Verifying the Docker Images

All container images are signed by [cosign](https://github.com/sigstore/cosign) using identity-based signing and can be verified to ensure they haven't been tampered with. This is an important security measure for production deployments.

You can verify the Docker image signature using the following command:

```bash
cosign verify ghcr.io/omedia/mcp-server-drupal:latest \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  --certificate-identity-regexp "https://github.com/Omedia/mcp-server-drupal/.github/workflows/release.yml@refs/tags/v"
```

This verification ensures that the image was built and signed by the official GitHub Actions workflow from the Omedia repository and hasn't been modified since signing.

:::note
For tagged releases, replace latest with the specific version you want to verify (e.g., 1.0.0).
:::

### Compiled Binary

The server is also available as a compiled binary format. This is useful for environments where Docker is not available or desired.

The binary is available for multiple platforms, including:

| OS      | Architecture | Target                    |
| ------- | ------------ | ------------------------- |
| Windows | x86_64       | x86_64-pc-windows-msvc    |
| macOS   | x86_64       | x86_64-apple-darwin       |
| macOS   | ARM64        | aarch64-apple-darwin      |
| Linux   | x86_64       | x86_64-unknown-linux-gnu  |
| Linux   | ARM64        | aarch64-unknown-linux-gnu |

You can download the latest release from the [GitHub releases page](https://github.com/Omedia/mcp-server-drupal/releases).

Once downloaded, the binary for your architecture you can configure it in your MCP client:

```json {5}
// [your_mcp_client].json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "__BINARY_PATH__",
      "args": ["--drupal-url=__DRUPAL_BASE_URL_"],
      "env": {}
    }
  }
}
```

:::note[Binary path]
Make sure to replace `__BINARY_PATH__` with the actual **path** to the downloaded binary on your system.
:::

:::caution[Self-Signed Certificates]
`--unsafe-net` is not available for the compiled binary. If you are using self-signed certificates, make sure to add the certificate to your system's trusted certificates.

The binary is compiled with pre-bundled [**Deno permissions**](https://docs.deno.com/runtime/fundamentals/security/) (`--allow-read`, `--allow-net`, `--allow-env`), and skipping SSL certificate verification isn't supported in the compiled version for security reasons.
:::

#### Binary Example

The realistic example of the configuration for the compiled binary:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "/Users/john/Utils/mcp-server-drupal_darwin_arm",
      "args": ["--drupal-url", "http://mcp-d-11.ddev.site"],
      "env": {}
    }
  }
}
```

#### Binary Flags

The following flags are available for the compiled binary:

- `--drupal-url`: The base URL of your Drupal site (required).
- `--version`: Show the version of the binary and sdk.
- `--help`: Show help information and see all available options.

```bash
./mcp-server-drupal --help
```

#### Binary Version

You can check all available versions of the binary on the [GitHub releases page](https://github.com/omedia/mcp-server-drupal/releases).

#### Verifying the Binary

`drupal_mcp_server` binaries are signed by [cosign](https://github.com/sigstore/cosign) using identity-based signing. You can verify your binary by downloading the `signatures.tar.gz` file from the release page, extracting the signature and running the following command:

```bash
cosign verify-blob ${YOUR_BINARY_NAME} \
--bundle signatures/${YOUR_BINARY_NAME}.bundle \
--certificate-oidc-issuer https://token.actions.githubusercontent.com \
--certificate-identity-regexp https://github.com/Omedia/mcp-server-drupal/.github/workflows/release.yml@refs/tags/v \
--certificate-github-workflow-repository Omedia/mcp-server-drupal
```

### JSR Package

Last but not least, the server is available as a [JSR package](https://jsr.io/@omedia/mcp-server-drupal).

You can utilise this package without any additional installations, just with `npx`

```json {5-11}
// [your_mcp_client].json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "npx",
      "args": [
        "-y",
        "deno",
        "run",
        "-A",
        "jsr:@omedia/mcp-server-drupal",
        "--drupal-url",
        "__DRUPAL_BASE_URL__"
      ],
      "env": {}
    }
  }
}
```

or you can run it with [`deno`](https://deno.land/) directly:

```json {5}
// [your_mcp_client].json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "deno",
      "args": [
        "run",
        "-A",
        "jsr:@omedia/mcp-server-drupal",
        "--drupal-url",
        "__DRUPAL_BASE_URL__"
      ],
      "env": {}
    }
  }
}
```

:::tip[Self-Signed Certificates]
If you are using self-signed certificates, with jsr package you can use the `--unsafely-ignore-certificate-errors` flag to disable SSL verification. This is not recommended for production environments.

```json {8}
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "deno",
      "args": [
        "run",
        "-A",
        "--unsafely-ignore-certificate-errors",
        "jsr:@omedia/mcp-server-drupal",
        "--drupal-url",
        "__DRUPAL_BASE_URL__"
      ],
      "env": {}
    }
  }
}
```

:::

#### JSR Package Example

The realistic example of the configuration for the JSR package:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "npx",
      "args": [
        "-y",
        "deno",
        "run",
        "-A",
        "jsr:@omedia/mcp-server-drupal",
        "--drupal-url",
        "http://mcp-d-11.ddev.site"
      ],
      "env": {}
    }
  }
}
```

#### JSR Package Flags

JSR package has the same flags as the compiled binary

#### JSR Package Version

You can check all available versions of the package on the [JSR Versions](https://jsr.io/@omedia/mcp-server-drupal/versions) page

```json ins="1.0.0"
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "npx",
      "args": [
        "-y",
        "deno",
        "run",
        "-A",
        "jsr:@omedia/mcp-server-drupal@1.0.0",
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

:::note[Drupal Module Settings]
Make sure to turn the authentication on the Drupal MCP module settings page.
:::

:::caution[Security Requirements]
- Users must have the "Use MCP server" permission in Drupal to access MCP
- Token authentication can be configured to use a specific user account (recommended) instead of defaulting to the administrator account (UID 1)
- For production sites, configure token authentication to use a dedicated Drupal user with limited permissions
:::

For token based authentication you can use the `DRUPAL_AUTH_TOKEN` environment variable. For basic authentication you can use `DRUPAL_AUTH_USER` and `DRUPAL_AUTH_PASSWORD` environment variables.

:::caution[Double Authentication]
If both `DRUPAL_AUTH_TOKEN` and `DRUPAL_AUTH_USER/DRUPAL_AUTH_PASSWORD` are set, the token will be used over the username and password.
:::

### Binary and JSR Package

For the compiled binary and jsr package you can just set the environment variables in the `env` section of the configuration:

#### Token Authentication Example

```json {7}
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "__BINARY_PATH__", // or jsr package
      "args": ["--drupal-url", "__DRUPAL_BASE_URL__"],
      "env": {
        "DRUPAL_AUTH_TOKEN": "<AUTH_TOKEN>"
      }
    }
  }
}
```

#### Basic Authentication Example

```json {7-8}
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "__BINARY_PATH__", // or jsr package
      "args": ["--drupal-url", "__DRUPAL_BASE_URL__"],
      "env": {
        "DRUPAL_AUTH_USER": "<AUTH_USER>",
        "DRUPAL_AUTH_PASSWORD": "<AUTH_PASSWORD>"
      }
    }
  }
}
```

### Docker Auth

On the other hand, for the Docker you should manually pass the environment variables to the container using the `-e` flag:

#### Token Authentication Example

```json {9-10,15}
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "DRUPAL_AUTH_TOKEN"
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

#### Basic Authentication Example

```json {9-12,17-18}
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
        "ghcr.io/omedia/mcp-server-drupal",
        "--drupal-url=__DRUPAL_BASE_URL__"
      ],
      "env": {
        "DRUPAL_AUTH_USER": "<AUTH_USER>",
        "DRUPAL_AUTH_PASSWORD": "<AUTH_PASSWORD>"
      }
    }
  }
}
```
