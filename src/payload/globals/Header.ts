import type { GlobalConfig } from 'payload'

export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'companyName',
      type: 'text',
      defaultValue: 'Amazing Hauling',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            { name: 'description', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Request a Quote',
      label: 'CTA Button Label',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/contact',
      label: 'CTA Button Link',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
  ],
}
