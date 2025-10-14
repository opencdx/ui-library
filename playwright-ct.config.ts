import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './tests/component',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  
  use: {
    trace: 'on-first-retry',
    ctPort: 3100,
    ctViteConfig: async () => {
      const fs = await import('fs');
      const path = await import('path');
      const resolver: any = {
        name: 'ct-instrumented-resolver',
        enforce: 'pre',
        resolveId(id: string, importer?: string) {
          if (!importer) return null;
          if (!id.startsWith('.')) return null;
          const abs = path.resolve(path.dirname(importer), id);
          if (!abs.includes(`${path.sep}src${path.sep}`)) return null;
          const instrumented = abs.replace(`${path.sep}src${path.sep}`, `${path.sep}.instrumented${path.sep}`);
          const candidates = [instrumented, `${instrumented}.ts`, `${instrumented}.tsx`, `${instrumented}.js`, `${instrumented}.jsx`, path.join(instrumented, 'index.ts'), path.join(instrumented, 'index.tsx'), path.join(instrumented, 'index.js'), path.join(instrumented, 'index.jsx')];
          for (const file of candidates) {
            try {
              if (fs.existsSync(file)) return file;
            } catch {}
          }
          return null;
        },
      };
      return {
        build: { minify: false, sourcemap: true },
        plugins: [resolver],
      } as any;
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

