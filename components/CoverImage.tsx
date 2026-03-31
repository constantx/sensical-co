import { Image } from 'next-sanity/image';
import { urlForImage } from '@/sanity/lib/utils';
import { blurHashToDataURL } from '@/lib/blurHashDataURL';
import { cn } from '@/lib/utils';

interface CoverImageProps {
  image: any;
  priority?: boolean;
  placeholder?: any;
  blurHash?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function CoverImage (props: CoverImageProps) {
  const {
    image: source,
    width,
    height,
    priority, 
    placeholder = 'empty',
    blurHash,
    className,
  } = props;

  const blurDataURL = placeholder == 'blur' && blurHash
    ? blurHashToDataURL(blurHash)
    : undefined;
  
  const image = source?.asset?._ref ? (
    <Image
      className="h-auto w-full"
      width={width || 2000}
      height={height || 1000}
      alt={source?.alt || ''}
      src={urlForImage(source)?.height(1000).width(2000).url() as string}
      sizes="100vw"
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: '50%' }} />
  );

  return (
    <div className={cn('transition-shadow duration-200 sm:mx-0', className)}>
      {image}
    </div>
  );
}
