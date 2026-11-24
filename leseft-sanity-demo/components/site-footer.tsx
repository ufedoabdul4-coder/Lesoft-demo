import Link from 'next/link';

import { Container } from '@/components/ui/container';
import type { ContactContent } from '@/lib/types';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/commodities', label: 'Commodities' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/projects', label: 'Projects' },
  { href: '/partners', label: 'For Partners' },
  { href: '/contact', label: 'Contact' },
];

export function SiteFooter({ contact }: { contact: ContactContent | null }) {
  const email = contact?.email?.trim();
  const phone = contact?.phone?.trim();
  const address = contact?.address?.trim();

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold tracking-[0.18em] text-white">LESEFT</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">Contact</p>
          {email || phone || address ? (
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                    {email}
                  </a>
                </li>
              ) : null}
              {phone ? (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="transition-colors hover:text-white">
                    {phone}
                  </a>
                </li>
              ) : null}
              {address ? <li className="leading-6">{address}</li> : null}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-7 text-white/45">No published contact information.</p>
          )}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 text-xs text-white/45">
          <p>© {new Date().getFullYear()} LESEFT. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
