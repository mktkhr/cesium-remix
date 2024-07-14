import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.css'],
    }),
    cesium(),
    tsconfigPaths(),
  ],
});
