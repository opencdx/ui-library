import {
  cloneElement,
  isValidElement,
  MouseEventHandler,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

import { filterDOMProps, ReactRef, useDOMRef } from '@nextui-org/react-utils';
import { useRipple, type RippleProps } from '@nextui-org/ripple';
import { dataAttr } from '@nextui-org/shared-utils';
import { SpinnerProps } from '@nextui-org/spinner';
import {
  useProviderContext,
  type HTMLNextUIProps,
  type PropGetter,
} from '@nextui-org/system';
import { button, type ButtonVariantProps } from '@nextui-org/theme';
import {
  useAriaButton,
  type AriaButtonProps,
} from '@nextui-org/use-aria-button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { chain, mergeProps } from '@react-aria/utils';
import type { PressEvent } from '@react-types/shared';

interface Props extends HTMLNextUIProps<'button'> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * The button start content.
   */
  startContent?: ReactNode;
  /**
   * The button end content.
   */
  endContent?: ReactNode;
  /**
   * Spinner to display when loading.
   * @see https://nextui.org/components/spinner
   */
  spinner?: ReactNode;
  /**
   * The spinner placement.
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end';
  /**
   * Whether the button should display a loading spinner.
   * @default false
   */
  isLoading?: boolean;
  /**
   * The native button click event handler.
   * use `onPress` instead.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type UseButtonProps = Props &
  Omit<AriaButtonProps, keyof ButtonVariantProps> &
  Omit<ButtonVariantProps, 'isInGroup'>;

export function useButton(props: UseButtonProps) {
  const globalContext = useProviderContext();

  const {
    ref,
    as,
    children,
    startContent: startContentProp,
    endContent: endContentProp,
    autoFocus,
    className,
    spinner,
    isLoading = false,
    disableRipple: disableRippleProp = false,
    disableAnimation,
    size = 'md',
    color,
    variant,
    radius,
    fullWidth,
    isDisabled: isDisabledProp,
    isIconOnly,
    spinnerPlacement = 'start',
    onPress,
    onClick,
    ...otherProps
  } = props;

  const Component = as || 'button';
  const shouldFilterDOMProps = typeof Component === 'string';

  const domRef = useDOMRef(ref);

  const disableRipple =
    (disableRippleProp || globalContext?.disableRipple) ?? disableAnimation;

  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus,
  });

  const isDisabled = isDisabledProp || isLoading;

  const styles = useMemo(
    () =>
      button({
        size,
        color,
        variant,
        radius,
        fullWidth,
        isDisabled,
        disableAnimation,
        isIconOnly,
        className,
      }),
    [
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isIconOnly,
      disableAnimation,
      className,
    ],
  );

  const {
    onPress: onRippleClickHandler,
    onClear: onClearRipple,
    ripples,
  } = useRipple();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disableRipple || isDisabled || disableAnimation) return;
      domRef.current && onRippleClickHandler((e as unknown) as PressEvent);
    },
    [disableRipple, isDisabled, disableAnimation, domRef, onRippleClickHandler],
  );

  const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(
    {
      elementType: as,
      isDisabled,
      onPress,
      onClick: chain(onClick, handleClick),
      ...otherProps,
    } as AriaButtonProps,
    domRef,
  );

  const { isHovered, hoverProps } = useHover({ isDisabled });

  const getButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      'data-disabled': dataAttr(isDisabled),
      'data-focus': dataAttr(isFocused),
      'data-pressed': dataAttr(isPressed),
      'data-focus-visible': dataAttr(isFocusVisible),
      'data-hover': dataAttr(isHovered),
      'data-loading': dataAttr(isLoading),
      ...mergeProps(
        ariaButtonProps,
        focusProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        filterDOMProps(props),
      ),
    }),
    [
      isLoading,
      isDisabled,
      isFocused,
      isPressed,
      shouldFilterDOMProps,
      isFocusVisible,
      isHovered,
      ariaButtonProps,
      focusProps,
      hoverProps,
      otherProps,
    ],
  );

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
        // @ts-ignore
        //'aria-hidden': true,
        focusable: false,
        tabIndex: -1,
      })
      : null;

  const startContent = getIconClone(startContentProp);
  const endContent = getIconClone(endContentProp);

  const spinnerSize = useMemo(() => {
    const buttonSpinnerSizeMap: Record<string, SpinnerProps['size']> = {
      sm: 'sm',
      md: 'sm',
      lg: 'md',
    };

    return buttonSpinnerSizeMap[size];
  }, [size]);

  const getRippleProps = useCallback<() => RippleProps>(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple],
  );

  return {
    Component,
    children,
    domRef,
    spinner,
    styles,
    startContent,
    endContent,
    isLoading,
    spinnerPlacement,
    spinnerSize,
    disableRipple,
    getButtonProps,
    getRippleProps,
    isIconOnly,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
