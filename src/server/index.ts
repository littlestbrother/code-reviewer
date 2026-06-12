import { createApp } from './app';

const PORT = process.env.PORT || 3001;

// When launched by the CLI, DIST_PATH points at the built client assets.
const app = createApp({ distPath: process.env.DIST_PATH });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
