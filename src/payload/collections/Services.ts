import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'fullDescription',
      type: 'richText',
      label: 'Full Description',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon Name (Lucide)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'serviceItems',
      type: 'array',
      label: 'Service Items',
      fields: [
        { name: 'item', type: 'text' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar' },
    },
  ],
}
