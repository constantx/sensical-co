/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from 'next-sanity';

export default function CustomPortableText ({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-pretty mb-4 md:mb-6 lg:mb-8 md:text-lg lg:text-xl md:leading-relaxed">{children}</p>
      ),
      h1: ({ children }) => (
        <h1 className="text-pretty leading-relaxed text-lg md:text-5xl lg:text-9xl">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-pretty leading-relaxed text-lg md:text-4xl lg:text-6xl">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-pretty leading-relaxed text-lg md:text-3xl lg:text-4xl">{children}</h3>
      ),
    },
    marks: {
      link: ({
        children, value, 
      }) => (
        <a href={value?.href} rel="noreferrer noopener">
          {children}
        </a>
      ), 
    },
  };

  return (
    <div className={['prose', className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  );
}
