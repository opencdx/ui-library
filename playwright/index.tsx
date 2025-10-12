import '../src/styles/globals.css';
import { NextUIProvider } from '@nextui-org/system';
import React from 'react';

// @ts-ignore
export default function App({ Component }: { Component: React.ComponentType }) {
  return (
    <NextUIProvider>
      <Component />
    </NextUIProvider>
  );
}

