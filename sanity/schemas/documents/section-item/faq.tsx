import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  icon: () => '❓',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'question',
      title: 'Question',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'datetime',
      name: 'publishedAt',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      type: 'number',
      name: 'priority',
      title: 'Priority',
      description: 'Lower number will be displayed first.',
      initialValue: () => 0,
    }),
    // defineField({
    //   type: 'boolean',
    //   name: 'featured',
    //   title: 'Featured',
    //   options: {
    //     layout: 'switch',
    //   },
    // }),
    // defineField({
    //   type: 'url',
    //   name: 'link',
    //   title: 'Link',
    //   description: 'Link to external content, if applicable.',
    //   // validation: (rule) => rule.required()
    //   //   && rule.uri({
    //   //     scheme: ['https'],
    //   //     allowRelative: true,
    //   //   }),
    // }),
    // defineField({
    //   type: 'slug',
    //   name: 'slug',
    //   title: 'Slug',
    //   description: 'A slug is required for the post to show up in the preview',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //     isUnique: (value, context) => context.defaultIsUnique(value, context),
    //   },
    //   validation: (rule) => rule.required(),
    // }),
    // defineField({
    //   type: 'array',
    //   name: 'categories',
    //   title: 'Categories',
    //   of: [{
    //     type: 'reference',
    //     weak: true,
    //     to: [{ type: categoryType.name }], 
    //   }],
    // }),
    // defineField({
    //   type: 'array',
    //   name: 'tags',
    //   title: 'Tags',
    //   of: [{
    //     type: 'reference',
    //     weak: true,
    //     to: [{ type: tagType.name }], 
    //   }],
    // }),
    // defineField({
    //   name: 'keywords',
    //   title: 'Keywords',
    //   type: 'array',
    //   of: [{ type: 'string' }],
    // }),
  ],
  preview: {
    select: {
      id: '_id',
      question: 'question',
      priority: 'priority',
      publishedAt: 'publishedAt',
    },
    prepare ({
      id, priority, question, publishedAt,
    }) {
      const isPublished = !id.startsWith('drafts.');
      const subtitles = [
        publishedAt && `${format(parseISO(publishedAt), 'yyyy-LL-dd')}`,
      ].filter(Boolean).join(' | ');

      let icon = isPublished ? '🟢' : '📝';

      return {
        title: `${priority ? `P${priority}. ` : '' }${question}`,
        subtitle: subtitles, 
        media: <span>{icon}</span>,
      };
    },
  },
  orderings: [
    {
      name: 'publishedAtDesc',
      title: 'Latest Published',
      by: [
        {
          field: 'publishedAt', direction: 'desc',
        },
        {
          field: 'priority', direction: 'asc', 
        },
      ],
    },
    {
      name: 'priorityAsc',
      title: 'Lowest Priority First',
      by: [
        {
          field: 'priority', direction: 'asc', 
        },
        {
          field: 'publishedAt', direction: 'desc', 
        },
      ],
    },
  ],
});
