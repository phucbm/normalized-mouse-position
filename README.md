# normalized-mouse-position
A TypeScript utility package

[![npm version](https://badgen.net/npm/v/normalized-mouse-position?icon=npm)](https://www.npmjs.com/package/normalized-mouse-position)
[![npm downloads](https://badgen.net/npm/dm/normalized-mouse-position?icon=npm)](https://www.npmjs.com/package/normalized-mouse-position)
[![npm dependents](https://badgen.net/npm/dependents/normalized-mouse-position?icon=npm)](https://www.npmjs.com/package/normalized-mouse-position)
[![github stars](https://badgen.net/github/stars/phucbm/normalized-mouse-position?icon=github)](https://github.com/phucbm/normalized-mouse-position/)
[![github license](https://badgen.net/github/license/phucbm/normalized-mouse-position?icon=github)](https://github.com/phucbm/normalized-mouse-position/blob/main/LICENSE)

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
Click the green "Use this template" button on the [GitHub repository page](https://github.com/phucbm/normalized-mouse-position).

## Installation
```bash
npm i normalized-mouse-position
```
```bash
pnpm add normalized-mouse-position
```

## Usage
```typescript
import {myUtilityFunction} from 'normalized-mouse-position'
// or
import myUtilityFunction from 'normalized-mouse-position'

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
MIT © [phucbm](https://github.com/phucbm)
