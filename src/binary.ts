// Standalone-binary entry point, compiled with `bun build --compile`.
// Unlike src/cli.ts (which spawns a separate `node` server process and serves
// the client from disk), this runs the server in-process and serves a single
// self-contained HTML document embedded into the binary at build time.
//
// This file is Bun-only: it uses a Bun asset import and is excluded from the
// tsc/eslint toolchain (see tsconfig.json + .eslintrc.cjs).
import { execSync, exec } from 'child_process';
// The inlined client, produced by `BINARY_BUILD=1 vite build`. Embedded by Bun.
import indexHtml from '../dist-binary/index.html' with { type: 'text' };
import pkg from '../package.json';
import { createApp } from './server/app';

const args = process.argv.slice(2);

function showHelp(): void {
  console.log(`
${pkg.name} - Visual Git Diff Tool

Usage:
  cr [options]

Options:
  -p, --port <port>    Port to run on (default: 49317)
  -h, --help           Show this help message
  --version            Show version

The tool starts a local web server and opens your browser to view git diffs.
Run it from within a git repository.
`);
}

let port: string | number = process.env.PORT || 49317;
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === '-h' || arg === '--help') {
    showHelp();
    process.exit(0);
  }

  if (arg === '--version') {
    console.log(pkg.version);
    process.exit(0);
  }

  if (arg === '-p' || arg === '--port') {
    const nextArg = args[i + 1];
    if (nextArg && !isNaN(parseInt(nextArg))) {
      port = nextArg;
      i++;
    } else {
      console.error('Error: --port requires a valid port number');
      process.exit(1);
    }
  }
}

function checkGitRepo(): boolean {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (!checkGitRepo()) {
  console.error(
    'Error: Not in a git repository. Please run this command from within a git repository.'
  );
  process.exit(1);
}

function openBrowser(url: string): void {
  const start =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
        ? 'start'
        : 'xdg-open';

  exec(`${start} ${url}`, (error) => {
    if (error) {
      console.log(`Open your browser and navigate to: ${url}`);
    }
  });
}

const app = createApp({ indexHtml });

const server = app.listen(Number(port), () => {
  const url = `http://localhost:${port}`;
  console.log('Starting Code Reviewer...');
  console.log(`Server running on ${url}`);
  openBrowser(url);
});

function shutdown(): void {
  console.log('\nShutting down Code Reviewer...');
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
