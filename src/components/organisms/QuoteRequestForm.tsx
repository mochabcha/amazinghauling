'use client'

import React from 'react'
import { FormField } from '../molecules/FormField'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import { ContactInfoItem } from '../molecules/ContactInfoItem'
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

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({
  heading = 'Request Hauling Services',
  description = 'Need dependable hauling for your next project? Complete the form below and a member of our team will contact you as soon as possible.',
  contactInfo,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = ['quote-form', className].filter(Boolean).join(' ')

  return (
    <section className={classes} ref={ref}>
      <div className="quote-form__inner">
        <div className="quote-form__content animate-fade-left">
          <div>
            <h2 className="heading heading--2 mb-4">{heading}</h2>
            <p className="text text--lg">{description}</p>
          </div>

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

          <div className="contact-template__hours">
            <h4 className="heading heading--5 mb-3">Service Areas</h4>
            <p className="text text--base">Jacksonville, Duval County, Clay County, Nassau County, St. Johns County, St. Mary&apos;s Georgia</p>
            <p className="text text--sm text--gray mt-2">For larger projects, our fleet can travel throughout Florida when scheduling allows.</p>
          </div>
        </div>

        <form className="quote-form__form animate-fade-right" action="/api/form-submissions" method="POST">
          <h3 className="heading heading--4">Request a Quote</h3>
          <p className="text text--sm text--gray">Please provide the details of your hauling needs so we can give you an accurate estimate.</p>

          <div className="quote-form__form-row">
            <FormField name="name" label="Name" required />
            <FormField name="companyName" label="Company Name" />
          </div>

          <div className="quote-form__form-row">
            <FormField name="phone" label="Phone Number" type="tel" required />
            <FormField name="email" label="Email Address" type="email" required />
          </div>

          <FormField name="projectLocation" label="Project Location" placeholder="City, County, or Address" />

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
          />

          <div className="quote-form__form-row">
            <FormField name="startDate" label="Estimated Start Date" type="date" />
            <FormField name="duration" label="Estimated Duration" placeholder="e.g., 2 weeks" />
          </div>

          <FormField name="trucksNeeded" label="Number of Trucks Needed (if known)" />

          <FormField name="additionalDetails" label="Additional Details About the Job" type="textarea" placeholder="Describe the project, special requirements, or other relevant details..." />

          <CTAButtonGroup
            primaryLabel="Submit Request"
            primaryHref="#"
          />
        </form>
      </div>
    </section>
  )
}
