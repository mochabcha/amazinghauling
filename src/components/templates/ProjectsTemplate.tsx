import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { ContentSection } from '../organisms/ContentSection'
import { ProjectShowcase } from '../organisms/ProjectShowcase'
import { FleetSection } from '../organisms/FleetSection'
import { CTABanner } from '../organisms/CTABanner'
import type { ProjectItem } from '../organisms/ProjectShowcase'

export interface ProjectsTemplateProps {
  hero: {
    heading: string
    description?: string
    backgroundImage?: string
  }
  introHeading: string
  introContent: string
  projects: ProjectItem[]
  growthContent: {
    heading: string
    content: string
  }
  fleet?: {
    heading?: string
    description?: string
    imageSrc?: string
  }
  hardWorkContent: {
    heading: string
    content: string
  }
}

export const ProjectsTemplate: React.FC<ProjectsTemplateProps> = ({
  hero,
  introHeading,
  introContent,
  projects,
  growthContent,
  fleet,
  hardWorkContent,
}) => {
  return (
    <div className="projects-template">
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

      <ProjectShowcase
        heading="Our Work"
        projects={projects}
        showCTA={false}
      />

      <ContentSection
        heading={growthContent.heading}
        content={growthContent.content}
        alt
      />

      <FleetSection
        heading={fleet?.heading}
        description={fleet?.description}
        imageSrc={fleet?.imageSrc}
      />

      <ContentSection
        heading={hardWorkContent.heading}
        content={hardWorkContent.content}
        centered
      />

      <CTABanner
        heading="Partner With Amazing Hauling"
        description="If your project needs reliable hauling support, Amazing Hauling is ready to help. Our team works hard to ensure every project receives dependable service and professional support."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Call Now"
        secondaryHref="tel:"
      />
    </div>
  )
}
