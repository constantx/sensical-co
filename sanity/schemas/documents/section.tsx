import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

/**
 * 
 * Here you can see the different schema types that are available:
 * https://www.sanity.io/docs/schema-types
 * 
 */

export default defineType({
  name: 'section',
  title: 'Sections',
  type: 'document',
  icon: () => '🗂️',
  groups: [
    {
      title: 'Content',
      name: 'content',
    },
    {
      title: 'Meta',
      name: 'meta',
    },
    {
      title: 'UI',
      name: 'ui',
    },
  ],
  fields: [
    defineField({
      group: 'content',
      type: 'string',
      name: 'type',
      title: 'Section Type',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {
            title: 'Interaction', value: 'interaction',
          },
          {
            title: 'USP', value: 'usp', 
          },
          {
            title: 'Quote', value: 'quote', 
          },
          {
            title: 'Pricing', value: 'pricing', 
          },
          {
            title: 'Testimony', value: 'testimony', 
          },
          {
            title: 'Hero', value: 'hero',
          },
          {
            title: 'Waitlist', value: 'waitlist', 
          },
          {
            title: 'FAQs', value: 'faqs',
          },
        ],
      },
    }),
    defineField({
      group: 'meta',
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      description: 'Human-readable unique slug for this section',
      options: {
        source: 'type',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      group: 'content',
      name: 'subheading',
      type: 'string',
      title: 'Section Heading (optional)',
    }),
    defineField({
      group: 'content',
      name: 'subheadingLink',
      title: 'Section Heading Link (optional)',
      type: 'object',
      fields: [{
        name: 'external',
        type: 'boolean',
        title: 'External Link?',
        description: 'Whether the link is external (true) or internal (false)',
      }, {
        name: 'url',
        type: 'url',
        title: 'URL',
        description: 'External URL for the section heading',
      }],
      
    }),
    defineField({
      group: 'content',
      name: 'heading',
      title: 'Hero Heading (optional)',
      type: 'string',
    }),
    defineField({
      group: 'content',
      name: 'content',
      title: 'Sections List (optional)',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          { type: 'hero' },
          { type: 'interaction' },
          { type: 'usp' },
          { type: 'testimony' },
          { type: 'pricing' },
          { type: 'waitlist' },
          { type: 'faq' },
        ],
      }],
      
    }),
    defineField({
      group: 'ui',
      name: 'coverImageTheme',
      title: 'Cover Image Theme',
      type: 'string',
      description: 'Light Cover = Dark Text | Dark Cover = Light Text',
      validation: (rule) => rule.required(),
      initialValue: 'light',
      options: {
        layout: 'radio',
        list: [
          {
            title: 'Light', value: 'light', 
          },
          {
            title: 'Dark', value: 'dark', 
          },
        ],
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (optional)',
      type: 'image',
      group: 'ui',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'palette'],
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
    }),
    defineField({
      type: 'datetime',
      name: 'publishedAt',
      title: 'Published At',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      type: 'type',
      heading: 'heading',
      subheading: 'subheading',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare ({
      type, heading, subheading = '', media, date, 
    }) {
      const subtitles = [
        subheading ? heading : null,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return {
        title: `[${type.toUpperCase()}] ${subheading || heading || ''}`,
        media,
        subtitle: subtitles.join(' | '),
      };
    },
  },
});
