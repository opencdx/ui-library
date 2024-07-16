import React from 'react';

import {
  Checkbox,
  CheckboxIconProps,
  CheckboxProps,
} from '@/checkbox';
import { CloseIcon } from '@nextui-org/shared-icons';
import { button, checkbox } from '@nextui-org/theme';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
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
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    lineThrough: {
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    validationBehavior: {
      control: {
        type: 'select',
      },
      options: ['aria', 'native'],
    },
  },
  parameters: {
    layout: 'centered', // Center buttons in the Storybook canvas
  },
} as Meta<typeof Checkbox>;

const defaultProps: CheckboxProps = {
  ...checkbox.defaultVariants,
  children: 'Option',
};

const WithReactHookFormTemplate = (args: CheckboxProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
    alert('Submitted value: ' + data.example);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Checkbox {...args} {...register('example', { required: true })} />
      {errors.example && (
        <span className="text-danger">This field is required</span>
      )}
      <button className={button({ class: 'w-fit' })} type="submit">
        Submit
      </button>
    </form>
  );
};

export const Default = {
  args: {
    ...defaultProps,
    size: 'lg',
    children: "I'm Checkbox",
    validationBehavior: 'native',
    radius: 'lg',
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
    children: "I'm disabled checkbox",
  },
};

export const DefaultSelected = {
  args: {
    ...defaultProps,
    defaultSelected: true,
  },
};

export const CustomIconNode = {
  args: {
    ...defaultProps,
    icon: <CloseIcon />,
  },
};

export const WithReactHookForm = {
  render: WithReactHookFormTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomIconFunction = {
  args: {
    ...defaultProps,
    // eslint-disable-next-line react/display-name
    icon: (props: CheckboxIconProps) => <CloseIcon {...props} />,
  },
};

export const AlwaysSelected = {
  args: {
    ...defaultProps,
    isSelected: true,
  },
};

export const IsIndeterminate = {
  args: {
    ...defaultProps,
    isIndeterminate: true,
  },
};

export const LineThrough = {
  args: {
    ...defaultProps,
    lineThrough: true,
  },
};

export const DisableAnimation = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};


