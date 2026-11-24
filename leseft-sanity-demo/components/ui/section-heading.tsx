import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start',
        action ? 'lg:flex-row lg:items-end lg:justify-between' : '',
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto' : '')}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2
          className={cn(
            'font-display text-3xl leading-tight tracking-tight sm:text-4xl',
            tone === 'light' ? 'text-white' : 'text-navy-950',
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className={cn('mt-4 text-base leading-7 sm:text-lg', tone === 'light' ? 'text-white/70' : 'text-navy-800/70')}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
