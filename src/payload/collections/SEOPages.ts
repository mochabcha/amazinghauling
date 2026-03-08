import type { CollectionConfig } from 'payload'

export const SEOPages: CollectionConfig = {
  slug: 'seo-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'targetCity', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'targetCity',
      type: 'text',
      required: true,
      label: 'Target City',
    },
    {
      name: 'targetCounty',
      type: 'text',
      label: 'Target County',
    },
    {
      name: 'heroHeading',
      type: 'text',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'item', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'ctaHeading',
      type: 'text',
      label: 'CTA Heading',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      label: 'CTA Description',
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', label: 'Meta Title' },
        { name: 'description', type: 'textarea', label: 'Meta Description' },
      ],
    },
  ],
}
