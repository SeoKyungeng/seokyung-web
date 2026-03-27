"use client";

import { type ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { usePageTransition } from "@/providers/TransitionProvider";

type TransitionLinkProps = ComponentProps<typeof Link>;

export function TransitionLink({
  href,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { navigateWithTransition } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e as never);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const target = typeof href === "string" ? href : (href.pathname ?? "/");
    if (target === pathname) return;

    e.preventDefault();
    navigateWithTransition(target);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
