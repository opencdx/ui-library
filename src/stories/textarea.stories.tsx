import type {ValidationResult} from "@react-types/shared";

import React from "react";
import {Meta} from "@storybook/react";
import {input} from "@nextui-org/theme";
import {SendFilledIcon, PlusFilledIcon} from "@nextui-org/shared-icons";
import {button} from "@nextui-org/theme";

import {Textarea, TextAreaProps} from "@/index";

export default {
  title: "Components/Textarea",
  component: Textarea,
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
    disableAutosize: {
      control: {
        type: "boolean",
      },
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
} as Meta<typeof Textarea>;

const defaultProps = {
  ...input.defaultVariants,
  disableAutosize: false,
  label: "Description",
  placeholder: "Enter your description",
};

const Template = (args: TextAreaProps) => (
  <div className="w-full max-w-[440px]">
    <Textarea {...args} />
  </div>
);

const ControlledTemplate = (args: TextAreaProps) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full  flex-col gap-2 max-w-[440px]">
      <Textarea {...args} value={value} onValueChange={setValue} />
      <p className="text-default-500 text-small">Textarea value: {value}</p>
    </div>
  );
};

const MinRowsTemplate = (args: TextAreaProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Textarea {...args} description="Default minRows is 3" />
    <Textarea {...args} description="minRows is 5" minRows={5} />
    <Textarea {...args} description="minRows is 10" minRows={10} />
  </div>
);

const MaxRowsTemplate = (args: TextAreaProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Textarea {...args} description="Default maxRows is 8" />
    <Textarea {...args} description="maxRows is 5" maxRows={5} />
    <Textarea {...args} description="maxRows is 3" maxRows={3} />
  </div>
);

const FormTemplate = (args: TextAreaProps) => (
  <form
    className="w-full max-w-xl flex flex-row items-end gap-4"
    onSubmit={(e) => {
      const target = e.target as HTMLFormElement;
      alert(`Submitted value: ${target.textarea.value}`);
      e.preventDefault();
    }}
  >
    <div className="w-full max-w-[440px]">
      <Textarea name="textarea" {...args} />
    </div>

    <button className={button({color: "primary"})} type="submit">
      Submit
    </button>
  </form>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const FullRounded = {
  render: Template,

  args: {
    ...defaultProps,
    minRows: 1,
    label: null,
    classNames: {
      input: "py-1",
    },
    "aria-label": "Description",
    placeholder: "Enter your description",
    variant: "bordered",
    radius: "full",
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
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "faded",
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "bordered",
    isReadOnly: true,
  },
};

export const WithStartContent = {
  render: Template,

  args: {
    ...defaultProps,
    startContent: <PlusFilledIcon className="text-xl" />,
  },
};

export const WithEndContent = {
  render: Template,

  args: {
    ...defaultProps,
    minRows: 1,
    label: null,
    endContent: (
      <div className="p-1">
        <SendFilledIcon className="text-xl" />
      </div>
    ),
    classNames: {
      input: "py-1",
    },
    "aria-label": "Description",
    placeholder: "Enter your description",
    variant: "bordered",
    radius: "full",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const MinRows = {
  render: MinRowsTemplate,

  args: {
    ...defaultProps,
  },
};

export const MaxRows = {
  render: MaxRowsTemplate,

  args: {
    ...defaultProps,
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    IsInvalid: true,
    errorMessage: "Please enter a valid description",
  },
};

export const WithErrorMessageFunction = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
    minLength: "10",
    maxLength: "",
    label: "Comment",
    placeholder: "Enter your comment (10-100 characters)",
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.tooLong) {
        return "Comment is too short. Min 10 characters.";
      }
      if (value.validationDetails.tooShort) {
        return "Comment is too long. Max 100 characters.";
      }
      if (value.validationDetails.valueMissing) {
        return "Comment is required";
      }
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    validate: (value: string) => {
      if (value.length < 10) {
        return "Comment is too short. Min 10 characters.";
      }
      if (value.length > 100) {
        return "Comment is too long. Max 100 characters.";
      }
    },
    isRequired: true,
    label: "Comment",
    placeholder: "Enter your comment (10-100 characters)",
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    defaultValue: "Hi, I am text area",
    errorMessage: "Please enter a valid description",
  },
};
