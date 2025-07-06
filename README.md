# PROJECT_NAME
A TypeScript utility package

[![npm version](https://badgen.net/npm/v/PACKAGE_NAME?icon=npm)](https://www.npmjs.com/package/PACKAGE_NAME)
[![npm downloads](https://badgen.net/npm/dm/PACKAGE_NAME?icon=npm)](https://www.npmjs.com/package/PACKAGE_NAME)
[![npm dependents](https://badgen.net/npm/dependents/PACKAGE_NAME?icon=npm)](https://www.npmjs.com/package/PACKAGE_NAME)
[![github stars](https://badgen.net/github/stars/USERNAME/PROJECT_NAME?icon=github)](https://github.com/USERNAME/PROJECT_NAME/)
[![github license](https://badgen.net/github/license/USERNAME/PROJECT_NAME?icon=github)](https://github.com/USERNAME/PROJECT_NAME/blob/main/LICENSE)

## 🚀 Quick Start

### Use this template with gen-from (recommended)
```bash
# Generate from this template
npx gen-from npm-utils-template

# Or use interactive mode
npx gen-from

# Generate in current directory
npx gen-from npm-utils-template --here
```

### Or use GitHub's "Use this template" button
Click the green "Use this template" button on the [GitHub repository page](https://github.com/USERNAME/PROJECT_NAME).

## Installation
```bash
npm i PACKAGE_NAME
```
```bash
pnpm add PACKAGE_NAME
```

## Usage
```typescript
import {myUtilityFunction} from 'PACKAGE_NAME'
// or
import myUtilityFunction from 'PACKAGE_NAME'

// Basic usage
const result = myUtilityFunction('your input');
```

## API
### `myUtilityFunction(input?: any): any`
Main utility function that processes the input.

**Parameters:**
- `input` (optional) - The input to process

**Returns:**
- The processed result

### `processElement(element: HTMLElement): HTMLElement`
Function for DOM element processing.

**Parameters:**
- `element` - HTML element to process

**Returns:**
- The processed element

## Development
```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the package
pnpm run build

# Run tests in watch mode
pnpm run test:watch
```

## Automated Workflows
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ DEPENDABOT  │───▶│    TEST     │───▶│   RELEASE   │───▶│   PUBLISH   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

This repository uses automated dependency management and publishing:
- **📦 Dependabot** - Creates PRs for dependency updates (daily for npm, weekly for actions)
- **🧪 Test PR Action** - Auto-tests and merges passing Dependabot PRs with comment feedback  
- **🚀 Dependabot Release Action** - Creates releases with patch version bumps when dependencies merge
- **📤 Publish NPM Action** - Builds and publishes to npm registry when releases are created

## License
MIT © [USERNAME](https://github.com/USERNAME)
