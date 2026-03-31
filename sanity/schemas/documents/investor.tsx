import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'investor',
  title: 'Investors',
  type: 'document',
  icon: () => '💰',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'organization',
      title: 'Firm/Organization',
      type: 'string',
    }),
  ],
});
