'use client'

import React from 'react'
import { HeroShell } from '../molecules/HeroShell'
import { HeroContent } from '../molecules/HeroContent'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface HeroSectionProps {
  badge?: string
  heading: string
  headingLines?: string[]
  description?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  backgroundImage?: string
  layout?: 'standard' | 'cornerMinimal'
  overlayStyle?: 'default' | 'soft' | 'none'
  headingSize?: 'default' | 'small'
  hideCtas?: boolean
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
  layout = 'standard',
  overlayStyle = 'default',
  headingSize = 'default',
  hideCtas = false,
  short = false,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const lines = headingLines && headingLines.length > 0 ? headingLines : [heading]

  return (
    <HeroShell
      backgroundImage={backgroundImage}
      backgroundGradient="primary"
      layout={layout}
      overlayStyle={overlayStyle}
      short={short}
      className={className}
      innerRef={ref}
    >
      <HeroContent
        badge={badge}
        headingLines={lines}
        description={description}
        primaryCTA={primaryCTA}
        secondaryCTA={secondaryCTA}
        layout={layout}
        headingSize={headingSize}
        hideCtas={hideCtas}
      />
    </HeroShell>
  )
}
