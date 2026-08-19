"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  /** Strength of the magnetic pull in px. 0 disables it. */
  pull?: number;
  icon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  solid:
    "bg-[var(--accent)] text-[var(--color-ink)] hover:bg-[var(--accent-soft)] font-medium",
  outline:
    "border border-[var(--color-line)] text-[var(--color-bone)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost: "text-[var(--color-bone-dim)] hover:text-[var(--accent)]",
};

const base =
  "relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 " +
  "text-[length:var(--text-sm)] tracking-wide transition-colors duration-300 " +
  "will-change-transform select-none";

function useMagnet(pull: number) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (reduced || pull === 0 || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({
      x: (relX / (rect.width / 2)) * pull,
      y: (relY / (rect.height / 2)) * pull,
    });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  return { ref, offset, onMove, onLeave };
}

/** Internal or external link that leans toward the cursor. */
export function MagneticLink({
  href,
  children,
  className,
  variant = "solid",
  pull = 6,
  icon,
  external,
  ...rest
}: BaseProps & { href: string; external?: boolean }) {
  const { ref, offset, onMove, onLeave } = useMagnet(pull);
  const isExternal = external ?? /^https?:|^mailto:|^tel:/.test(href);

  const inner = (
    <motion.span
      className={cn(base, variantClasses[variant], className)}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
    >
      {children}
      {icon}
    </motion.span>
  );

  if (isExternal) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="inline-block"
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
      {...rest}
    >
      {inner}
    </Link>
  );
}

/** Button flavour of the same interaction. */
export function MagneticButton({
  children,
  className,
  variant = "solid",
  pull = 6,
  icon,
  type = "button",
  disabled,
  onClick,
}: BaseProps & {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const { ref, offset, onMove, onLeave } = useMagnet(disabled ? 0 : pull);
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block disabled:cursor-not-allowed disabled:opacity-50"
    >
      <motion.span
        className={cn(base, variantClasses[variant], className)}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
      >
        {children}
        {icon}
      </motion.span>
    </button>
  );
}
