import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
      <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
      <div aria-hidden="true" className="absolute -bottom-48 right-1/4 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <Container className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
