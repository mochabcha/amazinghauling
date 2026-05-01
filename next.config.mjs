import { withPayload } from '@payloadcms/next/withPayload'

const remotePatterns = []

const addRemoteUrl = (rawUrl) => {
  if (!rawUrl) {
    return
  }

  const parsed = new URL(rawUrl)
  const protocol = parsed.protocol.replace(':', '')

  if (protocol !== 'http' && protocol !== 'https') {
    return
  }

  remotePatterns.push({
    protocol,
    hostname: parsed.hostname,
    port: parsed.port || undefined,
  })
}

addRemoteUrl(process.env.S3_PUBLIC_BASE_URL)

if (!process.env.S3_PUBLIC_BASE_URL && process.env.S3_BUCKET && process.env.S3_REGION) {
  addRemoteUrl(`https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns,
  },
  experimental: {
    reactCompiler: false,
  },
}

export default withPayload(nextConfig)
