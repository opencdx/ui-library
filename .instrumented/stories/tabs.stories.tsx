
import React from "react";
import {Meta} from "@storybook/react-vite";
import {button, link, tabs} from "@nextui-org/theme";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {Card, CardBody} from "@nextui-org/card";
import {
  AlignVerticallyBoldIcon,
  AlignHorizontallyBoldIcon,
  AlignBottomBoldIcon,
  AlignLeftBoldIcon,
  AlignRightBoldIcon,
  AlignTopBoldIcon,
} from "@nextui-org/shared-icons";

import {Tabs, Tab, TabsProps} from "@/index";

export default {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "underlined", "bordered", "light"],
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
} as Meta<typeof Tabs>;

const defaultProps = {
  ...tabs.defaultVariants,
};

const StaticTemplate = (args: TabsProps) => (
  <Tabs aria-label="Tabs example" {...args}>
    <Tab key="world" title="World">
      <p>The world is the totality of entities, the whole of reality, or everything that exists. The nature of the world has been conceptualized differently in different fields.</p>
    </Tab>
    <Tab key="ny" title="N.Y">
      <p>NY is an abbreviation for New York, either the US state of New York or New York City. New York is a state in the northeastern United States and one of the original 13 colonies. Its capital is Albany and its largest city is New York City, which is also the most populated city in the country.</p>
    </Tab>
    <Tab key="business" title="Business">
      <p>Business is the practice of making one's living or making money by producing or buying and selling products. It is also "any activity or enterprise entered into for profit." A business entity is not necessarily separate from the owner and the creditors can hold the owner liable for debts the business has acquired.</p>
    </Tab>
    <Tab key="arts" title="Arts">
      <p>The arts are a group of activities that people create using their imagination, creativity, and skill across cultures and history. These activities can include painting, sculpture, music, literature, and theater. Art can also be a visual object or experience that is created through the expression of skill or imagination.</p>
    </Tab>
    <Tab key="science" title="Science">
      <p>Science is the pursuit and application of knowledge and understanding of the natural and social world following a systematic methodology based on evidence.</p>
    </Tab>
  </Tabs>
);

const WithIconsTemplate = (args: TabsProps) => (
  <Tabs
    aria-label="Tabs example"
    {...args}
    classNames={{
      tab: "text-lg",
    }}
  >
    <Tab key="align-left" title={<AlignLeftBoldIcon />} titleValue="Align left" />
    <Tab key="align-vertically" title={<AlignVerticallyBoldIcon />} titleValue="Align vertically" />
    <Tab key="align-right" title={<AlignRightBoldIcon />} titleValue="Align right" />
    <Tab key="align-top" title={<AlignTopBoldIcon />} titleValue="Align top" />
    <Tab
      key="align-horizontally"
      title={<AlignHorizontallyBoldIcon />}
      titleValue="Align horizontally"
    />
    <Tab key="align-bottom" title={<AlignBottomBoldIcon />} titleValue="Align bottom" />
  </Tabs>
);

const ControlledTemplate = (args: TabsProps) => {
  const [selected, setSelected] = React.useState<React.Key>("world");

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        aria-label="Tabs example"
        {...args}
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="world" title="World">
          <p>The world is the totality of entities, the whole of reality, or everything that exists. The nature of the world has been conceptualized differently in different fields.</p>
        </Tab>
        <Tab key="ny" title="N.Y">
          <p>NY is an abbreviation for New York, either the US state of New York or New York City. New York is a state in the northeastern United States and one of the original 13 colonies. Its capital is Albany and its largest city is New York City, which is also the most populated city in the country.</p>
        </Tab>
        <Tab key="business" title="Business">
          <p>Business is the practice of making one's living or making money by producing or buying and selling products. It is also "any activity or enterprise entered into for profit." A business entity is not necessarily separate from the owner and the creditors can hold the owner liable for debts the business has acquired.</p>
        </Tab>
        <Tab key="arts" title="Arts">
          <p>The arts are a group of activities that people create using their imagination, creativity, and skill across cultures and history. These activities can include painting, sculpture, music, literature, and theater. Art can also be a visual object or experience that is created through the expression of skill or imagination.</p>
        </Tab>
        <Tab key="science" title="Science">
          <p>Science is the pursuit and application of knowledge and understanding of the natural and social world following a systematic methodology based on evidence.</p>
        </Tab>
      </Tabs>

      <p className="text-default-500">Selected: {selected}</p>

      <div className="flex gap-2 justify-start">
        <button
          className={button({color: "secondary", variant: "flat"})}
          onClick={() => setSelected("arts")}
        >
          Select &quot;Arts&quot;
        </button>
        <button
          className={button({color: "secondary", variant: "flat"})}
          onClick={() => setSelected("science")}
        >
          Select &quot;Science&quot;
        </button>
      </div>
    </div>
  );
};

