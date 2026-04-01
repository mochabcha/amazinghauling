import path from 'path'
import fs from 'fs/promises'

import { v2 as cloudinary } from 'cloudinary'

interface CloudinaryConfig {
  apiKey: string
  apiSecret: string
  cloudName: string
}

export interface CloudinaryUploadResult {
  secureUrl: string
  publicId: string
  version: number
  width?: number
  height?: number
  bytes?: number
  format?: string
  resourceType?: string
}

export function getCloudinaryConfig(): CloudinaryConfig | null {
  const value = process.env.CLOUDINARY_URL

  if (!value) {
    return null
  }

  const parsed = new URL(value)
  const apiKey = decodeURIComponent(parsed.username)
  const apiSecret = decodeURIComponent(parsed.password)
  const cloudName = parsed.hostname

  if (!apiKey || !apiSecret || !cloudName) {
    return null
  }

  return { apiKey, apiSecret, cloudName }
}

export function getCloudinaryClient() {
  const config = getCloudinaryConfig()

  if (!config) {
    return null
  }

  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
    secure: true,
  })

  return cloudinary
}

function normalizeUploadResult(result: {
  secure_url?: string
  public_id?: string
  version?: number
  width?: number
  height?: number
  bytes?: number
  format?: string
  resource_type?: string
}): CloudinaryUploadResult {
  return {
    secureUrl: result.secure_url || '',
    publicId: result.public_id || '',
    version: result.version || 0,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    format: result.format,
    resourceType: result.resource_type,
  }
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string
    publicId?: string
    filename?: string
    mimeType?: string
    overwrite?: boolean
    tags?: string[]
  } = {},
): Promise<CloudinaryUploadResult | null> {
  const client = getCloudinaryClient()

  if (!client) {
    return null
  }

  const dataUri = `data:${options.mimeType || 'application/octet-stream'};base64,${buffer.toString('base64')}`
  const result = await client.uploader.upload(dataUri, {
    resource_type: 'auto',
    folder: options.folder,
    public_id: options.publicId,
    overwrite: options.overwrite ?? true,
    filename_override: options.filename,
    tags: options.tags,
  })

  return normalizeUploadResult(result)
}

export async function uploadFileToCloudinary(
  filePath: string,
  options: {
    folder?: string
    publicId?: string
    tags?: string[]
  } = {},
): Promise<CloudinaryUploadResult | null> {
  const buffer = await fs.readFile(filePath)
  const fileName = path.basename(filePath)
  const lower = fileName.toLowerCase()
  const mimeType = lower.endsWith('.png')
    ? 'image/png'
    : lower.endsWith('.jpg') || lower.endsWith('.jpeg')
      ? 'image/jpeg'
      : lower.endsWith('.webp')
        ? 'image/webp'
        : lower.endsWith('.svg')
          ? 'image/svg+xml'
          : lower.endsWith('.pdf')
            ? 'application/pdf'
            : 'application/octet-stream'

  return uploadBufferToCloudinary(buffer, {
    ...options,
    filename: fileName,
    mimeType,
  })
}

export async function destroyCloudinaryAsset(publicId: string, resourceType: 'image' | 'raw' | 'video' = 'image') {
  const client = getCloudinaryClient()

  if (!client) {
    return
  }

  await client.uploader.destroy(publicId, {
    resource_type: resourceType,
    invalidate: true,
  })
}

export function buildCloudinaryUrl(args: {
  publicId: string
  resourceType?: 'image' | 'raw' | 'video'
  version?: string | number
}) {
  const client = getCloudinaryClient()

  if (!client) {
    return ''
  }

  return client.url(args.publicId, {
    secure: true,
    resource_type: args.resourceType || 'image',
    version: args.version,
  })
}
