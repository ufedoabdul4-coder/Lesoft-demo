import { defineField, defineType } from 'sanity';

import { imageField } from './image-field';

export const about = defineType({
  name: 'about',
  title: 'About section',
  type: 'document',
  fields: [
    defineField({
      name: 'introduction',
      title: 'Company introduction',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(40),
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(20),
    }),
    imageField({ name: 'image', title: 'Company image' }),
  ],
});
