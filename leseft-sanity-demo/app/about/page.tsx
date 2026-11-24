import type { Metadata } from 'next';

import { EmptyState } from '@/components/ui/empty-state';
import { Container } from '@/components/ui/container';
import { CmsImage } from '@/components/ui/cms-image';
import { SectionHeading } from '@/components/ui/section-heading';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About',
};

export default async function AboutPage() {
  const { data } = await getAboutContent();

  if (!data) {
    return (
      <EmptyState
        title="About content not available"
        description="Published about content will appear here when it is available."
      />
    );
  }

  return (
    <>
      <section className="bg-white">
        <Container className="grid gap-14 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-28">
          <div>
            <SectionHeading eyebrow="About" title="About" />
            <p className="body-copy mt-7 max-w-2xl">{data.introduction}</p>
          </div>
          <CmsImage
            image={data.image}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="aspect-[5/4] w-full rounded-[2rem] border border-navy-900/10 shadow-lift"
          />
        </Container>
      </section>

      <section className="border-y border-navy-900/10 bg-cream py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="surface-card p-8 sm:p-10">
            <p className="eyebrow">Mission</p>
            <p className="mt-5 font-display text-2xl leading-snug text-navy-950 sm:text-3xl">{data.mission}</p>
          </article>
          <article className="surface-card p-8 sm:p-10">
            <p className="eyebrow">Vision</p>
            <p className="mt-5 font-display text-2xl leading-snug text-navy-950 sm:text-3xl">{data.vision}</p>
          </article>
        </Container>
      </section>
    </>
  );
}
