import React from 'react';

import {
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
  useRadio,
} from '@/index';

import { clsx } from '@nextui-org/shared-utils';
import { button, radio } from '@nextui-org/theme';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import type { ValidationResult } from '@react-types/shared';
import { Meta } from '@storybook/react';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  onChange: { action: 'changed' },
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
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
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
} as Meta<typeof RadioGroup>;

const defaultProps = {
  ...radio.defaultVariants,
  label: 'Options',
};

const Template = (args: RadioGroupProps) => {
  const radioProps = args.description
    ? {
        a: {
          description: 'Description for Option A',
        },
        b: {
          description: 'Description for Option B',
        },
        c: {
          description: 'Description for Option C',
        },
        d: {
          description: 'Description for Option D',
        },
      }
    : {
        a: {},
        b: {},
        c: {},
        d: {},
      };

  const items = (
    <>
      <Radio value="A" {...radioProps.a}>
        Option A
      </Radio>
      <Radio value="B" {...radioProps.b}>
        Option B
      </Radio>
      <Radio value="C" {...radioProps.c}>
        Option C
      </Radio>
      <Radio value="D" {...radioProps.d}>
        Option D
      </Radio>
    </>
  );

  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        const target = e.target as HTMLFormElement;
        alert(`Submitted value: ${target['sample'].value}`);
        e.preventDefault();
      }}
    >
      <RadioGroup {...args} name="sample">
        {items}
      </RadioGroup>
      <button className={button({ color: 'primary' })} type="submit">
        Submit
      </button>
    </form>
  ) : (
    <RadioGroup {...args}>{items}</RadioGroup>
  );
};

const ControlledTemplate = (args: RadioGroupProps) => {
  const [selectedItem, setSelectedItem] = React.useState<string>('london');

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('isSelected:', selectedItem);
  }, [selectedItem]);

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup
        label="Select city"
        value={selectedItem}
        onValueChange={setSelectedItem}
        {...args}
      >
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <p className="text-default-500">Selected: {selectedItem}</p>
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  render: Template,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DefaultChecked = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: 'C',
  },
};

export const IsRequired = {
  render: Template,
  args: {
    ...defaultProps,
    isRequired: true,
    color: 'default',
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: 'Please select an option',
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isRequired: true,
    isInvalid: true,
    errorMessage: 'The selected option is invalid',
  },
};

export const WithValidation = {
  render: Template,

  args: {
    ...defaultProps,
    isRequired: true,
    description: 'Please select an option',
    validate: (value: string) => {
      if (value === 'A') {
        return 'Option A is not allowed';
      }
    },
  },
};

export const Row = {
  render: Template,

  args: {
    ...defaultProps,
    orientation: 'horizontal',
  },
};

export const DisableAnimation = {
  render: Template,

  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

const RadioCard = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={clsx(
        'group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4',
        {
          'border-primary': isSelected,
        },
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className={clsx('text-sm text-foreground opacity-70')}>
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

export const CustomWithHooks = () => {
  return (
    <RadioGroup label="Plans">
      <RadioCard description="Up to 20 items" value="free">
        Free
      </RadioCard>
      <RadioCard description="Unlimited items. $10 per month." value="pro">
        Pro
      </RadioCard>
      <RadioCard
        description="24/7 support. Contact us for pricing."
        value="enterprise"
      >
        Enterprise
      </RadioCard>
    </RadioGroup>
  );
};
