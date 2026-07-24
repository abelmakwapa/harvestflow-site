import { type ReactNode } from "react";

interface ButtonProps {
  href?: string;
  variant?: "solid" | "ghost";
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function Button({ href, variant = "solid", children, type = "button", onClick }: ButtonProps) {
  const cls = `btn btn-${variant}`;
  if (href) {
    return <a className={cls} href={href}>{children}</a>;
  }
  return <button className={cls} type={type} onClick={onClick}>{children}</button>;
}
