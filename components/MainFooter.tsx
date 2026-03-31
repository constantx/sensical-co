import type { PortableTextBlock } from 'next-sanity';
import type { SettingsQueryResult } from '@/sanity.types';
import PortableText from '@/components/PortableText';
import { Container } from '@/components/Grid';

function Footer (props: {
  settings: SettingsQueryResult;
}): React.ReactNode {
  // code goes here
  const { settings } = props;
  const footer = settings?.footer || [];

  return (
    <footer>
      <Container className="border-t">
        {footer.length > 0 ? (
          <PortableText
            className="prose-sm text-pretty bottom-0 w-full max-w-none bg-background text-foreground py-12 text-center md:py-20"
            value={footer as PortableTextBlock[]}
          />
        ) : (
          <div className="flex flex-col items-center py-28 lg:flex-row">
            <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
              Built with Next.js.
            </h3>
            <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
              <a
                href="https://nextjs.org/docs"
                className="mx-3 mb-6 border border-black bg-black py-3 px-12 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8"
              >
                Read Documentation
              </a>
              <a
                href="https://github.com/vercel/next.js/tree/canary/examples/cms-sanity"
                className="mx-3 font-bold hover:underline"
              >
                View on GitHub
              </a>
            </div>
          </div>
        )}
      </Container>
    </footer>
  );
}

export default Footer;