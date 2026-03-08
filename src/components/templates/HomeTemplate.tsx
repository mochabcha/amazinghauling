import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { ServicesGrid } from '../organisms/ServicesGrid'
import { StatsBar } from '../organisms/StatsBar'
import { ContentSection } from '../organisms/ContentSection'
import { ValueProposition } from '../organisms/ValueProposition'
import { FleetSection } from '../organisms/FleetSection'
import { ProjectShowcase } from '../organisms/ProjectShowcase'
import { ServiceAreasList } from '../organisms/ServiceAreasList'
import { CTABanner } from '../organisms/CTABanner'
import type { ServiceItem } from '../organisms/ServicesGrid'
import type { ValueItem } from '../organisms/ValueProposition'
import type { ProjectItem } from '../organisms/ProjectShowcase'
import type { ServiceAreaItem } from '../organisms/ServiceAreasList'

export interface HomeTemplateProps {
  hero: {
    heading: string
    subheading?: string
    description?: string
    backgroundImage?: string
    certifications?: string[]
  }
  introHeading: string
  introContent: string
  services: ServiceItem[]
  values: ValueItem[]
  stats: Array<{ value: string; label: string }>
  fleet?: {
    heading?: string
    description?: string
    imageSrc?: string
  }
  projects: ProjectItem[]
  serviceAreas: ServiceAreaItem[]
  additionalAreas?: string[]
  commitment: {
    heading: string
    content: string
  }
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({
  hero,
  introHeading,
  introContent,
  services,
  values,
  stats,
  fleet,
  projects,
  serviceAreas,
  additionalAreas,
  commitment,
}) => {
  return (
    <div className="home-template">
      <HeroSection
        heading={hero.heading}
        subheading={hero.subheading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        certifications={hero.certifications}
        primaryCTA={{ label: 'Request a Quote', href: '/contact' }}
        secondaryCTA={{ label: 'Call Now', href: 'tel:' }}
      />

      <ContentSection
        heading={introHeading}
        content={introContent}
        showCTA={false}
      />

      <ServicesGrid
        heading="Materials & Services We Provide"
        subheading="Our Services"
        description="Amazing Hauling supports a wide range of construction and infrastructure projects."
        services={services}
      />

      <StatsBar stats={stats} />

      <ValueProposition
        heading="Why Contractors Choose Amazing Hauling"
        values={values}
        alt
      />

      <FleetSection
        heading={fleet?.heading}
        description={fleet?.description}
        imageSrc={fleet?.imageSrc}
      />

      <ProjectShowcase
        heading="Recent Project Work"
        description="Amazing Hauling supports projects across the region."
        projects={projects}
      />

      <ServiceAreasList
        heading="Service Areas"
        description="Amazing Hauling proudly serves contractors throughout Northeast Florida."
        areas={serviceAreas}
        additionalAreas={additionalAreas}
        showCTA={false}
      />

      <ContentSection
        heading={commitment.heading}
        content={commitment.content}
        centered
        navy
        showCTA
      />

      <CTABanner
        heading="Ready to Start Your Project?"
        description="If your job site needs dependable hauling services, Amazing Hauling is ready to help. Request a quote today and let us keep your project moving."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Call Now"
        secondaryHref="tel:"
      />
    </div>
  )
}
