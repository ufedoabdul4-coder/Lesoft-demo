import { defineField, defineType } from 'sanity';

import { imageField } from './image-field';

export const project = defineType({
  name: 'project',
  title: 'Project & service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(600),
    }),
    imageField({ name: 'image', title: 'Image' }),
    defineField({
      name: 'serviceCategory',
      title: 'Service category',
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
    select: { title: 'title', subtitle: 'serviceCategory', media: 'image' },
  },
});
