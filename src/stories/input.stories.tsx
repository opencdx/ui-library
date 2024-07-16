

import React from "react";
import {Meta} from "@storybook/react";
import {input} from "@nextui-org/theme";
import {
  MailFilledIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from "@nextui-org/shared-icons";
import {button} from "@nextui-org/theme";

import {Input, InputProps, useInput} from "@/input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    validationBehavior: {
      control: {
        type: "select",
      },
      options: ["aria", "native"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Input>;

const defaultProps = {
  ...input.defaultVariants,
  label: "Email",
};

const Template = (args: InputProps) => (
  <div className="w-full max-w-[240px]">
    <Input {...args} />
  </div>
);

const MirrorTemplate = (args: InputProps) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input {...args} />
    <Input {...args} placeholder="Enter your email" />
  </div>
);

const FormTemplate = (args: InputProps) => (
  <form
    className="w-full max-w-xl flex flex-row items-end gap-4"
    onSubmit={(e) => {
      const target = e.target as HTMLFormElement;
      const exampleValue = target.elements.namedItem("example") as HTMLInputElement;
      alert(`Submitted value: ${exampleValue.value}`);
      e.preventDefault();
    }}
  >
    <Input {...args} name="example" />
    <button className={button({color: "primary"})} type="submit">
      Submit
    </button>
  </form>
);

const PasswordTemplate = (args: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="w-full max-w-[240px]">
      <Input
        {...args}
        endContent={
          <button
            aria-label="show password"
            aria-pressed={isPasswordVisible}
            type="button"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
    </div>
  );
};

const RegexValidationTemplate = (args: InputProps) => {
  const [value, setValue] = React.useState("");

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const validationState = React.useMemo(() => {
    if (value === "") return undefined;

    return validateEmail(value) ? "valid" : "invalid";
  }, [value]);

  return (
    <div className="w-full max-w-[240px]">
      <Input
        {...args}
        errorMessage={validationState === "invalid" && "Please enter a valid email"}
        placeholder="Enter your email"
        validationState={validationState}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};



const LabelPlacementTemplate = (args: InputProps) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full max-w-xl flex flex-row items-end gap-4">
        <Input {...args} description="inside" />
        <Input {...args} description="outside" labelPlacement="outside" />
        <Input {...args} description="outside-left" labelPlacement="outside-left" />
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full max-w-xl flex flex-row items-end gap-4">
        <Input {...args} description="inside" placeholder="Enter your email" />
        <Input
          {...args}
          description="outside"
          labelPlacement="outside"
          placeholder="Enter your email"
        />
        <Input
          {...args}
          description="outside-left"
          labelPlacement="outside-left"
          placeholder="Enter your email"
        />
      </div>
    </div>
  </div>
);

const StartContentTemplate = (args: InputProps) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input
      {...args}
      // placeholder="you@example.com"
      startContent={
        <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
    <Input
      {...args}
      label="Price"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      type="number"
    />
  </div>
);

const EndContentTemplate = (args: InputProps) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input
      {...args}
      endContent={
        <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      placeholder="you@example.com"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      label="Price"
      placeholder="0.00"
      type="number"
    />
  </div>
);

const StartAndEndContentTemplate = (args: InputProps) => (
  <div className="w-full max-w-xs flex flex-col items-end gap-4">
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">@gmail.com</span>
        </div>
      }
      placeholder="nextui"
      startContent={
        <MailFilledIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
    <Input
      {...args}
      endContent={
        <div className="flex items-center">
          <label className="sr-only" htmlFor="currency">
            Currency
          </label>
          <select
            className="outline-none border-0 bg-transparent text-default-400 text-sm"
            id="currency"
            name="currency"
          >
            <option>USD</option>
            <option>ARS</option>
            <option>EUR</option>
          </select>
        </div>
      }
      label="Price"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      type="number"
    />
  </div>
);

const InputTypesTemplate = (args: InputProps) => (
  <div className="grid grid-cols-3 gap-4">
    <Input {...args} label="Text" placeholder="Enter your text" />
    <Input {...args} label="Number" placeholder="Enter your number" type="number" />
    <Input {...args} label="Password" placeholder="Enter your password" type="password" />
    <Input {...args} label="Email" placeholder="Enter your email" type="email" />
    <Input {...args} label="URL" placeholder="Enter your url" type="url" />
    <Input {...args} label="Tel" placeholder="Enter your phone" type="tel" />
    <Input {...args} label="Date" placeholder="Enter your date" type="date" />
    <Input {...args} label="Time" placeholder="Enter your time" type="time" />
  </div>
);


export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
  },
};

export const Required = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: "junior@nextui.org",
    variant: "faded",
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: "junior@nextui.org",
    variant: "bordered",
    isReadOnly: true,
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Email",
    placeholder: "Enter your email",
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "We'll never share your email with anyone else.",
  },
};

export const Password = {
  render: PasswordTemplate,

  args: {
    ...defaultProps,
    label: "Password",
    placeholder: "Enter your password",
    variant: "bordered",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const Clearable = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    placeholder: "Enter your email",
    defaultValue: "junior@nextui.org",
    // eslint-disable-next-line no-console
    onClear: () => console.log("input cleared"),
  },
};

export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
  },
};

export const EndContent = {
  render: EndContentTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    labelPlacement: "outside",
  },
};

export const StartAndEndContent = {
  render: StartAndEndContentTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    labelPlacement: "outside",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please enter a valid email address",
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    type: "number",
    validate: (value: number) => {
      if (value < 0 || value > 100) {
        return "Value must be between 0 and 100";
      }
    },
    isRequired: true,
    label: "Number",
    placeholder: "Enter a number(0-100)",
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    isInvalid: true,
    defaultValue: "invalid@email.com",
    placeholder: "Enter your email",
    errorMessage: "Please enter a valid email address",
  },
};

export const RegexValidation = {
  render: RegexValidationTemplate,

  args: {
    ...defaultProps,
    variant: "faded",
  },
};

export const InputTypes = {
  render: InputTypesTemplate,

  args: {
    ...defaultProps,
  },
};


