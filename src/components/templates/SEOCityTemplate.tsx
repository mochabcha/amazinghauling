import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { ContentSection } from '../organisms/ContentSection'
import { ServicesGrid } from '../organisms/ServicesGrid'
import { ValueProposition } from '../organisms/ValueProposition'
import { CTABanner } from '../organisms/CTABanner'
import type { ServiceItem } from '../organisms/ServicesGrid'

export interface SEOCitySection {
  heading: string
  content: string
  items?: string[]
}

export interface SEOCityTemplateProps {
  hero: {
    heading: string
    description?: string
    backgroundImage?: string
  }
  city: string
  county?: string
  sections: SEOCitySection[]
  services?: ServiceItem[]
  whyChoose?: Array<{ title: string; description: string }>
  ctaHeading?: string
  ctaDescription?: string
}

export const SEOCityTemplate: React.FC<SEOCityTemplateProps> = ({
  hero,
  city,
  county,
  sections,
  services,
  whyChoose,
  ctaHeading,
  ctaDescription,
}) => {
  return (
    <div className="seo-city-template">
      <HeroSection
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        short
        primaryCTA={{ label: 'Request a Quote', href: '/contact' }}
        secondaryCTA={{ label: 'Call Now', href: 'tel:' }}
      />

      <div className="seo-city-template__sections">
        {sections.map((section, index) => (
          <ContentSection
            key={index}
            heading={section.heading}
            content={
              <>
                <p>{section.content}</p>
                {section.items && section.items.length > 0 && (
                  <ul className="rich-text">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </>
            }
            alt={index % 2 === 1}
            centered
          />
        ))}
      </div>

      {services && services.length > 0 && (
        <ServicesGrid
          heading={`Hauling Services in ${city}`}
          services={services}
        />
      )}

      {whyChoose && whyChoose.length > 0 && (
        <ValueProposition
          heading={`Why ${county || city} Contractors Choose Amazing Hauling`}
          values={whyChoose.map((item) => ({
            ...item,
            iconName: 'CheckCircle',
          }))}
          alt
        />
      )}

      <CTABanner
        heading={ctaHeading || `Request Hauling Services in ${city}`}
        description={ctaDescription || `If your project needs dependable dump truck hauling in ${city}, Amazing Hauling is ready to help. Call today or request a quote to schedule hauling services for your job site.`}
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Call Now"
        secondaryHref="tel:"
      />
    </div>
  )
}
