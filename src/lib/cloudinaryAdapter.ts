import path from 'path'
import type { Field } from 'payload'

import { buildCloudinaryUrl, destroyCloudinaryAsset, getCloudinaryClient, uploadBufferToCloudinary } from './cloudinary'

type CloudStorageAdapterFactory = (args: { collection: unknown; prefix?: string }) => {
  name: string
  fields?: Field[]
  onInit?: () => void
  generateURL?: (args: { collection: unknown; data: any; filename: string; prefix?: string }) => string
  handleUpload: (args: { file: { buffer: Buffer; filename: string; filesize: number; mimeType: string } }) => Promise<Record<string, unknown> | void>
  handleDelete: (args: { doc: any; filename: string }) => Promise<void>
  staticHandler: (_req: unknown, args: { doc?: any; params: { filename: string } }) => Promise<Response>
}

export const cloudinaryStorageAdapter: CloudStorageAdapterFactory = ({ prefix }) => {
  const client = getCloudinaryClient()
  const folder = prefix || 'amazing-hauling'

  return {
    name: 'cloudinary',
    fields: [],
    onInit: () => {
      if (!client && process.env.NODE_ENV === 'production') {
        throw new Error('CLOUDINARY_URL is required for Cloudinary storage')
      }
    },
    generateURL: ({ data, filename }) => {
      const publicId = data?.cloudinaryPublicId || `${folder}/${path.parse(filename).name}`
      const resourceType = data?.mimeType?.startsWith('image/') ? 'image' : 'raw'
      return buildCloudinaryUrl({
        publicId,
        resourceType,
        version: data?.cloudinaryVersion,
      })
    },
    handleUpload: async ({ file }) => {
      const publicId = `${folder}/${path.parse(file.filename).name}`
      const result = await uploadBufferToCloudinary(file.buffer, {
        folder,
        publicId,
        filename: file.filename,
        mimeType: file.mimeType,
        overwrite: true,
        tags: ['amazing-hauling', 'payload-media'],
      })

      if (!result) {
        return
      }

      return {
        url: result.secureUrl,
        filename: file.filename,
        mimeType: file.mimeType,
        filesize: result.bytes || file.filesize,
        width: result.width,
        height: result.height,
        cloudinaryPublicId: result.publicId,
        cloudinaryVersion: String(result.version),
      }
    },
    handleDelete: async ({ doc, filename }) => {
      const publicId = doc.cloudinaryPublicId || `${folder}/${path.parse(filename).name}`
      const resourceType = doc.mimeType?.startsWith('image/') ? 'image' : 'raw'
      await destroyCloudinaryAsset(publicId, resourceType)
    },
    staticHandler: async (_req, { doc, params }) => {
      const filename = params.filename
      const publicId = (doc as { cloudinaryPublicId?: string } | undefined)?.cloudinaryPublicId || `${folder}/${path.parse(filename).name}`
      const mimeType = (doc as { mimeType?: string } | undefined)?.mimeType
      const version = (doc as { cloudinaryVersion?: string } | undefined)?.cloudinaryVersion
      const resourceType = mimeType?.startsWith('image/') ? 'image' : 'raw'
      const url = buildCloudinaryUrl({
        publicId,
        resourceType,
        version,
      })

      return Response.redirect(url, 302)
    },
  }
}
