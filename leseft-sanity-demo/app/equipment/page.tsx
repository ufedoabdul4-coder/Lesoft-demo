import type { Metadata } from 'next';

import { ContentCard } from '@/components/content-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { getEquipment } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Equipment',
};

export default async function EquipmentPage() {
  const { data } = await getEquipment();

  if (!data?.length) {
    return (
      <EmptyState
        title="Equipment content not available"
        description="Published equipment content will appear here when it is available."
      />
    );
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Equipment" title="Equipment" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <ContentCard key={item.id} image={item.image} title={item.name} description={item.description} />
          ))}
        </div>
      </Container>
    </section>
  );
}
