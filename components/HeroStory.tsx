import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/fetch';
import { HeroStoryQueryResult } from '@/sanity.types';
import { heroStoryQuery } from '@/sanity/lib/queries';

import { Container } from '@/components/Grid';
import Avatar from '@/components/Avatar';
import CoverImage from '@/components/CoverImage';
import DateComponent from '@/components/Date';
import { cn } from '@/lib/utils';

type Props = {
  post: HeroStoryQueryResult;
  className?: string;
  isCenter?: boolean;
  isFlush?: boolean;
};

export async function ContainerHeroPost (props: Props) {
  const {
    className = '',
    isCenter = false,
    isFlush = true,
    post,
  } = props;
  
  const [
    heroPost, 
  ] = await Promise.all([
    post
      ? Promise.resolve(post)
      : sanityFetch<HeroStoryQueryResult>({ query: heroStoryQuery }),
  ]);

  if (!heroPost?._id) return null;
  
  const {
    // _id,
    title,
    coverImage,
    publishedAt,
    excerpt,
    slug,
    authors,
  } = heroPost;
  
  const classes = cn('', className);

  return (
    <article className={classes}>
      <Container
        isFlush={isFlush}
        isCenter={isCenter}
        className="overflow-hidden max-h-[60vh]"
      >
        <Link
          className="block group"
          href={`/stories/${slug}`}
        >
          <CoverImage
            image={coverImage}
            priority
            placeholder="blur"
            blurHash={coverImage?.metadata?.blurHash}
          />
          
        </Link>
      </Container>
      <Container
        isCenter={isCenter || !isFlush}
        className="py-16 md:grid md:grid-cols-12"
      >
        <div className="col-span-6 lg:col-span-7">
          <h2 className="text-pretty mb-4 font-bold leading-tight tracking-tight text-xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            <Link
              href={`/stories/${slug}`}
              className="hover:underline"
            >
              {title}
            </Link>
          </h2>
          {publishedAt && (
            <div className="mb-4 text-base md:mb-0 text-muted-foreground">
              <DateComponent dateString={publishedAt} />
            </div>
          )}
        </div>
        <div className="col-span-6 lg:col-span-5">
          {excerpt && (
            <p className="mb-4 text-pretty max-w-2xl 2xl:max-w-3xl xl:text-lg 2xl:text-xl">
              {excerpt}
            </p>
          )}
          {authors?.length && (
            <Avatar
              title={authors[0].title}
              picture={authors[0].picture}
            />
          )}
        </div>
      </Container>
    </article>
  );
}