import type { CollectionConfig } from 'payload'

export const ServiceAreas: CollectionConfig = {
  slug: 'service-areas',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'isPrimary', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
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
      name: 'region',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Additional', value: 'additional' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'servicesAvailable',
      type: 'array',
      fields: [
        { name: 'service', type: 'text' },
      ],
    },
    {
      name: 'isPrimary',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
