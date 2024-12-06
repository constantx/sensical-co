import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

/**
 * 
 * Here you can see the different schema types that are available:
 * https://www.sanity.io/docs/schema-types
 * 
 */

export default defineType({
  name: 'testimony',
  title: 'Testimony',
  type: 'document',
  icon: () => '🗣️',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'array',
      of: [{
        type: 'block',
      }],
    }),
    defineField({
      name: 'author',
      title: 'Author (optional)',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Author Photo (optional)',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true,
          metadata: ['lqip', 'blurhash', 'palette'],
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            description: 'Important for SEO and accessiblity.',
            validation: (rule) => rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return '(Required) Image is not visible without alt text.';
              }
              return true;
            }),
          },
        ],
        // validation: (rule) => rule.required(),
      }],
    }),
    defineField({
      type: 'datetime',
      name: 'publishedAt',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      type: '_type',
      quote: 'quote',
      author: 'author',
      date: 'publishedAt',
      media: 'coverImage',
    },
    prepare ({
      type, quote, author = 'n/a', date, media,
    }) {
      const subtitles = [
        author,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return {
        title: `[${type.toUpperCase()}]: ${quote.map((block:any) => block.children.map((child:any) => child.text).join('')).join(' ')}`,
        subtitles: subtitles.join(' | '),
        media,
      };
    },
  },
});
