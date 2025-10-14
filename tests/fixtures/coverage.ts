import path from 'path';
import fs from 'fs/promises';
import { test as base, expect } from '@playwright/experimental-ct-react';

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);
    try {
      const outputDir = path.join(process.cwd(), '.nyc_output');
      await fs.mkdir(outputDir, { recursive: true });

      // Collect coverage from the main page
      const mainCoverage = await page.evaluate(() => (window as any).__coverage__);
      if (mainCoverage) {
        const filePath = path.join(outputDir, `coverage-main-${testInfo.workerIndex}-${Date.now()}.json`);
        await fs.writeFile(filePath, JSON.stringify(mainCoverage));
      }

      // Collect coverage from all frames (CT mounts in an iframe)
      for (const frame of page.frames()) {
        try {
          const frameCoverage = await frame.evaluate(() => (window as any).__coverage__);
          if (frameCoverage) {
            const filePath = path.join(outputDir, `coverage-frame-${testInfo.workerIndex}-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
            await fs.writeFile(filePath, JSON.stringify(frameCoverage));
          }
        } catch {
          // ignore frame access errors
        }
      }
    } catch {
      // ignore
    }
  },
});

export { expect };


