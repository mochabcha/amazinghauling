import { NextRequest, NextResponse } from 'next/server'

import { sendFormSubmissionNotification } from '@/lib/email/formSubmissions'
import { getClientIp, isAllowedOrigin, logRejectedSubmission } from '@/lib/formRequests'
import { validateFormSubmissionPayload } from '@/lib/formSubmissions'
import { getPayloadClient } from '@/lib/payload'

function isTestingModeEnabled() {
  if (process.env.FORM_SUBMISSION_TEST_MODE === 'true') return true
  if (process.env.FORM_SUBMISSION_TEST_MODE === 'false') return false
  return process.env.WORK_APPLICATION_TEST_MODE === 'true'
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
      collection: 'form-submissions',
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
      collection: 'form-submissions',
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
          collection: 'form-submissions',
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
  const isTesting = isTestingModeEnabled()

  if (!isAllowedOrigin(request)) {
    logRejectedSubmission('form-submissions', 'origin_not_allowed', {
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
    })
    return NextResponse.json({ ok: false, errors: { form: 'Origin not allowed.' } }, { status: 403 })
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    logRejectedSubmission('form-submissions', 'unsupported_content_type', {
      contentType: request.headers.get('content-type'),
    })
    return NextResponse.json({ ok: false, errors: { form: 'Unsupported request type.' } }, { status: 415 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    logRejectedSubmission('form-submissions', 'invalid_json')
    return NextResponse.json({ ok: false, errors: { form: 'Invalid request payload.' } }, { status: 400 })
  }

  const validation = validateFormSubmissionPayload(body)
  if (!validation.valid) {
    logRejectedSubmission('form-submissions', 'validation_failed', validation.errors)
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 422 })
  }

  const ipAddress = getClientIp(request)
  const userAgent = request.headers.get('user-agent')?.slice(0, 500) || ''

  if (!isTesting && await hasRecentDuplicateSubmission({
    email: validation.data.email,
    phone: validation.data.phone,
    ipAddress,
  })) {
    logRejectedSubmission('form-submissions', 'duplicate_submission', {
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
    collection: 'form-submissions',
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
    await sendFormSubmissionNotification(validation.data)

    await payload.update({
      collection: 'form-submissions',
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
      collection: 'form-submissions',
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
          form: 'Your request was saved, but email delivery is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to enable notifications.',
        },
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    message: 'Request submitted successfully. Our team will follow up soon.',
  })
}
