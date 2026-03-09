'use client'

import React from 'react'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { SectionHeader } from '../molecules/SectionHeader'
import { ContentBody } from '../molecules/ContentBody'
import { ContentSplitBody } from '../molecules/ContentSplitBody'
import { SplitLayout } from '../molecules/SplitLayout'
import { ImagePlaceholder } from '../molecules/ImagePlaceholder'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface ContentSectionProps {
  badge?: string
  heading: string
  content: string | React.ReactNode
  imageSrc?: string
  imageAlt?: string
  reverse?: boolean
  overlap?: boolean
  centered?: boolean
  alt?: boolean
  dark?: boolean
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  badge,
  heading,
  content,
  imageSrc,
  imageAlt,
  reverse = false,
  overlap = true,
  centered = false,
  alt = false,
  dark = false,
  ctaLabel,
  ctaHref,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const bg = dark ? 'black' : alt ? 'cream' : 'white'
  const resolvedContent = typeof content === 'string' ? <>{content}</> : content

  if (centered) {
    return (
      <SectionWrapper background={bg} className={className} ref={ref}>
        <div className="max-w-3xl mx-auto text-center anim-reveal">
          <SectionHeader
            badge={badge}
            heading={heading}
            headingLevel={3}
            centered
            light={dark}
          />
          <ContentBody light={dark} ctaLabel={ctaLabel} ctaHref={ctaHref} ctaVariant={dark ? 'primary' : 'outline'}>
            {resolvedContent}
          </ContentBody>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper background={bg} noPadTop noPadBottom noContainer className={className} ref={ref}>
      <SplitLayout
        reverse={reverse}
        overlap={overlap}
        dark={dark}
        media={<ImagePlaceholder src={imageSrc} alt={imageAlt || heading} label="Section Image" gradient={dark ? 'warm' : 'primary'} />}
        body={
          <ContentSplitBody
            badge={badge}
            heading={heading}
            dark={dark}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
          >
            {resolvedContent}
          </ContentSplitBody>
        }
      />
    </SectionWrapper>
  )
}
