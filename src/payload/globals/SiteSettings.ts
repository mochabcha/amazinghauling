import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Amazing Hauling of North Florida',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue: 'Reliable Dump Truck & Materials Hauling in Jacksonville and Northeast Florida',
    },
    {
      name: 'siteUrl',
      type: 'text',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Default OG Image',
    },
    {
      name: 'colors',
      type: 'group',
      label: 'Brand Colors',
      fields: [
        { name: 'primary', type: 'text', defaultValue: '#D4A843' },
        { name: 'secondary', type: 'text', defaultValue: '#0A1628' },
        { name: 'accent', type: 'text', defaultValue: '#E87C2E' },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'googleAnalyticsId', type: 'text', label: 'Google Analytics ID' },
        { name: 'googleTagManagerId', type: 'text', label: 'GTM Container ID' },
      ],
    },
  ],
}
