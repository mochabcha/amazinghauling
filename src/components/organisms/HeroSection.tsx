'use client'

import React from 'react'
import { HeroContent } from '../molecules/HeroContent'
import { ImagePlaceholder } from '../molecules/ImagePlaceholder'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface HeroSectionProps {
  badge?: string
  heading: string
  headingLines?: string[]
  description?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  backgroundImage?: string
  short?: boolean
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  heading,
  headingLines,
  description,
  primaryCTA = { label: 'Request a Quote', href: '/contact' },
  secondaryCTA,
  backgroundImage,
  short = false,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = ['hero', short ? 'hero--short' : '', className].filter(Boolean).join(' ')
  const lines = headingLines && headingLines.length > 0 ? headingLines : [heading]

  return (
    <section className={classes} ref={ref}>
      <div className="hero__bg">
        <ImagePlaceholder src={backgroundImage} label="" alt="" minHeight="100%" gradient="hero" />
        <div className="hero__bg-overlay" />
      </div>
      <div className="container hero__inner">
        <HeroContent
          badge={badge}
          headingLines={lines}
          description={description}
          primaryCTA={primaryCTA}
          secondaryCTA={secondaryCTA}
        />
      </div>
    </section>
  )
}
