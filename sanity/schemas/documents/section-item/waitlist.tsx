import { parseISO, format } from 'date-fns';
import { defineField, defineType } from 'sanity';

/**
 * 
 * Here you can see the different schema types that are available:
 * https://www.sanity.io/docs/schema-types
 * 
 */

export default defineType({
  name: 'waitlist',
  title: 'Waitlist',
  type: 'document',
  icon: () => '📋',
  fields: [
    defineField({
      name: 'coverImage',
      title: 'Cover Images',
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
      name: 'heading',
      title: 'Heading (optional)',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Sub-heading (optional)',
      type: 'string',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'callout',
          title: 'Callout',
          type: 'array',
          of: [{
            type: 'block',
          }],
        }),
        {
          name: 'placeholder',
          title: 'Input Placeholder',
          type: 'string',
          initialValue: '(012) 345-6789',
        },
        {
          name: 'button',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Join Waitlist',
        },
      ],
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'array',
      of: [{
        type: 'block',
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
      title: 'heading',
      subheading: 'subheading',
      cta: 'cta',
      date: 'publishedAt',
      media: 'coverImage',
    },
    prepare ({
      type, title, subheading, date, media,
    }) {
      const subtitles = [
        subheading,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return {
        title: `${type.toUpperCase()}: ${title}`,
        subtitle: subtitles.join(' '),
        media,
      };
    },
  },
});
