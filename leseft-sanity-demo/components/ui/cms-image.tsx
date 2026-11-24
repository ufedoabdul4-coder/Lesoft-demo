import Image from 'next/image';

import { cn } from '@/lib/cn';
import type { MediaImage } from '@/lib/types';

type CmsImageProps = {
  image: MediaImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function CmsImage({
  image,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px',
  priority = false,
}: CmsImageProps) {
  return (
    <div className={cn('relative overflow-hidden bg-navy-900', className)}>
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
      />
    </div>
  );
}
