---
name: GitFlow AVH Manager
slug: git-flow-avh
description: Manage GitFlow workflows using the native git-flow AVH Edition CLI. Handles Features, Releases, and Hotfixes according to standard GitFlow practices.
category: operations
complexity: simple
version: "1.0.0"
author: "Antigravity"
triggers:
  - "git flow"
  - "start feature"
  - "finish feature"
  - "new release"
  - "finish release"
  - "hotfix"
  - "publish feature"
tags:
  - git
  - workflow
  - git-flow
  - version-control
---

# GitFlow AVH Manager

This skill integrates the **GitFlow AVH Edition** command-line tool into your workflow. It allows you to manage the entire lifecycle of Features, Releases, and Hotfixes using standard `git flow` commands, ensuring strict adherence to the GitFlow branching model.

> **Requirement**: `git-flow` (AVH Edition) must be installed and available in the system PATH.

## Core Workflows

### Workflow 1: Initialize GitFlow
**Trigger**: "initialize git flow", "setup git flow"

1. **Check Status**: Ensure the repository is clean (`git status`).
2. **Initialize**: Run `git flow init`.
   - Accept default branch naming conventions unless specified otherwise.
   - *Note*: If interactive prompts are problematic, consider using `git flow init -d` for defaults.

### Workflow 2: Feature Lifecycle
**Trigger**: "start feature [name]", "finish feature", "publish feature"

1. **Start Feature**:
   - Command: `git flow feature start <name>`
   - Result: Creates `feature/<name>` from `develop` and switches to it.
2. **Publish Feature** (Optional - for collaboration):
   - Command: `git flow feature publish <name>`
   - Result: Pushes the feature branch to `origin` for others to track.
3. **Track Feature** (Optional - get remote feature):
   - Command: `git flow feature track <name>`
   - Result: Pulls a published feature branch from `origin`.
4. **Finish Feature**:
   - Command: `git flow feature finish <name>`
   - Result: Merges into `develop`, removes feature branch, switches to `develop`.

### Workflow 3: Release Lifecycle
**Trigger**: "start release [version]", "finish release"

1. **Start Release**:
   - Command: `git flow release start <version>`
   - *Note*: Version should follow semantic versioning (e.g., `1.2.0`).
   - Result: Creates `release/<version>` from `develop`.
2. **Publish Release** (Recommended):
   - Command: `git flow release publish <version>`
3. **Finish Release**:
   - Command: `git flow release finish <version>`
   - *Prompt*: "Don't forget to push tags: `git push origin --tags`"
   - Result: Merges to `master` (tag) and `develop`, removes release branch.

### Workflow 4: Hotfix Lifecycle
**Trigger**: "hotfix [issue/version]", "emergency fix"

1. **Start Hotfix**:
   - Command: `git flow hotfix start <version>`
   - Result: Creates `hotfix/<version>` from `master`.
2. **Finish Hotfix**:
   - Command: `git flow hotfix finish <version>`
   - Result: Merges to `master` (tag) and `develop`, removes hotfix branch.

## Quick Reference

| Action | Command | Description |
|--------|---------|-------------|
| **Init** | `git flow init -d` | Initialize with defaults |
| **Feature Start** | `git flow feature start <name>` | Start new feature work |
| **Feature Finish** | `git flow feature finish <name>` | Merge feature to develop |
| **Release Start** | `git flow release start <ver>` | Prepare a new version |
| **Release Finish** | `git flow release finish <ver>` | Merge release to master/develop |
| **Hotfix Start** | `git flow hotfix start <ver>` | Start emergency fix on master |
| **Hotfix Finish** | `git flow hotfix finish <ver>` | Merge hotfix to master/develop |

## Best Practices

- **Naming**: Use descriptive names for features (e.g., `user-auth`, `cart-redesign`).
- **Versioning**: Follow Semantic Versioning (vMajor.Minor.Patch) for Releases and Hotfixes.
- **Publishing**: Publish long-running features or releases to backup work and enable collaboration.
- **Clean**: Always ensure your working directory is clean before starting or finishing branches.
- **Tags**: Remember to push tags to the remote after finishing a release or hotfix (`git push origin --tags`).

## Troubleshooting

- **"Not a git flow repo"**: Run `git flow init` first.
- **Merge Conflicts**: Resolve conflicts manually, `git add` resolution, then continue.
