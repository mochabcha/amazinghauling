import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heroHeading',
      type: 'text',
      label: 'Hero Heading',
    },
    {
      name: 'heroSubheading',
      type: 'text',
      label: 'Hero Subheading',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero Description',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Background Image',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Page Sections',
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          required: true,
          options: [
            { label: 'Content Block', value: 'content' },
            { label: 'Services Grid', value: 'servicesGrid' },
            { label: 'Stats Bar', value: 'statsBar' },
            { label: 'Project Showcase', value: 'projectShowcase' },
            { label: 'CTA Banner', value: 'ctaBanner' },
            { label: 'Values Grid', value: 'valuesGrid' },
            { label: 'Fleet Section', value: 'fleet' },
            { label: 'Service Areas List', value: 'serviceAreas' },
            { label: 'Photo Gallery', value: 'photoGallery' },
          ],
        },
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'subheading',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'backgroundVariant',
          type: 'select',
          defaultValue: 'white',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Off White', value: 'offWhite' },
            { label: 'Navy', value: 'navy' },
            { label: 'Blue', value: 'blue' },
          ],
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'icon', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'link', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', label: 'Meta Title' },
        { name: 'description', type: 'textarea', label: 'Meta Description' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
  ],
}
