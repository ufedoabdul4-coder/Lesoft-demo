import { defineField, defineType } from 'sanity';

export const partners = defineType({
  name: 'partners',
  title: 'For partners',
  type: 'document',
  fields: [
    defineField({
      name: 'introduction',
      title: 'Partner introduction',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(30),
    }),
    defineField({
      name: 'benefits',
      title: 'Partner benefits',
      type: 'array',
      of: [{ type: 'string', validation: (Rule) => Rule.required().min(5).max(160) }],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
    defineField({
      name: 'enquiryCtaText',
      title: 'Enquiry call-to-action text',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'enquiryCtaLink',
      title: 'Enquiry call-to-action link',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true;
          return /^(\/|https:\/\/)/.test(value) || 'Use /path or an https:// URL.';
        }),
    }),
  ],
});
