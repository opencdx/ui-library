import type {Meta, StoryObj} from "@storybook/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "../dropdown";
import UserButton from "../user/user-button";

const meta: Meta<typeof UserButton> = {
  title: "Components/UserButton",
  component: UserButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    userProps: {
      description: "Props to pass to the User component",
      control: "object",
    },
    buttonProps: {
      description: "Props to pass to the Button component",
      control: "object",
    },
    endContent: {
      description: "Content to display at the end of the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserButton>;

export const Default: Story = {
  args: {
    userProps: {
      name: "John Doe",
      description: "Software Engineer",
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    userProps: {
      name: "Jane Smith",
    },
  },
};

export const CustomButtonStyle: Story = {
  args: {
    userProps: {
      name: "Alice Johnson",
      description: "Product Manager",
    },
    buttonProps: {
      variant: "bordered",
      color: "primary",
    },
  },
};

export const InDropdown: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <UserButton
          userProps={{name: "John Doe", description: "Admin"}}
          buttonProps={{variant: "light"}}
          endContent={<span>▼</span>}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="logout" className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: "UserButton works seamlessly inside Dropdown components, solving the React.Children.map compatibility issue.",
      },
    },
  },
};

export const InNavbarContext: Story = {
  render: () => (
    <div className="w-full">
      <div className="flex justify-end p-4 border rounded">
        <Dropdown>
          <DropdownTrigger>
            <UserButton
              userProps={{name: "John Doe"}}
              buttonProps={{variant: "light", disableAnimation: true}}
              className="p-0"
              endContent={<span className="ml-2">▼</span>}
            />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="profile">View Profile</DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="logout">Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "This pattern is safe for use in Navbar or any component that uses React.Children.map internally. Unlike nesting User directly in Button, UserButton properly encapsulates the composition.",
      },
    },
  },
};

