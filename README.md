# @nerdo/code-reviewer

A modern, web-based visual git diff tool for reviewing code changes between commits, branches, and tags.

## Features

- 🔍 **Universal Search**: Search commits by hash, message, author, or date
- 📅 **Smart Date Filtering**: Quick presets (Today, Last 7 days, etc.) or custom ranges  
- 🌲 **Branch & Tag Support**: Compare any combination of branches, tags, and commits
- 📁 **File Browser**: Navigate through changed files with syntax highlighting
- 👁️ **Multiple Views**: Side-by-side, inline, or unchanged file views
- 🎯 **Intelligent Highlighting**: Visual indicators for additions, deletions, and changes
- ⚡ **Fast & Responsive**: Built with React and optimized for performance

## Installation & Usage

The tool ships as a single self-contained executable that bundles the server,
the client, and the runtime — no `node`/`npm` install required on the target
machine (only `git` needs to be on `PATH`). It's built with [Bun](https://bun.sh)
(`bun build --compile`); the client is inlined into a single HTML document
embedded in the binary.

**Build it:**

```bash
bun install                            # first time only
bun run build:binary                   # produces ./dist-binary/code-reviewer
./dist-binary/code-reviewer            # run it from inside any git repo
```

**Install it to your local user bin:**

```bash
bun run install:local
```

This builds the binary and installs it as `cr` in `~/.local/bin`. Make sure that
directory is on your `PATH` (add `export PATH="$HOME/.local/bin:$PATH"` to your
shell profile if needed), then run it from any git repository:

```bash
cr
```

To install somewhere else, set `INSTALL_DIR`:

```bash
INSTALL_DIR=/usr/local/bin bun run install:local
```

To cross-compile for another platform, add a Bun `--target`
(e.g. `--target=bun-linux-x64`) to the `build:binary` script.

### Options

```bash
cr [options]

Options:
  -p, --port <port>    Port to run on (default: 49317)
  -h, --help          Show help message
  --version           Show version

Examples:
  cr
  cr --port 8080
```

## How to Use

1. **Navigate to a git repository** in your terminal
2. **Run the command**: `cr`
3. **Your browser opens automatically** to the code review interface
4. **Select what to compare**:
   - Choose FROM: branch, tag, or commit
   - Choose TO: branch, tag, or commit  
   - Apply date filters if needed
5. **Review the changes**:
   - Browse files in the left sidebar
   - View diffs in side-by-side or inline mode
   - Use universal search to find specific commits

## Interface Overview

### Selection Controls
- **Branch/Tag Tabs**: Switch between branches and tags
- **Autocomplete Search**: Type to filter and find branches, tags, or commits
- **Date Filters**: Filter commits by time ranges (Today, Last 7 days, custom dates)
- **Universal Search**: Search commits by hash, message, author, or date

### Diff Views
- **Side-by-side**: Traditional two-column diff view
- **Inline**: Unified diff with changes highlighted inline
- **Unchanged**: View complete file content without diff highlighting

### File Browser
- **Tree Structure**: Navigate files and folders
- **Change Indicators**: See which files were added, modified, or deleted
- **Quick Navigation**: Click any file to jump to its diff

## Requirements

- **Git**: Must be on `PATH` and run from within a git repository
- **Browser**: Modern browser with JavaScript enabled
- **[Bun](https://bun.sh)**: Required only to build the binary, not to run it

## Development

### Available Scripts

This project uses [Bun](https://bun.sh) for dependency management and scripts.
Run `bun install` to get started.

- `bun run dev` - Start both client and server in development mode
- `bun run test` - Run the test suite
- `bun run test:watch` - Run tests in watch mode
- `bun run lint` - Run ESLint
- `bun run typecheck` - Run TypeScript type checking
- `bun run build` - Build the production bundle
- `bun run build:binary` - Build a standalone executable
- `bun run install:local` - Build the binary and install it as `cr` in `~/.local/bin` (override dir with `INSTALL_DIR`)

### Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── FileBrowser.tsx  # File tree navigation
│   └── DiffViewer.tsx   # Diff display component
├── domain/              # Core business logic
│   ├── entities/        # Domain entities
│   ├── repositories/    # Repository interfaces
│   └── services/        # Domain services
├── infrastructure/      # External integrations
│   └── git/            # Git repository implementations
├── server/              # Express.js API
│   └── routes/         # API endpoints
└── services/            # Frontend API client
```

## Testing

The project includes comprehensive tests for:

- Domain services (DiffService, FileTreeService)
- React components (FileBrowser, DiffViewer)
- Git repository implementations
- Core entities and business logic

Run tests with:
```bash
bun run test
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, TypeScript
- **Git Integration**: simple-git
- **Testing**: Jest, React Testing Library
- **Build Tools**: Vite, TypeScript compiler
- **Linting**: ESLint

## License

MIT License