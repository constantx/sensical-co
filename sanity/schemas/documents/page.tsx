import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';
/**
 * 
 * Here you can see the different schema types that are available:
 * https://www.sanity.io/docs/schema-types
 * 
 */
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: () => '📄',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'ui',
      title: 'UI',
    },
    {
      name: 'meta',
      title: 'Meta',
    },
    {
      name: 'experiment',
      title: 'Experiment',
    },
  ],

  fields: [
    defineField({
      type: 'boolean',
      name: 'showInMainMenu',
      title: 'Show in Main Menu',
      description: 'Show this page in the main menu',
      group: 'ui',
      hidden: true,
    }),
    // define a isPublicRoute boolean field
    defineField({
      type: 'boolean',
      name: 'hasExperiment',
      title: 'Has Experiment',
      description: 'This page is a controller route for running experiments.',
      group: 'meta',
    }),
    defineField({
      group: 'experiment',
      type: 'string',
      name: 'experimentId',
      title: 'Experiment ID',
      description: 'The ID of the Statsig experiment to run on this page.',
      hidden: ({ document }) => !document?.hasExperiment,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!context.document?.hasExperiment) return true; // Skip check if no experiement is not on

          if (!value) return 'Statsig Experiment ID is required';

          const regex = /^[a-z0-9-_]+$/; // Regex for lowercase alphanumeric, hyphens, and underscores

          if (!regex.test(value)) {
            return 'Only lowercase letters, numbers, hyphens, and underscores are allowed.';
          }

          return true; // Validation passed
        }),

    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the page to be accessible.',
      group: 'meta',
      options: {
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: (input) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96),
      },
      validation: (Rule) => Rule
        .required()
        .custom((value) => {
          if (!value || !value.current) return true; // Skip check if value is not present (it will be caught by required())

          const regex = /^[a-z0-9-_]+$/; // Regex for lowercase alphanumeric, hyphens, and underscores

          if (!regex.test(value.current)) {
            return 'Only lowercase letters, numbers, hyphens, and underscores are allowed.';
          }

          return true; // Validation passed
        }),
    }),
    defineField({
      group: 'content',
      name: 'title',
      title: 'Title (SEO)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      group: 'content',
      name: 'description',
      title: 'Page Description (SEO)',
      type: 'string',
    }),
    defineField({
      group: 'content',
      name: 'pageHeading',
      title: 'Page Heading',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      group: 'content',
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      group: 'content',
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'section' }],
      }],
    }),
    defineField({
      group: 'content',
      name: 'coverImage',
      title: 'Cover Image (SEO)',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
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
      group: 'meta',
      type: 'datetime',
      name: 'publishedAt',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      media: 'coverImage',
      date: 'publishedAt',
      experimentId: 'experimentId',
    },
    prepare ({
      title, slug, media, date, experimentId,
    }) {
      const subtitles = [
        `/${slug.current}`,
        `${experimentId ? `Experiment: ${experimentId}` : ''}`,
        date && `published ${format(parseISO(date), 'LLL d, yyyy h:mm a')}`,
      ].filter(Boolean);

      return {
        title: title,
        subtitle: subtitles.join(' | '),
        media,
      };
    },
  },
});
