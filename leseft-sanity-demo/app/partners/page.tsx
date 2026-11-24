import type { Metadata } from 'next';

import { EmptyState } from '@/components/ui/empty-state';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';
import { getPartnersContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'For Partners',
};

export default async function PartnersPage() {
  const { data } = await getPartnersContent();

  if (!data) {
    return (
      <EmptyState
        title="Partner content not available"
        description="Published partner content will appear here when it is available."
      />
    );
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="For Partners" title="For Partners" />
        <p className="body-copy mt-7 max-w-3xl">{data.introduction}</p>

        {data.benefits?.length ? (
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {data.benefits.map((benefit) => (
              <li key={benefit} className="surface-card p-6 text-sm leading-7 text-navy-800/75">
                {benefit}
              </li>
            ))}
          </ul>
        ) : null}

        {data.enquiryCtaText && data.enquiryCtaLink ? (
          <div className="mt-10">
            <ButtonLink href={data.enquiryCtaLink}>{data.enquiryCtaText}</ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
