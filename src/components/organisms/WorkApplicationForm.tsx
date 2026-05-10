'use client'

import React, { useState } from 'react'

import { Button } from '../atoms/Button'
import { Text } from '../atoms/Text'
import { FormField } from '../molecules/FormField'
import { FormHeader } from '../molecules/FormHeader'
import { FormShell } from '../molecules/FormShell'
import { SectionWrapper } from '../molecules/SectionWrapper'
import type { WorkApplicationFieldErrors } from '@/lib/workApplications'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface WorkApplicationFormProps {
  heading?: string
  description?: string
  sectionId?: string
  className?: string
}

type SubmissionState =
  | { kind: 'idle'; message: string }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

const INITIAL_STATUS: SubmissionState = { kind: 'idle', message: '' }

export const WorkApplicationForm: React.FC<WorkApplicationFormProps> = ({
  heading = 'Apply to Work With Amazing Hauling',
  description = 'Use this form if you are applying as a new driver or as an owner-operator looking to lease on with Amazing Hauling.',
  sectionId,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const [applicationType, setApplicationType] = useState('')
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmissionState>(INITIAL_STATUS)
  const [fieldErrors, setFieldErrors] = useState<WorkApplicationFieldErrors>({})
  const classes = ['work-application-form', className].filter(Boolean).join(' ')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setStatus(INITIAL_STATUS)
    setFieldErrors({})

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/work-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        setFieldErrors((result.errors || {}) as WorkApplicationFieldErrors)
        setStatus({
          kind: 'error',
          message: (result.errors?.form as string) || 'We could not submit your application. Please review the form and try again.',
        })
        return
      }

      form.reset()
      setApplicationType('')
      setStartedAt(Date.now())
      setStatus({
        kind: 'success',
        message: (result.message as string) || 'Application submitted successfully.',
      })
    } catch {
      setStatus({
        kind: 'error',
        message: 'We could not submit your application right now. Please try again shortly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionWrapper className={classes} ref={ref} noContainer background="off-white">
      <div id={sectionId} className="quote-form__inner">
        <div className="quote-form__content animate-fade-left">
          <FormHeader heading={heading} description={description} />
          <div className="work-application-form__notes">
            <div className="work-application-form__note">
              <Text as="span" size="xs" color="orange" uppercase>Who should use this form</Text>
              <Text size="base">Company drivers and owner-operators who want to lease on with Amazing Hauling.</Text>
            </div>
            <div className="work-application-form__note">
              <Text as="span" size="xs" color="orange" uppercase>What happens next</Text>
              <Text size="base">
                Applications go directly to our team at <a href="mailto:apply@amazinghaulingnf.com">apply@amazinghaulingnf.com</a> and are reviewed before follow-up.
              </Text>
            </div>
            <div className="work-application-form__note">
              <Text as="span" size="xs" color="orange" uppercase>Submission policy</Text>
              <Text size="base">All fields are screened server-side to block automated and duplicate submissions.</Text>
            </div>
            <div className="work-application-form__note">
              <Text as="span" size="xs" color="orange" uppercase>Before you submit</Text>
              <Text size="base">Give the page a second to load fully, then complete the form normally. Fast bot-style submissions are blocked.</Text>
            </div>
          </div>
        </div>

        <FormShell onSubmit={handleSubmit} className="work-application-form__panel">
          <FormHeader
            heading="Work With Us Application"
            headingLevel={4}
            description="Complete the required fields below. Fields for truck details are only required for owner-operators."
            descriptionSize="sm"
            descriptionColor="gray"
          />

          {status.kind !== 'idle' && (
            <div
              className={`work-application-form__status work-application-form__status--${status.kind}`}
              aria-live="polite"
            >
              <Text size="sm" color={status.kind === 'success' ? 'black' : 'default'}>
                {status.message}
              </Text>
            </div>
          )}

          {fieldErrors.timing && (
            <div className="work-application-form__status work-application-form__status--error" aria-live="polite">
              <Text size="sm">{fieldErrors.timing}</Text>
            </div>
          )}

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="work-application-form__honeypot"
            aria-hidden="true"
          />
          <input type="hidden" name="startedAt" value={startedAt} />
          <input type="hidden" name="sourcePage" value="/work-with-us" />

          <FormField
            name="applicationType"
            label="Applying As"
            type="select"
            required
            value={applicationType}
            onChange={(event) => setApplicationType(event.target.value)}
            placeholder="Select application type"
            options={[
              { label: 'Company Driver', value: 'company-driver' },
              { label: 'Owner-Operator / Lease-On', value: 'owner-operator' },
            ]}
            error={fieldErrors.applicationType}
          />

          <div className="quote-form__form-row">
            <FormField
              name="fullName"
              label="Full Name"
              required
              autoComplete="name"
              minLength={2}
              maxLength={80}
              error={fieldErrors.fullName}
            />
            <FormField
              name="phone"
              label="Phone Number"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              minLength={10}
              maxLength={20}
              error={fieldErrors.phone}
            />
          </div>

          <div className="quote-form__form-row">
            <FormField
              name="email"
              label="Email Address"
              type="email"
              required
              autoComplete="email"
              maxLength={120}
              error={fieldErrors.email}
            />
            <FormField
              name="cityState"
              label="City / State"
              required
              autoComplete="address-level2"
              maxLength={80}
              error={fieldErrors.cityState}
            />
          </div>

          <div className="quote-form__form-row">
            <FormField
              name="cdlClass"
              label="CDL Class"
              type="select"
              required
              placeholder="Select CDL class"
              options={[
                { label: 'Class A', value: 'class-a' },
                { label: 'Class B', value: 'class-b' },
                { label: 'Permit / In Progress', value: 'permit' },
                { label: 'Other', value: 'other' },
              ]}
              error={fieldErrors.cdlClass}
            />
            <FormField
              name="yearsExperience"
              label="Years of Experience"
              type="number"
              required
              min={0}
              max={60}
              inputMode="numeric"
              error={fieldErrors.yearsExperience}
            />
          </div>

          <div className="quote-form__form-row">
            <FormField
              name="availableDate"
              label="Available Start Date"
              type="date"
              required
              error={fieldErrors.availableDate}
            />
            <FormField
              name="currentEmployer"
              label="Current Employer"
              maxLength={80}
              error={fieldErrors.currentEmployer}
            />
          </div>

          <FormField
            name="endorsements"
            label="Endorsements"
            placeholder="Hazmat, tanker, doubles/triples, etc."
            maxLength={120}
            helperText="Optional, but helpful if you hold specialty endorsements."
            error={fieldErrors.endorsements}
          />

          {applicationType === 'owner-operator' && (
            <>
              <div className="quote-form__form-row">
                <FormField
                  name="truckCount"
                  label="Number of Trucks"
                  type="number"
                  required
                  min={1}
                  max={50}
                  inputMode="numeric"
                  error={fieldErrors.truckCount}
                />
                <div className="work-application-form__panel-note">
                  <Text size="sm" color="gray">
                    Include only the trucks you are ready to place in service with Amazing Hauling.
                  </Text>
                </div>
              </div>
              <FormField
                name="truckDescription"
                label="Truck Details"
                type="textarea"
                required
                rows={4}
                minLength={10}
                maxLength={300}
                placeholder="List truck type, configuration, and anything relevant about the equipment."
                error={fieldErrors.truckDescription}
              />
            </>
          )}

          <FormField
            name="haulingExperience"
            label="Hauling / Work Experience"
            type="textarea"
            required
            rows={6}
            minLength={30}
            maxLength={2000}
            placeholder="Summarize your driving history, hauling experience, and the kind of work you are looking for."
            error={fieldErrors.haulingExperience}
          />

          <FormField
            name="additionalInfo"
            label="Additional Information"
            type="textarea"
            rows={5}
            maxLength={1500}
            placeholder="Anything else you want the Amazing Hauling team to know."
            error={fieldErrors.additionalInfo}
          />

          <label className="work-application-form__consent">
            <input type="checkbox" name="consent" required />
            <span>
              I confirm that this information is accurate and that Amazing Hauling may contact me about this application.
            </span>
          </label>
          {fieldErrors.consent && (
            <span className="form-field__error">{fieldErrors.consent}</span>
          )}

          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? 'Submitting Application...' : 'Submit Application'}
          </Button>
        </FormShell>
      </div>
    </SectionWrapper>
  )
}