type Item = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

const DynamicTemplate = (args: TabsProps<Item>) => {
  let tabs: Item[] = [
    {
      id: "world",
      label: "World",
      content: "The world is the totality of entities, the whole of reality, or everything that exists. The nature of the world has been conceptualized differently in different fields.",
    },
    {
      id: "ny",
      label: "N.Y.",
      content: "NY is an abbreviation for New York, either the US state of New York or New York City. New York is a state in the northeastern United States and one of the original 13 colonies. Its capital is Albany and its largest city is New York City, which is also the most populated city in the country.",
    },
    {
      id: "business",
      label: "Business",
      content:
        "Business is the practice of making one's living or making money by producing or buying and selling products. It is also any activity or enterprise entered into for profit. A business entity is not necessarily separate from the owner and the creditors can hold the owner liable for debts the business has acquired.",
    },
    {
      id: "arts",
      label: "Arts",
      content:
        "The arts are a group of activities that people create using their imagination, creativity, and skill across cultures and history. These activities can include painting, sculpture, music, literature, and theater. Art can also be a visual object or experience that is created through the expression of skill or imagination.",
    },
    {
      id: "science",
      label: "Science",
      content:
        "Science is the pursuit and application of knowledge and understanding of the natural and social world following a systematic methodology based on evidence.",
    },
  ];

  return (
    <Tabs aria-label="Dynamic tabs" {...args} items={tabs}>
      {(item) => (
        <Tab key={item.id} title={item.label}>
          {item.content}
        </Tab>
      )}
    </Tabs>
  );
};

const WithFormTemplate = (args: TabsProps) => {
  const [selected, setSelected] = React.useState<React.Key>("login");

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Card className="w-full w-[340px] h-[400px]">
        <CardBody>
          <Tabs
            aria-label="Tabs form"
            {...args}
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-sm">
                  Need to create an account?&nbsp;
                  <button className={link({size: "sm"})} onClick={() => setSelected("sign-up")}>
                    Sign up
                  </button>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-sm">
                  Already have an account?&nbsp;
                  <button className={link({size: "sm"})} onClick={() => setSelected("login")}>
                    Login
                  </button>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export const Default = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
  },
};

export const Dynamic = {
  render: DynamicTemplate,

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

export const WithIcons = {
  render: WithIconsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithForm = {
  render: WithFormTemplate,

  args: {
    ...defaultProps,
    fullWidth: true,
    variant: "underlined",
  },
};

export const ManualKeyboardActivation = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    keyboardActivation: "manual",
  },
};

export const Placement = {
  render: StaticTemplate,

  args: {
    placement: "top",
  },
  argTypes: {
    placement: {
      options: ["top", "bottom", "start", "end"],
      control: {
        type: "inline-radio",
      },
    },
    isVertical: {
      type: "boolean",
    },
  },
};

export const Vertical = {
  render: StaticTemplate,

  args: {
    isVertical: true,
  },
  argTypes: {
    isVertical: {
      type: "boolean",
    },
  },
};

export const DisabledItems = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    disabledKeys: ["ny", "arts"],
  },
};

export const Disabled = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DisableAnimation = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};
