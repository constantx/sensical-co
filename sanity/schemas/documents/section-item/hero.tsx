import { defineField, defineType } from 'sanity';

/**
 * 
 * This file is the schema definition for a post.
 * Here you'll be able to edit the different fields that appear when you  
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:
 * https://www.sanity.io/docs/schema-types
 * 
 */

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  icon: () => '🌅',
  description: 'Hero items are unsupported in the current theme. Create a Hero section to present a full-screen background hero photo, a heading, a subheading, and a call-to-action button.',
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
      title: 'CTA (optional)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string',
          },
          {
            name: 'link',
            title: 'Link',
            type: 'url',
            validation: (Rule) => Rule.uri({
              allowRelative: true,
            }),
          },
        ],
      }],
    }),
  ],
  preview: {
    select: {
      type: '_type',
      title: 'heading',
      subheading: 'subheading',
      media: 'coverImage',
    },
    prepare ({
      type, title, subheading, media,
    }) {
      const subtitles = [
        subheading,
      ].filter(Boolean);

      return {
        title: `${type.toUpperCase()}: ${title}`,
        subtitle: subtitles.join(' '),
        media,
      };
    },
  },
});
