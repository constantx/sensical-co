/* eslint-disable @stylistic/max-len */
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  icon: () => '📂',
  type: 'document',
  fields: [
    defineField({
      type: 'boolean',
      name: 'isMainMenu',
      title: 'Show in Main Menu',
      description: 'Show this category in the main menu',
    }),
    defineField({
      type: 'boolean',
      name: 'featured',
      title: 'Featured Category',
      description: 'Show this category prominently on the home page under search',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the cateogry page to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
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
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
        metadata: ['lqip', 'blurhash', 'palette'],
      },
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
  ],
});
