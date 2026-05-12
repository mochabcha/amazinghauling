import type { FormSubmissionInput, FormSubmissionMaterialType } from '@/lib/formSubmissions'
import { sendResendEmail } from '@/lib/email/resend'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function labelizeMaterialType(value?: FormSubmissionMaterialType) {
  switch (value) {
    case 'dirt-fill':
      return 'Dirt / Fill'
    case 'asphalt':
      return 'Asphalt'
    case 'rock-aggregates':
      return 'Rock / Aggregates'
    case 'milling-debris':
      return 'Milling Debris'
    case 'construction-materials':
      return 'Construction Materials'
    case 'other':
      return 'Other'
    default:
      return 'Not provided'
  }
}

function renderRows(submission: FormSubmissionInput) {
  return [
    ['Name', submission.name],
    ['Company Name', submission.companyName || 'Not provided'],
    ['Email', submission.email],
    ['Phone', submission.phone],
    ['Project Location', submission.projectLocation || 'Not provided'],
    ['Material Type', labelizeMaterialType(submission.materialType)],
    ['Estimated Start Date', submission.startDate || 'Not provided'],
    ['Estimated Duration', submission.duration || 'Not provided'],
    ['Number of Trucks Needed', submission.trucksNeeded || 'Not provided'],
    ['Additional Details', submission.additionalDetails || 'Not provided'],
    ['Source Page', submission.sourcePage],
  ] as const
}

function buildHtmlEmail(submission: FormSubmissionInput) {
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
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1;">New Quote Request</h1>
        </div>
        <div style="padding:0 0 8px;">
          <table style="width:100%;border-collapse:collapse;">${rows}</table>
        </div>
      </div>
    </div>
  `
}

function buildTextEmail(submission: FormSubmissionInput) {
  return renderRows(submission)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}

function buildConfirmationHtmlEmail(submission: FormSubmissionInput) {
  return `
    <div style="background:#f3f4f6;padding:32px;font-family:Arial,sans-serif;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
        <div style="padding:24px 28px;background:#111827;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#f59e0b;font-weight:700;">Amazing Hauling</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1;">Quote Request Received</h1>
        </div>
        <div style="padding:28px;color:#374151;line-height:1.65;">
          <p style="margin-top:0;">Hi ${escapeHtml(submission.name)},</p>
          <p>We received your hauling service request and sent it to our team.</p>
          <p>We will review the details and follow up as soon as possible about your project.</p>
          <p style="margin-bottom:0;">Thank you,<br />Amazing Hauling of North Florida</p>
        </div>
      </div>
    </div>
  `
}

function buildConfirmationTextEmail(submission: FormSubmissionInput) {
  return [
    `Hi ${submission.name},`,
    '',
    'We received your hauling service request and sent it to our team.',
    'We will review the details and follow up as soon as possible about your project.',
    '',
    'Thank you,',
    'Amazing Hauling of North Florida',
  ].join('\n')
}

function isTestingModeEnabled() {
  if (process.env.FORM_SUBMISSION_TEST_MODE === 'true') return true
  if (process.env.FORM_SUBMISSION_TEST_MODE === 'false') return false
  return process.env.WORK_APPLICATION_TEST_MODE === 'true'
}

function getInternalRecipients() {
  const isTesting = isTestingModeEnabled()
  const rawRecipients = isTesting
    ? process.env.FORM_SUBMISSION_TEST_TO_EMAIL || process.env.WORK_APPLICATION_TEST_TO_EMAIL || 'channing@amazinghaulingnf.com'
    : process.env.FORM_SUBMISSION_PRODUCTION_TO_EMAIL || process.env.WORK_APPLICATION_PRODUCTION_TO_EMAIL || 'info@amazinghaulingnf.com'

  return rawRecipients
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
}

export async function sendFormSubmissionNotification(submission: FormSubmissionInput) {
  const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.FORM_SUBMISSION_FROM_EMAIL
  const internalRecipients = getInternalRecipients()

  if (!fromEmail || internalRecipients.length === 0) {
    throw new Error('Missing RESEND_FROM_EMAIL or form submission recipient configuration.')
  }

  await Promise.all([
    sendResendEmail({
      from: fromEmail,
      to: internalRecipients,
      replyTo: submission.email,
      subject: `Quote Request: ${submission.name}`,
      html: buildHtmlEmail(submission),
      text: buildTextEmail(submission),
      errorContext: 'internal form submission',
    }),
    sendResendEmail({
      from: fromEmail,
      to: [submission.email],
      subject: 'We received your Amazing Hauling request',
      html: buildConfirmationHtmlEmail(submission),
      text: buildConfirmationTextEmail(submission),
      errorContext: 'form submission confirmation',
    }),
  ])
}
