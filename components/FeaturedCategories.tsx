/* eslint-disable @stylistic/max-len */
import { FeaturedCategoriesQueryResult } from '@/sanity.types';
import Link from 'next/link';
import { ArrowRight as IconArrowRight } from 'lucide-react';
import Image from 'next/image';

import { urlForImage } from '@/sanity/lib/utils';
import { sanityFetch } from '@/sanity/lib/fetch';
import { featuredCategoriesQuery } from '@/sanity/lib/queries';
import { cn } from '@/lib/utils';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';


export async function FeaturedCategories (props: {
  className?: string;
}) {
  const { className = '' } = props;
  const [
    categories,
  ] = await Promise.all([
    sanityFetch<FeaturedCategoriesQueryResult>({ query: featuredCategoriesQuery }),
  ]);

  if (!categories?.length) return null;
    
  return (
    <div className={cn('my-4 w-full flex flex-col justify-center items-center', className)}>
      <ul className="w-full mt-16 mb-16 flex flex-wrap -mx-2 content-stretch justify-center">
        {categories.map((category) => (
          <li key={category._id} className="w-1/2 lg:w-1/3 max-w-sm px-2 mb-4">
            <Link href={`/categories/${category.slug}`}>
              <Card className="h-full shadow-sm hover:shadow-2xl flex flex-col justify-between">
                {category.coverImage && category.coverImage?.asset?._ref && (
                  <Image
                    alt={`${category.coverImage.alt}`}
                    className="rounded-tl-sm rounded-tr-sm object-cover aspect-video-16-9"
                    width="512"
                    height="288"
                    src={urlForImage(category.coverImage)?.width(256).height(144).url() as string}
                  />
                )}
                <CardHeader>
                  <CardTitle className="flex flex-col gap-4">
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    {category.excerpt}
                  </CardDescription>
                </CardHeader>
                {/* <CardContent>
                      {category.excerpt}
                    </CardContent> */}
                <CardFooter className="w-full justify-self-end flex flex-row-reverse">
                  <span className="hover:text-destructive-foreground">
                    <IconArrowRight size={16} />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}