# Linting and Formatting in VoiceToTextMobileApp

This project uses ESLint for code linting and Prettier for code formatting to ensure code quality and consistency.

## Available Scripts

In the project directory, you can run:

### `yarn lint`

Runs ESLint to check for code quality issues without making any changes to the files.

### `yarn lint:fix`

Runs ESLint and automatically fixes any issues that can be auto-fixed.

### `yarn format`

Runs Prettier to format all code files (JavaScript, TypeScript, JSON) according to the Prettier configuration.

### `yarn format:check`

Checks if all code files are formatted according to the Prettier configuration without making any changes.

## Pre-commit Hooks

The project uses Husky and lint-staged to run linting and formatting checks before commits. This ensures that all committed code meets the project's coding standards.

## VS Code Integration

If you're using VS Code, the project includes recommended settings that will:

1. Format code on save using Prettier
2. Run ESLint auto-fixes on save
3. Use the correct formatters for different file types

Make sure you have the following VS Code extensions installed:
- ESLint
- Prettier - Code formatter

## Configuration Files

- `.eslintrc.js` - ESLint configuration
- `.prettierrc.js` - Prettier configuration
- `.lintstagedrc.js` - lint-staged configuration for pre-commit hooks
- `.husky/pre-commit` - Husky pre-commit hook to run lint-staged
- `.vscode/settings.json` - VS Code settings for consistent editor behavior