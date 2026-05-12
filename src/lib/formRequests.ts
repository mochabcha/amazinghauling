import type { NextRequest } from 'next/server'

import { getSiteUrlObject } from '@/lib/site'

export function logRejectedSubmission(formKey: string, reason: string, details?: unknown) {
  console.warn(`[${formKey}] Rejected submission:`, reason, details ?? '')
}

export function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim().slice(0, 120) || ''
  }

  return request.headers.get('x-real-ip')?.slice(0, 120) || ''
}

export function isAllowedOrigin(request: NextRequest) {
  const allowedOrigins = new Set([
    request.nextUrl.origin,
    getSiteUrlObject().origin,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ])

  const origin = request.headers.get('origin')
  if (origin) {
    return allowedOrigins.has(origin)
  }

  const referer = request.headers.get('referer')
  if (!referer) {
    return true
  }

  try {
    return allowedOrigins.has(new URL(referer).origin)
  } catch {
    return false
  }
}
