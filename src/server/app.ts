import express from 'express';
import cors from 'cors';
import path from 'path';
import { repositoryRouter } from './routes/repository';
import { commitRouter } from './routes/commit';
import { fileRouter } from './routes/file';

export interface CreateAppOptions {
  /** Serve the built client from this directory (npm/global install layout). */
  distPath?: string;
  /** Serve this self-contained HTML string for all non-API routes (compiled binary). */
  indexHtml?: string;
}

export function createApp(options: CreateAppOptions = {}): express.Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/repository', repositoryRouter);
  app.use('/api/commits', commitRouter);
  app.use('/api/files', fileRouter);

  // Serve the client. The binary embeds a single inlined HTML document; the
  // npm package serves the built assets from disk. Both fall back to the
  // client for non-API routes so client-side routing works.
  if (options.indexHtml) {
    const html = options.indexHtml;
    app.get('*', (_req, res) => {
      res.type('html').send(html);
    });
  } else if (options.distPath) {
    const distPath = options.distPath;
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error handling middleware (must declare all four params to be recognized
  // by Express as an error handler).
  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error('Server error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  );

  return app;
}
