// I had to use AI to do this

import clsx from "clsx";
import Link from "next/link";
import React from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  iconStart?: React.ReactElement<{ size?: number }>;
  iconEnd?: React.ReactElement<{ size?: number }>;
  iconSize?: number;
  colorInvert?: boolean;
  children?: React.ReactNode;
};

export default function DefaultButton({
  href,
  onClick,
  type = "button",
  disabled,
  iconStart,
  iconEnd,
  iconSize = 20,
  colorInvert = false,
  children,
}: ButtonProps) {
  const className = clsx(
    "flex cursor-pointer items-center gap-3 rounded-sm border px-3 py-2 whitespace-nowrap",
    !colorInvert &&
      "text-foreground bg-background border-foreground hover:bg-background-hover",
    colorInvert &&
      "text-background bg-foreground border-background hover:bg-foreground-hover",
  );

  const content = (
    <>
      {iconStart && React.cloneElement(iconStart, { size: iconSize })}
      {children && (
        <span
          className={clsx(
            iconStart && "border-s ps-2",
            iconEnd && "border-e pe-2",
          )}
        >
          {children}
        </span>
      )}
      {iconEnd && React.cloneElement(iconEnd, { size: iconSize })}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {content}
    </button>
  );
}
