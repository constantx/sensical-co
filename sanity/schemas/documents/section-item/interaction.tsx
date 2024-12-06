import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

/**
 * 
 * Here you can see the different schema types that are available:
 * https://www.sanity.io/docs/schema-types
 * 
 */

export default defineType({
  name: 'interaction',
  title: 'Interaction',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'message',
      title: 'Message',
      description: 'The message to be displayed, keep it plain-text for now.',
      type: 'text',
      
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      options: {
        list: ['oli', 'user'],
      },
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
      title: 'message', 
      author: 'author',
    },
    prepare ({
      type, title, author,
    }) {
      const subtitles = [
        author,
      ].filter(Boolean);

      return {
        title: `[${type.toUpperCase()}] ${title}`,
        subtitle: subtitles.join(' | '),
      };
    },
  },
});
