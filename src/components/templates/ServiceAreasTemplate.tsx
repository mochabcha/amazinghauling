import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { ContentSection } from '../organisms/ContentSection'
import { ServiceAreasList } from '../organisms/ServiceAreasList'
import { CTABanner } from '../organisms/CTABanner'
import type { ServiceAreaItem } from '../organisms/ServiceAreasList'

export interface ServiceAreasTemplateProps {
  hero: {
    heading: string
    description?: string
    backgroundImage?: string
  }
  introContent: string
  areas: ServiceAreaItem[]
  additionalAreas?: string[]
}

export const ServiceAreasTemplate: React.FC<ServiceAreasTemplateProps> = ({
  hero,
  introContent,
  areas,
  additionalAreas,
}) => {
  return (
    <div className="service-areas-template">
      <HeroSection
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        short
        primaryCTA={{ label: 'Request a Quote', href: '/contact' }}
      />

      <ContentSection
        heading="Hauling Services Across Northeast Florida"
        content={introContent}
        centered
      />

      <ServiceAreasList
        heading="Our Service Areas"
        areas={areas}
        additionalAreas={additionalAreas}
      />

      <ContentSection
        heading="Reliable Hauling Where You Need It"
        content="No matter where your job site is located in Northeast Florida, Amazing Hauling works hard to provide dependable service and professional hauling support. Contractors rely on us to help move materials safely and efficiently so their projects can continue moving forward."
        centered
        alt
      />

      <CTABanner
        heading="Schedule Hauling for Your Project"
        description="If your construction project needs reliable hauling services in Jacksonville or anywhere in Northeast Florida, Amazing Hauling is ready to help. Request a quote today to schedule hauling services for your job site."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Call Now"
        secondaryHref="tel:"
      />
    </div>
  )
}
