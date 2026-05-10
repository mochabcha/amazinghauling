import type { WorkApplicationSubmission } from '@/lib/workApplications'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function labelizeApplicationType(value: WorkApplicationSubmission['applicationType']) {
  return value === 'owner-operator' ? 'Owner-Operator / Lease-On' : 'Company Driver'
}

function labelizeCdlClass(value: WorkApplicationSubmission['cdlClass']) {
  switch (value) {
    case 'class-a':
      return 'Class A'
    case 'class-b':
      return 'Class B'
    case 'permit':
      return 'Permit / In Progress'
    default:
      return 'Other'
  }
}

function renderRows(submission: WorkApplicationSubmission) {
  return [
    ['Application Type', labelizeApplicationType(submission.applicationType)],
    ['Full Name', submission.fullName],
    ['Email', submission.email],
    ['Phone', submission.phone],
    ['City / State', submission.cityState],
    ['CDL Class', labelizeCdlClass(submission.cdlClass)],
    ['Years of Experience', `${submission.yearsExperience}`],
    ['Available Start Date', submission.availableDate],
    ['Current Employer', submission.currentEmployer || 'Not provided'],
    ['Endorsements', submission.endorsements || 'Not provided'],
    ['Number of Trucks', submission.truckCount ? `${submission.truckCount}` : 'Not provided'],
    ['Truck Details', submission.truckDescription || 'Not provided'],
    ['Experience Summary', submission.haulingExperience],
    ['Additional Information', submission.additionalInfo || 'Not provided'],
    ['Source Page', submission.sourcePage],
  ] as const
}

function buildHtmlEmail(submission: WorkApplicationSubmission) {
  const rows = renderRows(submission)
    .map(([label, value]) => (
      `<tr>
        <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#111827;width:220px;">${escapeHtml(label)}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#374151;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`
    ))
    .join('')

  return `
    <div style="background:#f3f4f6;padding:32px;font-family:Arial,sans-serif;">
      <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
        <div style="padding:24px 28px;background:#111827;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#f59e0b;font-weight:700;">Amazing Hauling</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1;">New Work With Us Application</h1>
        </div>
        <div style="padding:0 0 8px;">
          <table style="width:100%;border-collapse:collapse;">${rows}</table>
        </div>
      </div>
    </div>
  `
}

function buildTextEmail(submission: WorkApplicationSubmission) {
  return renderRows(submission)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}

function buildConfirmationHtmlEmail(submission: WorkApplicationSubmission) {
  return `
    <div style="background:#f3f4f6;padding:32px;font-family:Arial,sans-serif;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
        <div style="padding:24px 28px;background:#111827;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#f59e0b;font-weight:700;">Amazing Hauling</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1;">Application Received</h1>
        </div>
        <div style="padding:28px;color:#374151;line-height:1.65;">
          <p style="margin-top:0;">Hi ${escapeHtml(submission.fullName)},</p>
          <p>We received your Work With Us application for ${escapeHtml(labelizeApplicationType(submission.applicationType))}.</p>
          <p>Our team will review your information and follow up if your background matches our current needs.</p>
          <p style="margin-bottom:0;">Thank you,<br />Amazing Hauling of North Florida</p>
        </div>
      </div>
    </div>
  `
}

function buildConfirmationTextEmail(submission: WorkApplicationSubmission) {
  return [
    `Hi ${submission.fullName},`,
    '',
    `We received your Work With Us application for ${labelizeApplicationType(submission.applicationType)}.`,
    'Our team will review your information and follow up if your background matches our current needs.',
    '',
    'Thank you,',
    'Amazing Hauling of North Florida',
  ].join('\n')
}

function getInternalRecipients() {
  const isTesting = process.env.WORK_APPLICATION_TEST_MODE !== 'false'
  const rawRecipients = isTesting
    ? process.env.WORK_APPLICATION_TEST_TO_EMAIL || 'channing@amazinghaulingnf.com'
    : process.env.WORK_APPLICATION_PRODUCTION_TO_EMAIL || 'info@amazinghaulingnf.com'

  return rawRecipients
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
}

export async function sendWorkApplicationNotification(submission: WorkApplicationSubmission) {
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.WORK_APPLICATION_FROM_EMAIL
  const internalRecipients = getInternalRecipients()

  if (!resendApiKey || !fromEmail || internalRecipients.length === 0) {
    throw new Error('Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or work application recipient configuration.')
  }

  const [internalResponse, confirmationResponse] = await Promise.all([
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: internalRecipients,
        reply_to: submission.email,
        subject: `Work With Us Application: ${submission.fullName}`,
        html: buildHtmlEmail(submission),
        text: buildTextEmail(submission),
      }),
    }),
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [submission.email],
        subject: 'We received your Amazing Hauling application',
        html: buildConfirmationHtmlEmail(submission),
        text: buildConfirmationTextEmail(submission),
      }),
    }),
  ])

  if (!internalResponse.ok) {
    const errorText = await internalResponse.text()
    throw new Error(`Resend internal email error ${internalResponse.status}: ${errorText}`)
  }

  if (!confirmationResponse.ok) {
    const errorText = await confirmationResponse.text()
    throw new Error(`Resend confirmation email error ${confirmationResponse.status}: ${errorText}`)
  }
}
