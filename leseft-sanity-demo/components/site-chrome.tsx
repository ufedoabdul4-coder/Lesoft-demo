'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import type { ContactContent } from '@/lib/types';

type SiteChromeProps = {
  children: ReactNode;
  contact: ContactContent | null;
};

export function SiteChrome({ children, contact }: SiteChromeProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-950"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter contact={contact} />
    </>
  );
}
