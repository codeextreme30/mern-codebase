import { spawn } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const backendPort = Number(process.env.BACKEND_PORT || 5000);
const frontendPort = Number(process.env.FRONTEND_PORT || 5173);

const thisDir = path.dirname(fileURLToPath(import.meta.url));
const frontendCwd = path.resolve(thisDir, '..');
const repoRoot = path.resolve(frontendCwd, '..');
const backendCwd = path.resolve(repoRoot, 'backend');

function isPortOpen(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(500);
    socket
      .once('connect', () => {
        socket.destroy();
        resolve(true);
      })
      .once('timeout', () => {
        socket.destroy();
        resolve(false);
      })
      .once('error', () => {
        resolve(false);
      })
      .connect(port, host);
  });
}

async function waitForPort(port, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isPortOpen(port)) return;
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Timed out waiting for port ${port}`);
}

function startProcess(command, args, options) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options,
  });
  return child;
}

const children = [];
let shuttingDown = false;

async function main() {
  // Start backend if not already running
  if (!(await isPortOpen(backendPort))) {
    const backend = startProcess('node', ['server.js'], {
      cwd: backendCwd,
      env: {
        ...process.env,
        PORT: String(backendPort),
      },
    });
    children.push(backend);
    await waitForPort(backendPort, 60_000);
  }

  // Ensure Vite sees the API base url
  const viteApiUrl = process.env.VITE_API_URL || `http://127.0.0.1:${backendPort}/api`;

  // Start frontend if not already running
  if (!(await isPortOpen(frontendPort))) {
    const env = {
      ...process.env,
      VITE_API_URL: viteApiUrl,
      FRONTEND_PORT: String(frontendPort),
    };

    const frontend =
      process.platform === 'win32'
        ? startProcess(
            'cmd.exe',
            ['/d', '/s', '/c', `npm run dev -- --port ${frontendPort} --host 127.0.0.1`],
            { cwd: frontendCwd, env }
          )
        : startProcess('npm', ['run', 'dev', '--', '--port', String(frontendPort), '--host', '127.0.0.1'], {
            cwd: frontendCwd,
            env,
          });

    children.push(frontend);
    await waitForPort(frontendPort, 60_000);
  }

  // Keep this process alive until Playwright stops it.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await new Promise((r) => setTimeout(r, 1_000));
  }
}

async function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    try {
      child.kill('SIGTERM');
    } catch {
      // ignore
    }
  }

  process.exit(exitCode);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

main().catch((err) => {
  console.error(err);
  shutdown(1);
});
