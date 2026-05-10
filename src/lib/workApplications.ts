const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /(https?:\/\/|www\.|<a\s)/i

export type WorkApplicationType = 'company-driver' | 'owner-operator'
export type WorkApplicationField =
  | 'applicationType'
  | 'fullName'
  | 'email'
  | 'phone'
  | 'cityState'
  | 'cdlClass'
  | 'yearsExperience'
  | 'availableDate'
  | 'currentEmployer'
  | 'endorsements'
  | 'truckCount'
  | 'truckDescription'
  | 'haulingExperience'
  | 'additionalInfo'
  | 'consent'
  | 'timing'
  | 'form'

export type WorkApplicationFieldErrors = Partial<Record<WorkApplicationField, string>>

export interface WorkApplicationSubmission {
  applicationType: WorkApplicationType
  fullName: string
  email: string
  phone: string
  cityState: string
  cdlClass: 'class-a' | 'class-b' | 'permit' | 'other'
  yearsExperience: number
  availableDate: string
  currentEmployer?: string
  endorsements?: string
  truckCount?: number
  truckDescription?: string
  haulingExperience: string
  additionalInfo?: string
  consent: boolean
  sourcePage: string
}

interface ValidationSuccess {
  valid: true
  data: WorkApplicationSubmission
}

interface ValidationFailure {
  valid: false
  errors: WorkApplicationFieldErrors
}

export type WorkApplicationValidationResult = ValidationSuccess | ValidationFailure

function normalizeString(value: unknown, maxLength: number) {
  return typeof value === 'string'
    ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
    : ''
}

function parseRequiredNumber(value: unknown) {
  if (typeof value !== 'string' && typeof value !== 'number') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
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

export function validateWorkApplicationPayload(raw: unknown): WorkApplicationValidationResult {
  const errors: WorkApplicationFieldErrors = {}
  const input = typeof raw === 'object' && raw !== null ? raw as Record<string, unknown> : {}
  const isTesting = process.env.WORK_APPLICATION_TEST_MODE === 'true'

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

  const applicationType = normalizeString(input.applicationType, 40) as WorkApplicationType
  const fullName = normalizeString(input.fullName, 80)
  const email = normalizeString(input.email, 120).toLowerCase()
  const phone = normalizeString(input.phone, 30)
  const cityState = normalizeString(input.cityState, 80)
  const cdlClass = normalizeString(input.cdlClass, 20) as WorkApplicationSubmission['cdlClass']
  const yearsExperience = parseRequiredNumber(input.yearsExperience)
  const availableDate = normalizeString(input.availableDate, 20)
  const currentEmployer = normalizeString(input.currentEmployer, 80)
  const endorsements = normalizeString(input.endorsements, 120)
  const truckCount = parseRequiredNumber(input.truckCount)
  const truckDescription = normalizeString(input.truckDescription, 300)
  const haulingExperience = normalizeString(input.haulingExperience, 2000)
  const additionalInfo = normalizeString(input.additionalInfo, 1500)
  const sourcePage = normalizeString(input.sourcePage, 120) || '/work-with-us'
  const consent = input.consent === true || input.consent === 'true' || input.consent === 'on'

  if (!['company-driver', 'owner-operator'].includes(applicationType)) {
    errors.applicationType = 'Choose the type of role you are applying for.'
  }

  if (fullName.length < 2 || hasSuspiciousContent(fullName)) {
    errors.fullName = 'Enter your full name.'
  }

  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!isValidPhone(phone)) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (cityState.length < 2 || hasSuspiciousContent(cityState)) {
    errors.cityState = 'Enter your city and state.'
  }

  if (!['class-a', 'class-b', 'permit', 'other'].includes(cdlClass)) {
    errors.cdlClass = 'Select your CDL class.'
  }

  if (yearsExperience === null || yearsExperience < 0 || yearsExperience > 60) {
    errors.yearsExperience = 'Enter your years of experience.'
  }

  if (!isValidDate(availableDate)) {
    errors.availableDate = 'Select a valid start date.'
  }

  if (currentEmployer && hasSuspiciousContent(currentEmployer)) {
    errors.currentEmployer = 'Enter a valid employer name.'
  }

  if (endorsements && hasSuspiciousContent(endorsements)) {
    errors.endorsements = 'Enter endorsements without links.'
  }

  if (applicationType === 'owner-operator') {
    if (truckCount === null || truckCount < 1 || truckCount > 50) {
      errors.truckCount = 'Enter the number of trucks you can provide.'
    }

    if (truckDescription.length < 10 || hasSuspiciousContent(truckDescription)) {
      errors.truckDescription = 'Describe the truck or equipment you want to lease on.'
    }
  }

  if (haulingExperience.length < 30 || hasSuspiciousContent(haulingExperience)) {
    errors.haulingExperience = 'Provide a short summary of your hauling or driving experience.'
  }

  if (additionalInfo && hasSuspiciousContent(additionalInfo)) {
    errors.additionalInfo = 'Remove links from the additional information field.'
  }

  if (!consent) {
    errors.consent = 'You must confirm that the information is accurate.'
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    data: {
      applicationType,
      fullName,
      email,
      phone: normalizePhone(phone),
      cityState,
      cdlClass,
      yearsExperience: yearsExperience as number,
      availableDate,
      currentEmployer: currentEmployer || undefined,
      endorsements: endorsements || undefined,
      truckCount: applicationType === 'owner-operator' ? truckCount || undefined : undefined,
      truckDescription: applicationType === 'owner-operator' ? truckDescription || undefined : undefined,
      haulingExperience,
      additionalInfo: additionalInfo || undefined,
      consent,
      sourcePage,
    },
  }
}
