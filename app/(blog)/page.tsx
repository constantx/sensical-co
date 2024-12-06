import { notFound } from 'next/navigation';
import { pageBySlugQuery, settingsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/fetch';
import PortableText from '@/components/PortableText';
import type {
  PageBySlugQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';
import { Container } from '@/components/Grid';
import { PortableTextBlock } from 'sanity';

const DEFAULT_HOMEPAGE_SLUG = 'home';

export default async function Page () {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });
  const {
    defaultHomepageSlug = DEFAULT_HOMEPAGE_SLUG,
  } = settings || {};
  const page = await sanityFetch<PageBySlugQueryResult>({
    query: pageBySlugQuery,
    params: {
      slug: defaultHomepageSlug.trim().toLowerCase(),
    },
  });

  if (!page?._id) {
    return notFound();
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Container>
        {page.pageHeading && (
          <PortableText
            value={page.pageHeading as PortableTextBlock[]}
            className="text-pretty text-lg md:text-2xl lg:text-3xl"
          />
        )}
        {page.pageContent && (
          <PortableText
            value={page.pageContent as PortableTextBlock[]}
            className="text-pretty"
          />
        )}
      </Container>
    </div>
  );
}

export const revalidate = 60;