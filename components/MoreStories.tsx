import Link from 'next/link';

import Avatar from './Avatar';
import CoverImage from './CoverImage';
import DateComponent from './Date';

import type { MoreStoriesQueryResult } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/fetch';
import { moreStoriesQuery } from '@/sanity/lib/queries';
import { Container } from '@/components/Grid';

export default async function MoreStories (params: {
  skip: string;
  limit: number;
}) {
  const data = await sanityFetch<MoreStoriesQueryResult>({
    query: moreStoriesQuery,
    params,
  });

  return (
    <Container className="mb-32 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center">
      {data?.map((post) => {
        const {
          _id, title, slug, coverImage, excerpt, authors, publishedAt,
        } = post;
        return (
          <article key={_id} className="mb-8 pb-8 border-b last:border-0 md:border-b-0">
            <Link href={`/stories/${slug}`} className="group mb-5 block">
              <CoverImage image={coverImage} priority={false} />
            </Link>
            <h3 className=" mb-4 text-balance tracking-tight leading-tight text-xl xl:text-3xl lg:font-bold">
              <Link href={`/stories/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
            {publishedAt && (
              <div className="mb-4 text-sm font-mono">
                <DateComponent dateString={publishedAt} />
              </div>
            )}
            {excerpt && (
              <p className="text-pretty mb-4">
                {excerpt}
              </p>
            )}
            {authors?.length && (
              <Avatar
                className="font-mono"
                title={authors[0].title}
                picture={authors[0].picture} />
            )}
          </article>
        );
      })}
    </Container>
  );
}
