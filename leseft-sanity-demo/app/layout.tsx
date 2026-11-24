import type { Metadata, Viewport } from 'next';

import './globals.css';
import { SiteChrome } from '@/components/site-chrome';
import { getContactContent } from '@/lib/content';
import { siteUrl } from '@/lib/env';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LESEFT',
    template: '%s | LESEFT',
  },
  applicationName: 'LESEFT',
  openGraph: {
    title: 'LESEFT',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A1D33',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const contact = await getContactContent();

  return (
    <html lang="en">
      <body>
        <SiteChrome contact={contact.data}>{children}</SiteChrome>
      </body>
    </html>
  );
}
