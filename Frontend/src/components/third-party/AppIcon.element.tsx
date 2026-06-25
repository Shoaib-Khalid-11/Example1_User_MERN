import { Icon, type IconProps } from "@iconify/react";
// import type { CSSProperties } from "react";

interface AppIconProps extends IconProps {
  // icon: string | IconifyIcon;
  // width?: number | string;
  // height?: number | string;
  // color?: string;
  // className?: string;
  // style?: CSSProperties;
  // inline?: boolean;
  ariaLabel?: string;
  size?: number | string;
}

export const AppIcon_Element = ({
  icon,
  size,
  width = size ? size : 24,
  height = size ? size : 24,
  color = "currentColor",
  className,
  style,
  inline = true,
  ariaLabel,
  ...props
}: AppIconProps) => {
  return (
    <Icon
      {...props}
      icon={icon}
      width={width}
      height={height}
      color={color}
      className={className}
      style={{ display: inline ? "inline-block" : "block", ...style }}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    />
  );
};

export default AppIcon_Element;
