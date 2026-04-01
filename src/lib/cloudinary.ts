import fs from 'fs/promises'

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

function getCloudinaryConfig(): CloudinaryConfig | null {
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

function getMimeType(filePath: string) {
  const lower = filePath.toLowerCase()

  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
  if (lower.endsWith('.webp')) return 'image/webp'
  if (lower.endsWith('.gif')) return 'image/gif'
  if (lower.endsWith('.svg')) return 'image/svg+xml'
  if (lower.endsWith('.pdf')) return 'application/pdf'

  return 'application/octet-stream'
}

export async function uploadFileToCloudinary(
  filePath: string,
  options: {
    folder?: string
    publicId?: string
    tags?: string[]
  } = {},
): Promise<CloudinaryUploadResult | null> {
  const config = getCloudinaryConfig()

  if (!config) {
    return null
  }

  const formData = new FormData()
  const fileBuffer = await fs.readFile(filePath)
  const mimeType = getMimeType(filePath)
  const fileName = filePath.split('/').pop() || 'upload'

  formData.append('file', new Blob([fileBuffer], { type: mimeType }), fileName)

  if (options.folder) {
    formData.append('folder', options.folder)
  }

  if (options.publicId) {
    formData.append('public_id', options.publicId)
    formData.append('overwrite', 'true')
  }

  if (options.tags?.length) {
    formData.append('tags', options.tags.join(','))
  }

  const authHeader = Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64')
  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/auto/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Cloudinary upload failed (${response.status}): ${body}`)
  }

  const json = await response.json()

  return {
    secureUrl: json.secure_url,
    publicId: json.public_id,
    version: json.version,
    width: json.width,
    height: json.height,
    bytes: json.bytes,
    format: json.format,
    resourceType: json.resource_type,
  }
}
