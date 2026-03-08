import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { ContentSection } from '../organisms/ContentSection'
import { ValueProposition } from '../organisms/ValueProposition'
import { CTABanner } from '../organisms/CTABanner'
import type { ValueItem } from '../organisms/ValueProposition'

export interface SubcontractorTemplateProps {
  hero: {
    heading: string
    description?: string
    backgroundImage?: string
  }
  introContent: string
  benefits: ValueItem[]
  requirements: string[]
  packetDownloadUrl?: string
  contactEmail: string
  growthContent: string
}

export const SubcontractorTemplate: React.FC<SubcontractorTemplateProps> = ({
  hero,
  introContent,
  benefits,
  requirements,
  packetDownloadUrl,
  contactEmail,
  growthContent,
}) => {
  return (
    <div className="subcontractor-template">
      <HeroSection
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        short
        primaryCTA={{ label: 'Download Packet', href: packetDownloadUrl || '#' }}
        secondaryCTA={{ label: 'Contact Us', href: '/contact' }}
      />

      <ContentSection
        heading="Partner With Amazing Hauling"
        content={introContent}
        centered
      />

      <ValueProposition
        heading="Why Work With Amazing Hauling"
        values={benefits}
        columns={2}
        alt
      />

      <ContentSection
        heading="Subcontractor Requirements"
        content={
          <>
            <p>To ensure safe and reliable operations, subcontract drivers working with Amazing Hauling should meet standard industry requirements.</p>
            <p>Typical requirements include:</p>
            <ul className="rich-text">
              {requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
            <p>Additional documentation may be required depending on project requirements.</p>
          </>
        }
      />

      <ContentSection
        heading="Subcontractor Packet"
        content={
          <>
            <p>If you are interested in working with Amazing Hauling, please download and complete our subcontractor packet.</p>
            <p>The packet includes forms and information necessary to begin working with our team.</p>
            <p>After completing the forms, please submit the packet using the email below.</p>
            <p>Email: <a href={`mailto:${contactEmail}`} className="text--gold">{contactEmail}</a></p>
          </>
        }
        alt
      />

      <ContentSection
        heading="Growing Together"
        content={growthContent}
        centered
      />

      <CTABanner
        heading="Interested in Partnering With Us?"
        description="If you would like to work with Amazing Hauling on upcoming projects, download the subcontractor packet and submit your information today."
        primaryLabel="Download Packet"
        primaryHref={packetDownloadUrl || '#'}
        secondaryLabel="Contact Our Team"
        secondaryHref="/contact"
      />
    </div>
  )
}
