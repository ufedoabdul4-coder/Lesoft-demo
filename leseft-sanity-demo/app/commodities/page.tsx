import type { Metadata } from 'next';

import { ContentCard } from '@/components/content-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { getCommodities } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Commodities',
};

export default async function CommoditiesPage() {
  const { data } = await getCommodities();

  if (!data?.length) {
    return (
      <EmptyState
        title="Commodity content not available"
        description="Published commodity content will appear here when it is available."
      />
    );
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Commodities" title="Commodities" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <ContentCard
              key={item.id}
              image={item.image}
              title={item.name}
              description={item.description}
              label={item.category}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
