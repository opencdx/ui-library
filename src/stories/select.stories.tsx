/* eslint-disable react/display-name */
import type {ValidationResult} from "@react-types/shared";

import React, {ChangeEvent} from "react";
import {useForm} from "react-hook-form";
import {Meta} from "@storybook/react";
import {select, button} from "@nextui-org/theme";
import {PetBoldIcon} from "@nextui-org/shared-icons";
import {Avatar} from "@nextui-org/avatar";

import {
  animalsData,
  Animal,
  User,
} from "@nextui-org/stories-utils";

import {Select, SelectedItems, SelectItem, SelectProps, SelectSection} from "@/Select";

export default {
  title: "Components/Select",
  component: Select,
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
  },
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Select>;

const defaultProps = {
  ...select.defaultVariants,
};

const items = animalsData.map((item) => (
  <SelectItem key={item.value} value={item.value}>
    {item.label}
  </SelectItem>
));

const Template = ({color, variant, ...args}: SelectProps) => (
  <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
    {items}
  </Select>
);

const DynamicTemplate = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select
    className="max-w-xs"
    color={color}
    items={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
  </Select>
);

const DynamicTemplateWithDescriptions = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select
    className="max-w-xs"
    color={color}
    items={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => (
      <SelectItem key={item.value} description={item.description}>
        {item.label}
      </SelectItem>
    )}
  </Select>
);

const ItemStartContentTemplate = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select className="max-w-xs" color={color} label="Select country" variant={variant} {...args}>
    <SelectItem
      key="argentina"
      startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
    >
      Argentina
    </SelectItem>
    <SelectItem
      key="venezuela"
      startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
    >
      Venezuela
    </SelectItem>
    <SelectItem
      key="brazil"
      startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
    >
      Brazil
    </SelectItem>
    <SelectItem
      key="switzerland"
      startContent={
        <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
      }
    >
      Switzerland
    </SelectItem>
    <SelectItem
      key="germany"
      startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
    >
      Germany
    </SelectItem>
    <SelectItem
      key="spain"
      startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
    >
      Spain
    </SelectItem>
    <SelectItem
      key="france"
      startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
    >
      France
    </SelectItem>
    <SelectItem
      key="italy"
      startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
    >
      Italy
    </SelectItem>
    <SelectItem
      key="mexico"
      startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
    >
      Mexico
    </SelectItem>
  </Select>
);

const FormTemplate = ({color, variant, ...args}: SelectProps) => {
  return (
    <form
      className="w-full max-w-xs items-end flex flex-col gap-4"
      onSubmit={(e) => {
        const target = e.target as HTMLFormElement;
        alert(`Submitted value: ${target["favorite-animal"].value}`);
        e.preventDefault();
      }}
    >
      <Select
        color={color}
        label="Favorite Animal"
        name="favorite-animal"
        variant={variant}
        {...args}
      >
        {items}
      </Select>
      <button className={button({className: "max-w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const MirrorTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Select className="max-w-xs" color={color} label="Select an animal" variant={variant} {...args}>
      {items}
    </Select>
    <Select
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      placeholder="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Select>
  </div>
);

const LabelPlacementTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select color={color} label="Select an animal" variant={variant} {...args}>
          {items}
        </Select>
        <Select
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
  </div>
);

const StartContentTemplate = ({color, variant, ...args}: SelectProps) => (
  <Select
    className="max-w-xs"
    color={color}
    defaultSelectedKeys={["cat"]}
    label="Favorite Animal"
    startContent={<PetBoldIcon />}
    variant={variant}
    {...args}
  >
    {items}
  </Select>
);


const WithSectionsTemplate = ({color, variant, ...args}: SelectProps<User>) => (
  <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
    <SelectSection showDivider title="Mammals">
      <SelectItem key="Lion">Lion</SelectItem>
      <SelectItem key="Tiger">Tiger</SelectItem>
      <SelectItem key="Elephant">Elephant</SelectItem>
      <SelectItem key="Kangaroo">Kangaroo</SelectItem>
      <SelectItem key="Panda">Panda</SelectItem>
      <SelectItem key="Giraffe">Giraffe</SelectItem>
      <SelectItem key="Zebra">Zebra</SelectItem>
      <SelectItem key="Cheetah">Cheetah</SelectItem>
    </SelectSection>
    <SelectSection title="Birds">
      <SelectItem key="Eagle">Eagle</SelectItem>
      <SelectItem key="Parrot">Parrot</SelectItem>
      <SelectItem key="Penguin">Penguin</SelectItem>
      <SelectItem key="Ostrich">Ostrich</SelectItem>
      <SelectItem key="Peacock">Peacock</SelectItem>
      <SelectItem key="Swan">Swan</SelectItem>
      <SelectItem key="Falcon">Falcon</SelectItem>
      <SelectItem key="Flamingo">Flamingo</SelectItem>
    </SelectSection>
  </Select>
);


export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
  },
};

export const Multiple = {
  render: Template,

  args: {
    ...defaultProps,
    selectionMode: "multiple",
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
    selectedKey: "cat",
    variant: "faded",
    isDisabled: true,
  },
};

export const DisabledOptions = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ["zebra", "tiger", "lion", "elephant", "crocodile", "whale"],
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    variant: "bordered",
    defaultSelectedKeys: ["dog"],
    errorMessage: "Please select a valid animal",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "Select your favorite animal",
  },
};

export const WithItemDescriptions = {
  render: DynamicTemplateWithDescriptions,

  args: {
    ...defaultProps,
  },
};

export const WithItemStartContent = {
  render: ItemStartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithErrorMessage = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please select an animal",
  },
};


export const WithSections = {
  render: WithSectionsTemplate,

  args: {
    ...defaultProps,
  },
};





