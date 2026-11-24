import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { NextStudio, metadata as studioMetadata } from 'next-sanity/studio';

import { Container } from '@/components/ui/container';
import { isSanityConfigured } from '@/lib/env';
import config from '@/sanity.config';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Sanity Studio',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return (
      <Container className="flex min-h-screen items-center justify-center py-20">
        <div className="surface-card max-w-2xl p-8 sm:p-10">
          <p className="eyebrow">Studio setup required</p>
          <h1 className="mt-4 font-display text-3xl text-navy-950">Connect a Sanity project to open the Studio.</h1>
          <p className="body-copy mt-6">
            The Studio route is ready, but no Sanity project credentials were found in this environment. Add the
            following variables to <code className="rounded bg-navy-900/5 px-1.5 py-0.5">.env.local</code>, then restart
            the development server.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-navy-800/75">
            <li><code>NEXT_PUBLIC_SANITY_PROJECT_ID</code></li>
            <li><code>NEXT_PUBLIC_SANITY_DATASET</code></li>
          </ul>
          <p className="mt-6 text-sm leading-7 text-navy-800/65">
            Authorised editors must also be added to the Sanity project before they can sign in and publish content.
          </p>
          <Link href="/" className="mt-7 inline-flex rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800">
            Return to website
          </Link>
        </div>
      </Container>
    );
  }

  return <NextStudio config={config} />;
}
