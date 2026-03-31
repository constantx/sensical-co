// import { BookIcon as DocumentIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

import authorType from './author';
import categoryType from './category';
import tagType from './tag';

export default defineType({
  name: 'post',
  title: 'Post',
  icon: () => '📝',
  type: 'document',
  groups: [{
    name: 'brief',
    title: 'Brief',
  }, {
    name: 'meta',
    title: 'Meta',
  }],
  fields: [
    defineField({
      type: 'boolean',
      name: 'featured',
      title: 'Featured',
      group: 'meta',
      options: {
        layout: 'switch',
      },
    }),
    defineField({
      type: 'datetime',
      name: 'publishedAt',
      title: 'Published At',
      group: 'meta', 
    }),
    defineField({
      type: 'reference',
      name: 'topic',
      title: 'Referenced Topic',
      weak: true,
      to: [{ type: 'topic' }], 
      group: 'meta',
    }),

    defineField({
      type: 'image',
      name: 'coverImage',
      title: 'Cover Image',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
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
    }),
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'url',
      name: 'link',
      title: 'Link',
      description: 'Link to external content, if applicable.',
      validation: (rule) => rule.required()
        && rule.uri({
          scheme: ['https'],
          allowRelative: true,
        }),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'authors',
      title: 'Authors',
      of: [{
        type: 'reference',
        to: [{ type: authorType.name }],
      }],
    }),
    defineField({
      type: 'array',
      name: 'categories',
      title: 'Categories',
      of: [{
        type: 'reference',
        weak: true,
        to: [{ type: categoryType.name }], 
      }],
    }),
    defineField({
      type: 'array',
      name: 'tags',
      title: 'Tags',
      of: [{
        type: 'reference',
        weak: true,
        to: [{ type: tagType.name }], 
      }],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'outline',
      title: 'Proposed Outline (md)',
      type: 'text',
      group: 'meta',
    }),
    defineField({
      name: 'tldr',
      title: 'TLDR',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'usage',
      title: 'LLM Usage',
      type: 'text',
      group: 'meta',
    }),
    defineField({
      name: 'tokens',
      title: 'LLM Tokens Total',
      type: 'number',
      group: 'meta',
    }),
  ],
  preview: {
    select: {
      id: '_id',
      featured: 'featured',
      title: 'title',
      author: 'author.name',
      publishedAt: 'publishedAt',
    },
    prepare ({
      id, featured, title, author, publishedAt,
    }) {
      const isPublished = !id.startsWith('drafts.');
      const subtitles = [
        featured ? 'featured': null,
        author && `${author}`,
        publishedAt && `${format(parseISO(publishedAt), 'yyyy-LL-dd')}`,
      ].filter(Boolean).join(' | ');

      let icon = isPublished ? '🟢' : '📝';
      icon = featured ? '⭐' : icon;

      return {
        title,
        subtitle: subtitles, 
        media: <span>{icon}</span>,
      };
    },
  },
});
