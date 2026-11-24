import { defineField, defineType } from 'sanity';

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact information',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required().min(7).max(40),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(5),
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(20),
    }),
  ],
});
