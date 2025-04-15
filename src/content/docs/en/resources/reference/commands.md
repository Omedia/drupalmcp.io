---
title: Command Reference
description: Comprehensive reference of all available MCP commands
---

# Command Reference

This page provides a comprehensive reference of all available MCP commands organized by category.

## Content Management

### content_search

Search for content with filters.

**Parameters:**
- `contentType` (string, required): Content type machine name (e.g., article, page)
- `filters` (array, required): Array of filter conditions
- `limit` (integer, optional): Maximum number of results (default: 10)
- `offset` (integer, optional): Starting point for pagination (default: 0)
- `sort` (object, optional): Sort options

**Example:**
```json
{
  "command": "content_search",
  "parameters": {
    "contentType": "article",
    "filters": [
      {
        "field": "status",
        "value": 1
      },
      {
        "field": "created",
        "operator": ">",
        "value": 1609459200
      }
    ],
    "limit": 5,
    "sort": {
      "field": "created",
      "order": "DESC"
    }
  }
}
```

### content_load

Load a single content entity by ID.

**Parameters:**
- `entityType` (string, required): Entity type (e.g., node, user, taxonomy_term)
- `id` (integer, required): Entity ID

**Example:**
```json
{
  "command": "content_load",
  "parameters": {
    "entityType": "node",
    "id": 42
  }
}
```

### content_create

Create a new content entity.

**Parameters:**
- `entityType` (string, required): Entity type (e.g., node, user, taxonomy_term)
- `bundle` (string, required): Bundle/content type
- `values` (object, required): Field values for the new entity

**Example:**
```json
{
  "command": "content_create",
  "parameters": {
    "entityType": "node",
    "bundle": "article",
    "values": {
      "title": "New Article Title",
      "body": {
        "value": "<p>This is the body text.</p>",
        "format": "full_html"
      },
      "field_tags": [1, 2]
    }
  }
}
```

### content_update

Update an existing content entity.

**Parameters:**
- `entityType` (string, required): Entity type (e.g., node, user, taxonomy_term)
- `id` (integer, required): Entity ID
- `values` (object, required): Field values to update

**Example:**
```json
{
  "command": "content_update",
  "parameters": {
    "entityType": "node",
    "id": 42,
    "values": {
      "title": "Updated Title",
      "status": 1
    }
  }
}
```

### content_delete

Delete a content entity.

**Parameters:**
- `entityType` (string, required): Entity type (e.g., node, user, taxonomy_term)
- `id` (integer, required): Entity ID

**Example:**
```json
{
  "command": "content_delete",
  "parameters": {
    "entityType": "node",
    "id": 42
  }
}
```

## System Administration

### cache_clear

Clear Drupal caches.

**Parameters:**
- `type` (string, optional): Specific cache bin to clear (default: all)

**Example:**
```json
{
  "command": "cache_clear",
  "parameters": {
    "type": "render"
  }
}
```

### system_status

Get system status information.

**Parameters:**
- `details` (boolean, optional): Include detailed information (default: false)

**Example:**
```json
{
  "command": "system_status",
  "parameters": {
    "details": true
  }
}
```

### module_list

Get a list of modules.

**Parameters:**
- `status` (string, optional): Filter by status ("enabled", "disabled", or "all") (default: "enabled")
- `type` (string, optional): Filter by type ("module" or "theme") (default: "module")

**Example:**
```json
{
  "command": "module_list",
  "parameters": {
    "status": "enabled"
  }
}
```

### module_install

Install a module.

**Parameters:**
- `name` (string, required): Module machine name
- `dependencies` (boolean, optional): Also install dependencies (default: true)

**Example:**
```json
{
  "command": "module_install",
  "parameters": {
    "name": "views_ui"
  }
}
```

### module_uninstall

Uninstall a module.

**Parameters:**
- `name` (string, required): Module machine name

