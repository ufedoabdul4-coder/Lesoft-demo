import { defineField } from 'sanity';

type ImageFieldOptions = {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
};

export function imageField({ name, title, description, required = true }: ImageFieldOptions) {
  return defineField({
    name,
    title,
    description,
    type: 'image',
    options: { hotspot: true },
    validation: required ? (Rule) => Rule.required() : undefined,
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        description: 'Describe the image for screen reader users.',
        validation: (Rule) => Rule.required().min(5).max(160),
      }),
    ],
  });
}
