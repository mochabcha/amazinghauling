import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { QuoteRequestForm } from '../organisms/QuoteRequestForm'
import { ServiceAreasList } from '../organisms/ServiceAreasList'
import { CTABanner } from '../organisms/CTABanner'
import type { ServiceAreaItem } from '../organisms/ServiceAreasList'

export interface ContactTemplateProps {
  hero: {
    heading: string
    description?: string
    backgroundImage?: string
  }
  contactInfo: {
    address?: string
    phone?: string
    email?: string
    hours?: string
  }
  serviceAreas?: ServiceAreaItem[]
}

export const ContactTemplate: React.FC<ContactTemplateProps> = ({
  hero,
  contactInfo,
  serviceAreas,
}) => {
  return (
    <div className="contact-template">
      <HeroSection
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        short
      />

      <QuoteRequestForm
        heading="Request Hauling Services"
        description="Need dependable hauling for your next project? Amazing Hauling of North Florida provides reliable dump truck and materials hauling services for contractors, construction companies, and development teams throughout Jacksonville and Northeast Florida. Whether you need dirt hauling, asphalt transport, aggregate delivery, or construction site materials moved, our team is ready to help keep your project moving. Complete the form below and a member of our team will contact you as soon as possible."
        contactInfo={contactInfo}
      />

      {serviceAreas && serviceAreas.length > 0 && (
        <ServiceAreasList
          heading="Service Areas"
          description="Amazing Hauling proudly serves contractors throughout Northeast Florida."
          areas={serviceAreas}
          showCTA={false}
        />
      )}

      <CTABanner
        heading="Reliable Hauling When You Need It"
        description="Construction projects depend on reliable partners. Amazing Hauling works hard to provide dependable service, clear communication, and professional hauling support for every project. When contractors call Amazing Hauling, they know they are working with a team committed to getting the job done right."
        primaryLabel="Call Now"
        primaryHref={contactInfo.phone ? `tel:${contactInfo.phone}` : '#'}
        secondaryLabel="Email Us"
        secondaryHref={contactInfo.email ? `mailto:${contactInfo.email}` : '#'}
      />
    </div>
  )
}
