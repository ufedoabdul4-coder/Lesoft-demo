import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <div className="animate-pulse" aria-label="Loading page content">
      <div className="bg-navy-950 py-24">
        <Container className="space-y-5">
          <div className="h-3 w-32 rounded bg-white/20" />
          <div className="h-12 w-2/3 rounded bg-white/10" />
          <div className="h-4 w-1/2 rounded bg-white/10" />
        </Container>
      </div>
      <Container className="grid gap-6 py-20 md:grid-cols-3">
        <div className="h-64 rounded-2xl bg-navy-900/10" />
        <div className="h-64 rounded-2xl bg-navy-900/10" />
        <div className="h-64 rounded-2xl bg-navy-900/10" />
      </Container>
    </div>
  );
}
