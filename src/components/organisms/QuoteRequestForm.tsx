'use client'

import React, { useState } from 'react'
import { Button } from '../atoms/Button'
import { Text } from '../atoms/Text'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { FormHeader } from '../molecules/FormHeader'
import { FormField } from '../molecules/FormField'
import { FormShell } from '../molecules/FormShell'
import { ContactInfoItem } from '../molecules/ContactInfoItem'
import { ContentBody } from '../molecules/ContentBody'
import type { FormSubmissionFieldErrors } from '@/lib/formSubmissions'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface QuoteRequestFormProps {
  heading?: string
  description?: string
  contactInfo?: {
    address?: string
    phone?: string
    email?: string
    hours?: string
  }
  className?: string
}

type SubmissionState =
  | { kind: 'idle'; message: string }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

const INITIAL_STATUS: SubmissionState = { kind: 'idle', message: '' }

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({
  heading = 'Request Hauling Services',
  description = 'Need dependable hauling for your next project? Complete the form below and a member of our team will contact you as soon as possible.',
  contactInfo,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmissionState>(INITIAL_STATUS)
  const [fieldErrors, setFieldErrors] = useState<FormSubmissionFieldErrors>({})
  const classes = ['quote-form', className].filter(Boolean).join(' ')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setStatus(INITIAL_STATUS)
    setFieldErrors({})

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        setFieldErrors((result.errors || {}) as FormSubmissionFieldErrors)
        setStatus({
          kind: 'error',
          message: (result.errors?.form as string) || 'We could not submit your request. Please review the form and try again.',
        })
        return
      }

      form.reset()
      setStartedAt(Date.now())
      setStatus({
        kind: 'success',
        message: (result.message as string) || 'Request submitted successfully.',
      })
    } catch {
      setStatus({
        kind: 'error',
        message: 'We could not submit your request right now. Please try again shortly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionWrapper className={classes} ref={ref} noContainer>
      <div className="quote-form__inner">
        <div className="quote-form__content animate-fade-left">
          <FormHeader heading={heading} description={description} />

          {contactInfo && (
            <div className="contact-template__info">
              {contactInfo.address && (
                <ContactInfoItem iconName="MapPin" label="Location" value={contactInfo.address} />
              )}
              {contactInfo.phone && (
                <ContactInfoItem iconName="Phone" label="Phone" value={contactInfo.phone} href={`tel:${contactInfo.phone}`} />
              )}
              {contactInfo.email && (
                <ContactInfoItem iconName="Mail" label="Email" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
              )}
              {contactInfo.hours && (
                <ContactInfoItem iconName="Clock" label="Business Hours" value={contactInfo.hours} />
              )}
            </div>
          )}

          <FormHeader
            heading="Service Areas"
            headingLevel={5}
            description="Jacksonville, Duval County, Clay County, Nassau County, St. Johns County, St. Mary's Georgia"
            descriptionSize="base"
            className="contact-template__hours"
          />
          <ContentBody note="For larger projects, our fleet can travel throughout Florida when scheduling allows.">
            {null}
          </ContentBody>
        </div>

        <FormShell onSubmit={handleSubmit}>
          <FormHeader
            heading="Request a Quote"
            headingLevel={4}
            description="Please provide the details of your hauling needs so we can give you an accurate estimate."
            descriptionSize="sm"
            descriptionColor="gray"
          />

          {status.kind !== 'idle' && (
            <div className={`form-submission__status form-submission__status--${status.kind}`} aria-live="polite">
              <Text size="sm" color={status.kind === 'success' ? 'black' : 'default'}>
                {status.message}
              </Text>
            </div>
          )}

          {fieldErrors.timing && (
            <div className="form-submission__status form-submission__status--error" aria-live="polite">
              <Text size="sm">{fieldErrors.timing}</Text>
            </div>
          )}

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="form-submission__honeypot"
            aria-hidden="true"
          />
          <input type="hidden" name="startedAt" value={startedAt} />
          <input type="hidden" name="sourcePage" value="/contact" />

          <div className="quote-form__form-row">
            <FormField
              name="name"
              label="Name"
              required
              autoComplete="name"
              minLength={2}
              maxLength={80}
              error={fieldErrors.name}
            />
            <FormField
              name="companyName"
              label="Company Name"
              autoComplete="organization"
              maxLength={120}
              error={fieldErrors.companyName}
            />
          </div>

          <div className="quote-form__form-row">
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
            <FormField
              name="email"
              label="Email Address"
              type="email"
              required
              autoComplete="email"
              maxLength={120}
              error={fieldErrors.email}
            />
          </div>

          <FormField
            name="projectLocation"
            label="Project Location"
            placeholder="City, County, or Address"
            maxLength={120}
            error={fieldErrors.projectLocation}
          />

          <FormField
            name="materialType"
            label="Type of Material to be Hauled"
            type="select"
            placeholder="Select material type"
            options={[
              { label: 'Dirt / Fill', value: 'dirt-fill' },
              { label: 'Asphalt', value: 'asphalt' },
              { label: 'Rock / Aggregates', value: 'rock-aggregates' },
              { label: 'Milling Debris', value: 'milling-debris' },
              { label: 'Construction Materials', value: 'construction-materials' },
              { label: 'Other', value: 'other' },
            ]}
            error={fieldErrors.materialType}
          />

          <div className="quote-form__form-row">
            <FormField
              name="startDate"
              label="Estimated Start Date"
              type="date"
              error={fieldErrors.startDate}
            />
            <FormField
              name="duration"
              label="Estimated Duration"
              placeholder="e.g., 2 weeks"
              maxLength={80}
              error={fieldErrors.duration}
            />
          </div>

          <FormField
            name="trucksNeeded"
            label="Number of Trucks Needed (if known)"
            maxLength={40}
            error={fieldErrors.trucksNeeded}
          />

          <FormField
            name="additionalDetails"
            label="Additional Details About the Job"
            type="textarea"
            maxLength={2000}
            placeholder="Describe the project, special requirements, or other relevant details..."
            error={fieldErrors.additionalDetails}
          />

          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? 'Submitting Request...' : 'Submit Request'}
          </Button>
        </FormShell>
      </div>
    </SectionWrapper>
  )
}
