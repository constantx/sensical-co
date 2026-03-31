import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function PageTitleHeading ({
  children, className, 
}: Props) {
  return (
    <h1 className={cn('my-8 sm:my-16 text-2xl sm:text-4xl md:text-6xl lg:text-8xl 2xl:text-8xl tracking-tighter leading-tight md:leading-none text-pretty font-bold', className)}>
      {children}
    </h1>
  );
}

export function PageMoreHeading ({
  children, className, 
}: Props) {
  return (
    <h2 className={cn('my-8 font-bold leading-tight md:leading-none tracking-tighter text-2xl md:text-4xl', className)}>
      {children}
    </h2>
  );
}