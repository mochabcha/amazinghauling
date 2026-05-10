import { NextRequest, NextResponse } from 'next/server'

import { sendWorkApplicationNotification } from '@/lib/email/workApplications'
import { getPayloadClient } from '@/lib/payload'
import { getSiteUrlObject } from '@/lib/site'
import { validateWorkApplicationPayload } from '@/lib/workApplications'

function logRejectedSubmission(reason: string, details?: unknown) {
  console.warn('[work-applications] Rejected submission:', reason, details ?? '')
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim().slice(0, 120) || ''
  }

  return request.headers.get('x-real-ip')?.slice(0, 120) || ''
}

function isAllowedOrigin(request: NextRequest) {
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

async function hasRecentDuplicateSubmission(args: {
  email: string
  phone: string
  ipAddress: string
}) {
  const payload = await getPayloadClient()
  const lastDay = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  const lastHour = new Date(Date.now() - 1000 * 60 * 60).toISOString()

  const [recentEmail, recentPhone, recentIp] = await Promise.all([
    payload.find({
      collection: 'work-applications',
      where: {
        and: [
          { email: { equals: args.email } },
          { createdAt: { greater_than: lastDay } },
        ],
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'work-applications',
      where: {
        and: [
          { phone: { equals: args.phone } },
          { createdAt: { greater_than: lastDay } },
        ],
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    }),
    args.ipAddress
      ? payload.find({
          collection: 'work-applications',
          where: {
            and: [
              { ipAddress: { equals: args.ipAddress } },
              { createdAt: { greater_than: lastHour } },
            ],
          },
          limit: 3,
          depth: 0,
          overrideAccess: true,
        })
      : Promise.resolve({ totalDocs: 0 }),
  ])

  return recentEmail.totalDocs > 0 || recentPhone.totalDocs > 0 || recentIp.totalDocs >= 3
}

export async function POST(request: NextRequest) {
  const isTesting = process.env.WORK_APPLICATION_TEST_MODE === 'true'

  if (!isAllowedOrigin(request)) {
    logRejectedSubmission('origin_not_allowed', {
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
    })
    return NextResponse.json({ ok: false, errors: { form: 'Origin not allowed.' } }, { status: 403 })
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    logRejectedSubmission('unsupported_content_type', {
      contentType: request.headers.get('content-type'),
    })
    return NextResponse.json({ ok: false, errors: { form: 'Unsupported request type.' } }, { status: 415 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    logRejectedSubmission('invalid_json')
    return NextResponse.json({ ok: false, errors: { form: 'Invalid request payload.' } }, { status: 400 })
  }

  const validation = validateWorkApplicationPayload(body)
  if (!validation.valid) {
    logRejectedSubmission('validation_failed', validation.errors)
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 422 })
  }

  const ipAddress = getClientIp(request)
  const userAgent = request.headers.get('user-agent')?.slice(0, 500) || ''

  if (!isTesting && await hasRecentDuplicateSubmission({
    email: validation.data.email,
    phone: validation.data.phone,
    ipAddress,
  })) {
    logRejectedSubmission('duplicate_submission', {
      email: validation.data.email,
      phone: validation.data.phone,
      ipAddress,
    })
    return NextResponse.json(
      { ok: false, errors: { form: 'We already received a recent submission with these details. Please wait for our team to review it.' } },
      { status: 429 },
    )
  }

  const payload = await getPayloadClient()
  const created = await payload.create({
    collection: 'work-applications',
    depth: 0,
    overrideAccess: true,
    data: {
      ...validation.data,
      ipAddress,
      userAgent,
      emailDeliveryStatus: 'pending',
      status: 'new',
    },
  })

  try {
    await sendWorkApplicationNotification(validation.data)

    await payload.update({
      collection: 'work-applications',
      id: created.id,
      depth: 0,
      overrideAccess: true,
      data: {
        emailDeliveryStatus: 'sent',
        emailDeliveredAt: new Date().toISOString(),
        emailDeliveryError: '',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    await payload.update({
      collection: 'work-applications',
      id: created.id,
      depth: 0,
      overrideAccess: true,
      data: {
        emailDeliveryStatus: 'failed',
        emailDeliveryError: message.slice(0, 500),
      },
    })

    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: 'Your application was saved, but email delivery is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to enable notifications.',
        },
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    message: 'Application submitted successfully. Our team will review it and follow up soon.',
  })
}