**Example:**
```json
{
  "command": "module_uninstall",
  "parameters": {
    "name": "views_ui"
  }
}
```

### cron_run

Run Drupal cron.

**Parameters:**
- `module` (string, optional): Run cron only for a specific module

**Example:**
```json
{
  "command": "cron_run",
  "parameters": {
    "module": "search"
  }
}
```

## Configuration Management

### config_get

Get configuration values.

**Parameters:**
- `name` (string, required): Configuration name
- `key` (string, optional): Specific configuration key to retrieve

**Example:**
```json
{
  "command": "config_get",
  "parameters": {
    "name": "system.site",
    "key": "name"
  }
}
```

### config_set

Set configuration values.

**Parameters:**
- `name` (string, required): Configuration name
- `key` (string, required): Configuration key to set
- `value` (mixed, required): Value to set

**Example:**
```json
{
  "command": "config_set",
  "parameters": {
    "name": "system.site",
    "key": "name",
    "value": "My Drupal Site"
  }
}
```

### config_list

List available configuration.

**Parameters:**
- `prefix` (string, optional): Filter by configuration prefix

**Example:**
```json
{
  "command": "config_list",
  "parameters": {
    "prefix": "system"
  }
}
```

## User Management

### user_login

Generate a login link for a user.

**Parameters:**
- `name` (string, required): Username or email
- `expires` (integer, optional): Expiration time in seconds (default: 3600)

**Example:**
```json
{
  "command": "user_login",
  "parameters": {
    "name": "admin@example.com",
    "expires": 7200
  }
}
```

### user_info

Get information about a user.

**Parameters:**
- `uid` (integer, optional): User ID (default: current user)

**Example:**
```json
{
  "command": "user_info",
  "parameters": {
    "uid": 1
  }
}
```

### user_roles

Get a list of roles.

**Parameters:**
- None

**Example:**
```json
{
  "command": "user_roles",
  "parameters": {}
}
```

## Taxonomy

### taxonomy_terms

Get taxonomy terms.

**Parameters:**
- `vocabulary` (string, required): Vocabulary machine name
- `parent` (integer, optional): Parent term ID for hierarchical vocabularies

**Example:**
```json
{
  "command": "taxonomy_terms",
  "parameters": {
    "vocabulary": "tags",
    "parent": 0
  }
}
```

### taxonomy_vocabularies

Get a list of vocabularies.

**Parameters:**
- None

**Example:**
```json
{
  "command": "taxonomy_vocabularies",
  "parameters": {}
}
```

## Files

### file_upload

Upload a file.

**Parameters:**
- `data` (string, required): Base64-encoded file data
- `filename` (string, required): Desired filename
- `directory` (string, optional): Target directory (default: "public://")

**Example:**
```json
{
  "command": "file_upload",
  "parameters": {
    "data": "base64_encoded_data_here",
    "filename": "example.jpg",
    "directory": "public://images"
  }
}
```

### file_info

Get information about a file.

**Parameters:**
- `fid` (integer, required): File ID

**Example:**
```json
{
  "command": "file_info",
  "parameters": {
    "fid": 42
  }
}
```

## Utility Commands

### site_info

Get basic information about the site.

**Parameters:**
- None

**Example:**
```json
{
  "command": "site_info",
  "parameters": {}
}
```

### command_list

List available MCP commands.

**Parameters:**
- `category` (string, optional): Filter by command category

**Example:**
```json
{
  "command": "command_list",
  "parameters": {
    "category": "content"
  }
}
```

### search

Search site content.

**Parameters:**
- `keywords` (string, required): Search keywords
- `entity_types` (array, optional): Entity types to search (default: ["node"])

**Example:**
```json
{
  "command": "search",
  "parameters": {
    "keywords": "Drupal development",
    "entity_types": ["node", "user"]
  }
}
```

## Custom Commands

Custom commands may be available depending on the modules installed on your Drupal site. Use the `command_list` command to discover all available commands on your particular installation. 