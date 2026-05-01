import path from 'path'

interface S3StorageConfig {
  accessKeyId: string
  bucket: string
  endpoint: string
  forcePathStyle: boolean
  prefix: string
  publicBaseUrl: string
  region: string
  secretAccessKey: string
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '')
}

function normalizePrefix(value?: string) {
  if (!value) {
    return 'amazing-hauling'
  }

  return value.replace(/^\/+|\/+$/g, '')
}

function buildDefaultEndpoint(region: string) {
  return `https://s3.${region}.amazonaws.com`
}

function buildDefaultPublicBaseUrl(args: {
  bucket: string
  endpoint: string
  forcePathStyle: boolean
  region: string
}) {
  if (args.forcePathStyle) {
    return `${trimTrailingSlash(args.endpoint)}/${args.bucket}`
  }

  return `https://${args.bucket}.s3.${args.region}.amazonaws.com`
}

function encodeObjectKeySegment(value: string) {
  return value
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export function getS3StorageConfig(): S3StorageConfig | null {
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION
  const accessKeyId = process.env.S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY

  if (!bucket || !region || !accessKeyId || !secretAccessKey) {
    return null
  }

  const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === 'true'
  const endpoint = trimTrailingSlash(process.env.S3_ENDPOINT || buildDefaultEndpoint(region))
  const publicBaseUrl = trimTrailingSlash(
    process.env.S3_PUBLIC_BASE_URL || buildDefaultPublicBaseUrl({
      bucket,
      endpoint,
      forcePathStyle,
      region,
    }),
  )

  return {
    accessKeyId,
    bucket,
    endpoint,
    forcePathStyle,
    prefix: normalizePrefix(process.env.S3_PREFIX),
    publicBaseUrl,
    region,
    secretAccessKey,
  }
}

export function buildS3ObjectUrl(args: {
  filename: string
  prefix?: string
}) {
  const config = getS3StorageConfig()

  if (!config) {
    return ''
  }

  const objectKey = path.posix.join(normalizePrefix(args.prefix || config.prefix), encodeObjectKeySegment(args.filename))

  return `${config.publicBaseUrl}/${objectKey}`
}
