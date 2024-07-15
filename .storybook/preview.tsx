import React from 'react';

import { NextUIProvider } from '@nextui-org/system';
import type { Preview } from '@storybook/react';

import "../src/styles/globals.css";

const decorators: Preview['decorators'] = [
  (Story, {}) => {
    return (
      <NextUIProvider>
        <div>
          <Story />
        </div>
      </NextUIProvider>
    );
  },
];

const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const preview: Preview = {
  decorators,
  parameters,
};

export default preview;
