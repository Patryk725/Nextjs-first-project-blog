type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  children: React.ReactNode;
};

export default function DefaultButton({
  iconStart,
  iconEnd,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className="border-foreground border px-3 py-2 cursor-pointer rounded-sm hover:bg-background-hover"
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}
