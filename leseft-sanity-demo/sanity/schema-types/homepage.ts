import { defineField, defineType } from 'sanity';

import { imageField } from './image-field';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage content',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main heading',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(140),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(30).max(600),
    }),
    imageField({
      name: 'heroImage',
      title: 'Hero image',
      description: 'Hero image used on the homepage.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Call-to-action text',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call-to-action link',
      type: 'string',
      description: 'Use a relative path such as /contact or an absolute https:// URL.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true;
          return /^(\/|https:\/\/)/.test(value) || 'Use /path or an https:// URL.';
        }),
    }),
  ],
});
