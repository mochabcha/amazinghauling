import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { ContentSection } from '../organisms/ContentSection'
import { ValueProposition } from '../organisms/ValueProposition'
import { FleetSection } from '../organisms/FleetSection'
import { CTABanner } from '../organisms/CTABanner'
import type { ValueItem } from '../organisms/ValueProposition'

export interface AboutTemplateProps {
  hero: {
    heading: string
    description?: string
    backgroundImage?: string
  }
  storyHeading: string
  storyContent: string
  familyHeading: string
  familyContent: string
  mission: string
  vision: string
  coreValues: ValueItem[]
  growthContent: {
    heading: string
    content: string
  }
  fleet?: {
    heading?: string
    description?: string
    imageSrc?: string
  }
}

export const AboutTemplate: React.FC<AboutTemplateProps> = ({
  hero,
  storyHeading,
  storyContent,
  familyHeading,
  familyContent,
  mission,
  vision,
  coreValues,
  growthContent,
  fleet,
}) => {
  return (
    <div className="about-template">
      <HeroSection
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        short
        primaryCTA={{ label: 'Request a Quote', href: '/contact' }}
      />

      <ContentSection
        heading="Built on Hard Work, Reliability, and Trust"
        content={storyContent}
      />

      <ContentSection
        heading={storyHeading}
        content={storyContent}
        reverse
        alt
      />

      <ContentSection
        heading={familyHeading}
        content={familyContent}
      />

      <div className="about-template__mission">
        <div className="about-template__mission-inner">
          <ContentSection
            heading="Our Mission"
            content={mission}
            centered
            navy
          />
        </div>
      </div>

      <ContentSection
        heading="Our Vision"
        content={vision}
        centered
        alt
      />

      <ValueProposition
        heading="Our Core Values"
        values={coreValues}
        columns={2}
        alt
      />

      <ContentSection
        heading={growthContent.heading}
        content={growthContent.content}
      />

      <FleetSection
        heading={fleet?.heading}
        description={fleet?.description}
        imageSrc={fleet?.imageSrc}
      />

      <CTABanner
        heading="Work With a Company That Shows Up"
        description="Contractors need hauling partners they can depend on. Amazing Hauling is committed to delivering reliable service, clear communication, and professional support for every project."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Call Now"
        secondaryHref="tel:"
      />
    </div>
  )
}
