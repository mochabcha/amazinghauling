import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      defaultValue: 'Amazing Hauling of North Florida',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Dump Truck & Materials Hauling Services',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Serving Duval, Clay, Nassau, and St. Johns Counties',
    },
    {
      name: 'ctaImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'address', type: 'text', defaultValue: 'Jacksonville, Florida' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email', defaultValue: 'info@amazinghauling.com' },
        { name: 'hours', type: 'text', defaultValue: 'Monday – Friday, 6:00 AM – 6:00 PM' },
      ],
    },
    {
      name: 'certifications',
      type: 'text',
      defaultValue: 'Licensed & Insured',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Amazing Hauling of North Florida. All Rights Reserved.',
    },
  ],
}
