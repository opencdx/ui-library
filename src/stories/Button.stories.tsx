import React from 'react';

import { Button, ButtonProps } from '@/Button';
import { Camera, HeadphonesIcon, Notification } from '@nextui-org/shared-icons';
import { button } from '@nextui-org/theme';
import { Meta } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: [
        'solid',
        'bordered',
        'light',
        'flat',
        'faded',
        'shadow',
        'ghost',
      ],
    },
    color: {
      control: {
        type: 'select',
      },
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
      ],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    spinnerPlacement: {
      control: {
        type: 'select',
      },
      options: ['start', 'end'],
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    disableAnimation: {
      control: {
        type: 'boolean',
      },
    },
  },
  parameters: {
    layout: 'centered', // Center buttons in the Storybook canvas
  },
} as Meta<typeof Button>;

const defaultProps = {
  children: 'Button',
  spinnerPlacement: 'start',
  ...button.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
    fullWidth: true,
    radius: 'full',
    children: 'Sign In',
    color: 'primary',
  },
};

export const WithSquareCorners = {
  args: {
    ...defaultProps,
    radius: 'none',
    children: 'Spreadsheet View',
    variant: "solid",
    color: 'primary',
  },
};

export const WithRoundedCorners = {
  args: {
    ...defaultProps,
    radius: 'full',
    children: 'Rounded Corners Button',
    color: 'primary',
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
    children: 'Disable Button',
    color: 'primary',
    radius: 'lg',
  },
};

export const DisableRipple = {
  args: {
    ...defaultProps,
    disableRipple: true,
  },
};

export const WithIconLeft = {
  args: {
    ...defaultProps,
    startContent: <HeadphonesIcon className="fill-current" />,
    children: 'Clear All',
  },
};

export const WithIconRight = {
  args: {
    ...defaultProps,
    endContent: <HeadphonesIcon className="fill-current" />,
    children: 'Continue',
    color: 'primary',
    radius: 'full',
  },
};

export const IconButton = {
  args: {
    ...defaultProps,
    isIconOnly: true,
    children: <HeadphonesIcon className="w-5 h-5" />,
    disableAnimation: false,
    isLoading: false,
    radius: 'md',
  },
};

export const IsLoading = {
  args: {
    ...defaultProps,
    color: 'primary',
    isLoading: true,
  },
};
