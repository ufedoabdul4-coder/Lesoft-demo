import { Container } from '@/components/ui/container';

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Container className="flex min-h-[48vh] items-center py-20">
      <div className="surface-card w-full p-8 sm:p-12">
        <p className="eyebrow">Content not available</p>
        <h1 className="mt-4 font-display text-3xl text-navy-950 sm:text-4xl">{title}</h1>
        <p className="body-copy mt-5 max-w-2xl">{description}</p>
      </div>
    </Container>
  );
}
