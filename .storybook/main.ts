import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],
  // Avoid parsing preview/stories with Babel docgen (conflicts with local .babelrc)
  typescript: {
    reactDocgen: false,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    // Polyfill process.env for Next client modules that expect it
    config.define = { ...(config.define || {}), 'process.env': {} };

    // Alias next/image to a simple mock for Storybook (non-Next runtime)
    const aliasEntries = [
      { find: 'next/image', replacement: resolve(process.cwd(), '.storybook/next-image.mock.tsx') },
      { find: '@', replacement: resolve(process.cwd(), 'src') },
    ];
    const existingAlias = config.resolve?.alias;
    if (Array.isArray(existingAlias)) {
      config.resolve = { ...(config.resolve || {}), alias: [...existingAlias, ...aliasEntries] };
    } else {
      config.resolve = {
        ...(config.resolve || {}),
        alias: { ...(existingAlias as any), 'next/image': aliasEntries[0].replacement, '@': aliasEntries[1].replacement },
      } as any;
    }

    // Ensure single React instance to avoid hook errors
    config.resolve = {
      ...(config.resolve || {}),
      dedupe: ['react', 'react-dom', ...((config.resolve as any)?.dedupe || [])],
    } as any;

    return config;
  },
};
export default config;
