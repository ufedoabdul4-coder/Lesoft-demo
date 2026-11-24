'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/commodities', label: 'Commodities' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/projects', label: 'Projects' },
  { href: '/partners', label: 'For Partners' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/10 bg-white/95 backdrop-blur">
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="LESEFT home">
          <span className="text-sm font-bold tracking-[0.18em] text-navy-950">LESEFT</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-navy-950 text-white'
                  : 'text-navy-900/75 hover:bg-navy-900/5 hover:text-navy-950',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-gold-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-950 transition-colors hover:bg-gold-400 sm:inline-flex"
          >
            Enquire
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-900/15 text-navy-950 xl:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-navy-900/10 bg-white xl:hidden">
          <Container className="grid gap-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-4 py-3 text-sm font-medium',
                  isActive(item.href) ? 'bg-navy-950 text-white' : 'text-navy-900/80 hover:bg-navy-900/5',
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
