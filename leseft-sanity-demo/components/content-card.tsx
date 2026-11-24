import { CmsImage } from '@/components/ui/cms-image';
import type { MediaImage } from '@/lib/types';

type ContentCardProps = {
  image: MediaImage;
  title: string;
  description: string;
  label?: string;
};

export function ContentCard({ image, title, description, label }: ContentCardProps) {
  return (
    <article className="surface-card group overflow-hidden">
      <CmsImage image={image} className="aspect-[4/3] w-full" />
      <div className="p-6 sm:p-7">
        {label ? (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-600">{label}</p>
        ) : null}
        <h3 className="font-display text-xl text-navy-950">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-navy-800/70">{description}</p>
      </div>
    </article>
  );
}
