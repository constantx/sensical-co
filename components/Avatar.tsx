import { Image } from 'next-sanity/image';

import type { Author } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/utils';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  picture: Exclude<Author['picture'], undefined> | null;
  className?: string;
}

export default function Avatar ({
  title, picture, className = '',
}: Props) {
  const classes = cn('flex items-center', className);

  return (
    <div className={classes}>
      {picture?.asset?._ref && (
        <div className="mr-4 h-12 w-12">
          <Image
            alt={picture?.alt || ''}
            className="h-full rounded-full object-cover"
            height={48}
            width={48}
            src={
              urlForImage(picture)
                ?.height(96)
                .width(96)
                .fit('crop')
                .url() as string
            }
          />
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        By {title}
      </div>
    </div>
  );
}
