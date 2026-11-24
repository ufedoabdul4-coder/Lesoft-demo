import type { Metadata } from 'next';

import { ContentCard } from '@/components/content-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button-link';
import { CmsImage } from '@/components/ui/cms-image';
import { SectionHeading } from '@/components/ui/section-heading';
import { getCommodities, getEquipment, getHomepageContent, getProjects } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const [home, commodities, equipment, projects] = await Promise.all([
    getHomepageContent(),
    getCommodities(),
    getEquipment(),
    getProjects(),
  ]);

  return (
    <>
      {home.data ? (
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(215,183,110,0.16),transparent_38%)]" />
          <Container className="relative grid gap-14 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">{home.data.subtitle}</p>
              <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl">
                {home.data.heading}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{home.data.description}</p>
              <div className="mt-9">
                <ButtonLink href={home.data.ctaLink}>{home.data.ctaText}</ButtonLink>
              </div>
            </div>
            <CmsImage
              image={home.data.heroImage}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/5] w-full rounded-[2rem] border border-white/10 shadow-lift lg:aspect-[5/6]"
            />
          </Container>
        </section>
      ) : (
        <EmptyState
          title="Homepage content not available"
          description="Published homepage content will appear here when it is available."
        />
      )}

      {commodities.data?.length ? (
        <section className="py-24">
          <Container>
            <SectionHeading eyebrow="Commodities" title="Commodities" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {commodities.data.map((item) => (
                <ContentCard key={item.id} image={item.image} title={item.name} description={item.description} label={item.category} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {equipment.data?.length ? (
        <section className="bg-white py-24">
          <Container>
            <SectionHeading eyebrow="Equipment" title="Equipment" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {equipment.data.map((item) => (
                <ContentCard key={item.id} image={item.image} title={item.name} description={item.description} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {projects.data?.length ? (
        <section className="py-24">
          <Container>
            <SectionHeading eyebrow="Projects" title="Projects" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.data.map((item) => (
                <ContentCard key={item.id} image={item.image} title={item.title} description={item.description} label={item.serviceCategory} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
