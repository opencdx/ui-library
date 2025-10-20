import {forwardRef} from "@nextui-org/system";
import Button from "../button/button";
import User from "./user";
import {UserProps} from "./user";
import {ButtonProps} from "../button/button";

export interface UserButtonProps {
  /**
   * Props to pass to the User component
   */
  userProps: UserProps;
  /**
   * Props to pass to the Button component (excluding children)
   */
  buttonProps?: Omit<ButtonProps, 'children'>;
  /**
   * Content to display at the end of the button (e.g., dropdown arrow icon)
   */
  endContent?: React.ReactNode;
  /**
   * Additional class names for the button
   */
  className?: string;
}

/**
 * UserButton - A composite component that safely renders a User component inside a Button.
 * 
 * This component solves compatibility issues when using User as a direct child of Button
 * in contexts where parent components use React.Children.map (like NextUI Navbar).
 * 
 * @example
 * ```tsx
 * <UserButton
 *   userProps={{ name: "John Doe", description: "Software Engineer" }}
 *   buttonProps={{ variant: "light", color: "primary" }}
 *   endContent={<ChevronDownIcon />}
 * />
 * ```
 */
const UserButton = forwardRef<"button", UserButtonProps>((props, ref) => {
  const {userProps, buttonProps, endContent, className} = props;
  
  return (
    <Button
      ref={ref}
      {...buttonProps}
      className={`flex items-center gap-2 ${className || ''} ${buttonProps?.className || ''}`}
      endContent={endContent}
    >
      <div className="flex items-center">
        <User {...userProps} />
      </div>
    </Button>
  );
});

UserButton.displayName = "NextUI.UserButton";

export default UserButton;

