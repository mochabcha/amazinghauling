const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /(https?:\/\/|www\.|<a\s)/i
const MATERIAL_TYPES = [
  'dirt-fill',
  'asphalt',
  'rock-aggregates',
  'milling-debris',
  'construction-materials',
  'other',
] as const

export type FormSubmissionMaterialType = typeof MATERIAL_TYPES[number]

export type FormSubmissionField =
  | 'name'
  | 'companyName'
  | 'phone'
  | 'email'
  | 'projectLocation'
  | 'materialType'
  | 'startDate'
  | 'duration'
  | 'trucksNeeded'
  | 'additionalDetails'
  | 'timing'
  | 'form'

export type FormSubmissionFieldErrors = Partial<Record<FormSubmissionField, string>>

export interface FormSubmissionInput {
  name: string
  companyName?: string
  phone: string
  email: string
  projectLocation?: string
  materialType?: FormSubmissionMaterialType
  startDate?: string
  duration?: string
  trucksNeeded?: string
  additionalDetails?: string
  sourcePage: string
}

interface ValidationSuccess {
  valid: true
  data: FormSubmissionInput
}

interface ValidationFailure {
  valid: false
  errors: FormSubmissionFieldErrors
}

export type FormSubmissionValidationResult = ValidationSuccess | ValidationFailure

function normalizeString(value: unknown, maxLength: number) {
  return typeof value === 'string'
    ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
    : ''
}

function hasSuspiciousContent(value: string) {
  return URL_PATTERN.test(value)
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = Date.parse(`${value}T00:00:00.000Z`)
  return Number.isFinite(parsed)
}

function normalizePhone(value: string) {
  return value.replace(/[^\d+x]/gi, '')
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function isTestingModeEnabled() {
  if (process.env.FORM_SUBMISSION_TEST_MODE === 'true') return true
  if (process.env.FORM_SUBMISSION_TEST_MODE === 'false') return false
  return process.env.WORK_APPLICATION_TEST_MODE === 'true'
}

export function validateFormSubmissionPayload(raw: unknown): FormSubmissionValidationResult {
  const errors: FormSubmissionFieldErrors = {}
  const input = typeof raw === 'object' && raw !== null ? raw as Record<string, unknown> : {}
  const isTesting = isTestingModeEnabled()

  if (!isTesting && normalizeString(input.website, 200) !== '') {
    return { valid: false, errors: { form: 'Submission rejected.' } }
  }

  const startedAtRaw = normalizeString(input.startedAt, 30)
  const startedAt = Number(startedAtRaw)
  const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : NaN

  if (!isTesting && (!Number.isFinite(elapsedMs) || elapsedMs > 1000 * 60 * 60 * 24 * 2)) {
    return { valid: false, errors: { form: 'Please reload the page and try again.' } }
  }

  if (!isTesting && elapsedMs < 1500) {
    return { valid: false, errors: { timing: 'Please wait a moment before submitting the form.' } }
  }

  const name = normalizeString(input.name, 80)
  const companyName = normalizeString(input.companyName, 120)
  const phone = normalizeString(input.phone, 30)
  const email = normalizeString(input.email, 120).toLowerCase()
  const projectLocation = normalizeString(input.projectLocation, 120)
  const materialType = normalizeString(input.materialType, 40) as FormSubmissionMaterialType
  const startDate = normalizeString(input.startDate, 20)
  const duration = normalizeString(input.duration, 80)
  const trucksNeeded = normalizeString(input.trucksNeeded, 40)
  const additionalDetails = normalizeString(input.additionalDetails, 2000)
  const sourcePage = normalizeString(input.sourcePage, 120) || '/contact'

  if (name.length < 2 || hasSuspiciousContent(name)) {
    errors.name = 'Enter your full name.'
  }

  if (companyName && hasSuspiciousContent(companyName)) {
    errors.companyName = 'Enter a valid company name.'
  }

  if (!isValidPhone(phone)) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (projectLocation && hasSuspiciousContent(projectLocation)) {
    errors.projectLocation = 'Enter a valid project location.'
  }

  if (materialType && !MATERIAL_TYPES.includes(materialType)) {
    errors.materialType = 'Select a valid material type.'
  }

  if (startDate && !isValidDate(startDate)) {
    errors.startDate = 'Select a valid start date.'
  }

  if (duration && hasSuspiciousContent(duration)) {
    errors.duration = 'Enter the duration without links.'
  }

  if (trucksNeeded && hasSuspiciousContent(trucksNeeded)) {
    errors.trucksNeeded = 'Enter the truck count without links.'
  }

  if (additionalDetails && hasSuspiciousContent(additionalDetails)) {
    errors.additionalDetails = 'Remove links from the additional details field.'
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    data: {
      name,
      companyName: companyName || undefined,
      phone: normalizePhone(phone),
      email,
      projectLocation: projectLocation || undefined,
      materialType: materialType || undefined,
      startDate: startDate || undefined,
      duration: duration || undefined,
      trucksNeeded: trucksNeeded || undefined,
      additionalDetails: additionalDetails || undefined,
      sourcePage,
    },
  }
}
