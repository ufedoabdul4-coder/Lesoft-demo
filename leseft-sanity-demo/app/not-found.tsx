import Link from 'next/link';

import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl text-navy-950">Page not found</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-navy-800/70">
        The page you requested could not be found. Please return to the homepage or explore the site navigation.
      </p>
      <Link href="/" className="mt-7 rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800">
        Return home
      </Link>
    </Container>
  );
}
