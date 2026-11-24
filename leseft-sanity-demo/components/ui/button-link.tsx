import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
};

const variantStyles = {
  primary: 'bg-gold-400 text-navy-950 hover:bg-gold-300',
  secondary: 'border border-navy-900/15 bg-white text-navy-900 hover:border-gold-500',
  light: 'border border-white/25 bg-white/10 text-white hover:bg-white/20',
};

export function ButtonLink({ href, children, variant = 'primary', className }: ButtonLinkProps) {
  const isExternal = href.startsWith('http');

  return (
    <Link
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200',
        variantStyles[variant],
        className,
      )}
    >
      {children}
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      >
        <path
          d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </Link>
  );
}
