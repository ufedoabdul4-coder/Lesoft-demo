import { defineField, defineType } from 'sanity';

import { imageField } from './image-field';

export const commodity = defineType({
  name: 'commodity',
  title: 'Commodity',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Commodity name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500),
    }),
    imageField({ name: 'image', title: 'Image' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'orderRank',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
});
