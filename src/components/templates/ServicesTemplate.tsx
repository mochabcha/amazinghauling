import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { ContentSection } from '../organisms/ContentSection'
import { ServicesGrid } from '../organisms/ServicesGrid'
import { ValueProposition } from '../organisms/ValueProposition'
import { CTABanner } from '../organisms/CTABanner'
import type { ServiceItem } from '../organisms/ServicesGrid'

export interface ServiceDetail {
  heading: string
  content: string
  items?: string[]
  imageSrc?: string
}

export interface ServicesTemplateProps {
  hero: {
    heading: string
    description?: string
    backgroundImage?: string
  }
  introHeading: string
  introContent: string
  services: ServiceItem[]
  serviceDetails: ServiceDetail[]
  industries: string[]
  safetyContent: string
}

export const ServicesTemplate: React.FC<ServicesTemplateProps> = ({
  hero,
  introHeading,
  introContent,
  services,
  serviceDetails,
  industries,
  safetyContent,
}) => {
  return (
    <div className="services-template">
      <HeroSection
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        short
        primaryCTA={{ label: 'Request a Quote', href: '/contact' }}
      />

      <ContentSection
        heading={introHeading}
        content={introContent}
        centered
      />

      <ServicesGrid
        heading="Our Hauling Services"
        services={services}
        showCTA={false}
      />

      <div className="services-template__detail">
        <div className="services-template__detail-inner">
          {serviceDetails.map((detail, index) => (
            <ContentSection
              key={index}
              heading={detail.heading}
              content={
                <>
                  <p>{detail.content}</p>
                  {detail.items && detail.items.length > 0 && (
                    <ul className="rich-text">
                      {detail.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </>
              }
              imageSrc={detail.imageSrc}
              reverse={index % 2 === 1}
              alt={index % 2 === 1}
            />
          ))}
        </div>
      </div>

      <ValueProposition
        heading="Industries We Support"
        description="Amazing Hauling regularly works with professionals across multiple industries."
        values={industries.map((industry) => ({
          title: industry,
          description: '',
          iconName: 'Building2',
        }))}
        columns={3}
        alt
      />

      <ContentSection
        heading="Safety & Professional Standards"
        content={safetyContent}
        centered
        alt
      />

      <CTABanner
        heading="Need Hauling for Your Project?"
        description="Amazing Hauling is ready to support your next project with dependable dump truck services. Request a quote today to schedule hauling services for your job site."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Call Now"
        secondaryHref="tel:"
      />
    </div>
  )
}
