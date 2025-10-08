import { defineConfig } from "cypress";
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: true,
    html: true,
    json: true,
  },
  component: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        plugins: [
          react({
            babel: {
              plugins: ['istanbul'],
            },
          }),
        ],
        define: { 'process.env': {} },
        resolve: {
          alias: {
            '@': resolve(__dirname, 'src'),
          },
        },
      },
    },
  },
});
