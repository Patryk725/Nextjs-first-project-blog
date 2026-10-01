import clsx from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconStart?: React.ReactElement<{ size?: number }>;
  iconEnd?: React.ReactElement<{ size?: number }>;
  iconSize?: 20;
  colorInvert?: boolean;
  children?: React.ReactNode;
};

export default function DefaultButton({
  iconStart,
  iconEnd,
  iconSize = 20,
  colorInvert = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex cursor-pointer items-center gap-3 rounded-sm border px-3 py-2 whitespace-nowrap",
        !colorInvert &&
          "text-foreground bg-background border-foreground hover:bg-background-hover",
        colorInvert &&
          "text-background bg-foreground border-background hover:bg-foreground-hover",
      )}
    >
      {iconStart && React.cloneElement(iconStart, { size: iconSize })}
      {children && (
        <div
          className={clsx(
            iconStart && "border-s ps-2",
            iconEnd && "border-e pe-2",
          )}
        >
          {children}
        </div>
      )}
      {iconEnd && React.cloneElement(iconEnd, { size: iconSize })}
    </button>
  );
}
