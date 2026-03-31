import { parseISO, format } from 'date-fns';
import { defineField, defineType } from 'sanity';

/**
 * 
 * Here you can see the different schema types that are available:
 * https://www.sanity.io/docs/schema-types
 * 
 */

export default defineType({
  name: 'usp',
  title: 'USP',
  type: 'document',
  icon: () => '🌟',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Sub-heading',
      type: 'array',
      of : [{ type: 'block' }],
    }),
    defineField({
      name: 'keypoints',
      title: 'Keypoints',
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
            name: 'value',
            title: 'Value',
            type: 'string',
          },
        ],
      }],
    }),
    // defineField({
    //   name: 'cta',
    //   title: 'CTA',
    //   type: 'array',
    //   of: [{
    //     type: 'object',
    //     fields: [
    //       {
    //         name: 'label',
    //         title: 'Label',
    //         type: 'string',
    //       },
    //       {
    //         name: 'link',
    //         title: 'Link',
    //         type: 'url',
    //         validation: (Rule) => Rule.uri({
    //           allowRelative: true,
    //         }),
    //       },
    //     ],
    //   }],
    // }),
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
      heading: 'heading',
      subheading: 'subheading',
      date: 'publishedAt',
      media: 'coverImage',
    },
    prepare ({
      type, heading, subheading, date, media,
    }) {
      const subtitles = [
        subheading,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return {
        title: `${type.toUpperCase()}: ${heading}`,
        subtitle: subtitles.join(' '),
        media,
      };
    },
  },
});
