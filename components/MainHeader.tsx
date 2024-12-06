import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { SearchCheck as IconSearch } from 'lucide-react';
import OmniSearch from '@/components/OmniSearch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Grid';
import { showOmnisearch } from '@/lib/flags';

export function Brand ({ name }: { name: string | null | undefined }) {
  return (
    <h1 className="uppercase text-balance font-extrabold text-xl leading-none tracking-tighter text-center md:text-left md:flex md:items-center md:mr-4 lg:mr-8 mb-4 md:mb-0">
      <Link href="/">{name || 'nobrand'}</Link>
    </h1>
  );
}

type MainHeaderProps = {
  className?: string;
  title: string | null | undefined;
  description: any;
  links: Array<{ label: string, link: string }>;
  isFixed?: boolean;
  isBlurred?: boolean;
};

export default async function MainHeader (props: MainHeaderProps) {
  const {
    title = 'blog title',
    description,
    links = [],
    className,
    isFixed = false,
    isBlurred = false,
  } = props;

  const classes = cn(
    'flex flex-col items-center md:flex-row md:flex-wrap lg:justify-between',
    className,
  );

  const containerClasses = cn('w-full',{
    'backdrop-blur': isBlurred,
    'fixed top-0 left-0 z-50': isFixed,
    'border-b': !isFixed,
  });

  const shouldShowOmniSearch = await showOmnisearch();

  return (
    <Container className={containerClasses}>
      <header className={classes}>
        <div className="md:flex justify-center content-stretch items-stretch flex-wrap md:divide-x">
          <Brand name={title} />
        
          {shouldShowOmniSearch && (
            <OmniSearch className="px-4 hidden md:block">
              <Button variant="outline">
                <IconSearch className="mr-4" size={12} />
                <span className={'mr-16'}>Search for anything</span>
                <kbd className="animate-pulse font-normal">⌘K</kbd>
              </Button>
            </OmniSearch>
          )}

          {!!links && (
            <nav className="flex items-center px-4">
              <ul className="flex flex-wrap gap-4">
                {links.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {description && (
          <h2 className="text-pretty text-center lg:text-left mt-4 md:mt-0">
            <PortableText
              value={description}
            />
          </h2>
        )}
      </header>
    </Container>
  );
}