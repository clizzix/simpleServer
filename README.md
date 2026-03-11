# Basuc Node.js, Mongoose, Express.js scaffold

A modern, production-ready scaffold for Node.js backend projects using TypeScript with ES modules support.

## 🚀 Quick Start

### Setup

```bash

# Navigate to your project
cd your-project-name

# initialize git
git init

# Install dependencies
npm install
npm install -D typescript @types/node
npm i mongoose
npm i express && npm i -D @types/express

# Start development
npm run dev
```

## 🛠 Available Scripts

| Command            | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `npm run dev`      | Start development server with file watching and hot reload |
| `npm run build`    | Compile TypeScript to JavaScript                           |
| `npm run start`    | Build and run the production version                       |
| `npm run prebuild` | Clean the dist directory (runs automatically before build) |
| `npm run prestart` | Build the project (runs automatically before start)        |

## 🔧 Features

### Modern TypeScript Configuration

- **ES2022** target with modern JavaScript features
- **Strict mode** enabled for better type safety
- **ES Modules** support (native Node.js ESM)
- **Path aliases** with `#` prefix to avoid conflicts
- **Import extensions** support for better IDE experience

### Development Experience

- **File watching** with `--watch` flag for instant reloads
- **TypeScript** compilation with proper module resolution
- **Clean builds** with automatic dist cleanup
- **Isolated modules** for better compilation performance

### Path Aliases

The project supports internal path aliases using the `#` prefix:

```typescript
// Instead of relative imports like this:
import { helper } from '../../../utils';

// You can use clean aliases like this:
import { helper } from '#utils';
```

You need to add additional modules subpaths to the `imports` field in `package.json`
