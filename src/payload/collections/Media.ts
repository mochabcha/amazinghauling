import path from 'path'
import type { CollectionConfig } from 'payload'

import { uploadFileToCloudinary } from '@/lib/cloudinary'

const MEDIA_STATIC_DIR = path.join(process.cwd(), 'media')

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: MEDIA_STATIC_DIR,
    mimeTypes: ['image/*', 'application/pdf'],
  },
  hooks: {
    afterChange: [
      async ({ doc, req, previousDoc, operation, context }) => {
        if (context?.skipCloudinarySync) {
          return doc
        }

        if (!process.env.CLOUDINARY_URL || !doc.filename) {
          return doc
        }

        if (operation === 'update' && doc.cloudinaryPublicId && previousDoc?.filename === doc.filename) {
          return doc
        }

        const localFilePath = path.join(MEDIA_STATIC_DIR, doc.filename)
        const asset = await uploadFileToCloudinary(localFilePath, {
          folder: 'amazing-hauling',
          publicId: path.parse(doc.filename).name,
          tags: ['amazing-hauling', 'payload-media'],
        })

        if (!asset) {
          return doc
        }

        return req.payload.update({
          collection: 'media',
          id: doc.id,
          data: {
            url: asset.secureUrl,
            thumbnailURL: asset.secureUrl,
            cloudinaryPublicId: asset.publicId,
            cloudinaryVersion: String(asset.version),
            width: asset.width,
            height: asset.height,
            filesize: asset.bytes,
          },
          depth: 0,
          context: {
            skipCloudinarySync: true,
          },
        })
      },
    ],
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
