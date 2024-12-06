import Image from 'next/image';
import { ArrowRight as IconArrowRight } from 'lucide-react';
import { PostQueryResult } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from '@/components/ui/card';

export default function PostCard (post: Pick<
  Exclude<PostQueryResult, null>,
  'title' | 'coverImage' | 'publishedAt' | 'excerpt' | 'authors' | 'slug'
>) {
  const {
    title,
    coverImage,
    authors,
    excerpt,
  } = post;

  return (
    <Card className="h-full shadow-sm hover:shadow-2xl flex flex-col justify-between">
      <Image
        alt={`${title} cover image`}
        className="rounded-tl-sm rounded-tr-sm object-cover aspect-video-16-9"
        width="512"
        height="288"
        src={urlForImage(coverImage)?.width(256).height(144).url() as string}
      />
      <CardHeader>
        <CardTitle className="flex flex-col gap-4">
          {title}
        </CardTitle>
        <CardDescription>
          {authors?.map((author) => author.title).join(', ')}
        </CardDescription>
      </CardHeader>
      <CardContent>{excerpt}</CardContent>
      <CardFooter className="w-full justify-self-end bg-white">
        <span className="hover:text-destructive-foreground">
          <IconArrowRight size={16} />
        </span>
      </CardFooter>
    </Card>
  );
}