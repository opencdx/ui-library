/* eslint-disable react/display-name */
import React from "react";
import {Meta} from "@storybook/react";
import {toggle} from "@nextui-org/theme";
import {SunFilledIcon, MoonFilledIcon} from "@nextui-org/shared-icons";
import {button} from "@nextui-org/theme";
import {useForm} from "react-hook-form";



import {Switch, SwitchProps, SwitchThumbIconProps} from "@/index";

export default {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
  parameters: {
    layout: 'centered', // Center buttons in the Storybook canvas
  },
} as Meta<typeof Switch>;

const defaultProps = {
  ...toggle.defaultVariants,
};

const WithIconsTemplate = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch
        {...args}
        classNames={{
          startContent: "text-white",
        }}
        endContent={<MoonFilledIcon />}
        isSelected={isSelected}
        startContent={<SunFilledIcon />}
        onValueChange={setIsSelected}
      />
      <p className="text-default-500">Selected: {isSelected ? "true" : "false"}</p>
    </div>
  );
};

const ControlledTemplate = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch {...args} isSelected={isSelected} onValueChange={setIsSelected} />
      <p className="text-default-500">Selected: {isSelected ? "true" : "false"}</p>
    </div>
  );
};


const WithReactHookFormTemplate = (args: SwitchProps) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      defaultTrue: true,
      defaultFalse: false,
      requiredField: false,
    },
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Switch {...args} {...register("defaultTrue")}>
        By default this switch is true
      </Switch>
      <Switch {...args} {...register("defaultFalse")}>
        By default this switch is false
      </Switch>
      <Switch {...args} {...register("requiredField", {required: true})}>
        This switch is required
      </Switch>
      {errors.requiredField && <span className="text-danger">This switch is required</span>}
      <button className={button({class: "w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const IsReadOnly = {
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultSelected: true,
  },
};

export const WithLabel = {
  args: {
    ...defaultProps,
    children: "Bluetooth",
  },
};

export const DisableAnimation = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const WithThumbIcon = {
  args: {
    ...defaultProps,
    size: "xl",
    thumbIcon: (props: SwitchThumbIconProps) =>
      props.isSelected ? (
        <SunFilledIcon className={props.className} />
      ) : (
        <MoonFilledIcon className={props.className} />
      ),
  },
};

export const WithIcons = {
  render: WithIconsTemplate,

  args: {
    ...defaultProps,
    size: "xl",
  },
};

export const WithReactHookForm = {
  render: WithReactHookFormTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

