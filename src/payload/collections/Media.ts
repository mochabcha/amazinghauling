import path from 'path'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.join(process.cwd(), 'media'),
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'cloudinaryVersion',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}
