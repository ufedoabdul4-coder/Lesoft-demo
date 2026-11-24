'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 py-20">
      <div className="max-w-lg rounded-2xl border border-navy-900/10 bg-white p-8 text-center shadow-lift">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 font-display text-3xl text-navy-950">This page could not be displayed.</h1>
        <p className="mt-4 text-sm leading-7 text-navy-800/70">
          The information may be temporarily unavailable. Please try again or return to the homepage.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800"
          >
            Try again
          </button>
          <Link href="/" className="rounded-full border border-navy-900/15 px-6 py-3 text-sm font-semibold text-navy-950">
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
