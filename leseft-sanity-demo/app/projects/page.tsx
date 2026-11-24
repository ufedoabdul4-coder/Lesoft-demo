import type { Metadata } from 'next';

import { ContentCard } from '@/components/content-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { getProjects } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function ProjectsPage() {
  const { data } = await getProjects();

  if (!data?.length) {
    return (
      <EmptyState
        title="Project content not available"
        description="Published project content will appear here when it is available."
      />
    );
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Projects" title="Projects" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <ContentCard
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              label={item.serviceCategory}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
