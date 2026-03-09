'use client'

import React from 'react'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { CTABannerContent } from '../molecules/CTABannerContent'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface CTABannerProps {
  heading?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  className?: string
}

export const CTABanner: React.FC<CTABannerProps> = ({
  heading = 'Amazing Service Starts Here',
  description = 'Reliable hauling makes the difference between delays and progress. Partner with a company that shows up ready to work.',
  primaryLabel = 'Contact Amazing Hauling Today',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = ['cta-banner', className].filter(Boolean).join(' ')

  return (
    <SectionWrapper className={classes} ref={ref} noContainer background="black">
      <CTABannerContent
        heading={heading}
        description={description}
        primaryLabel={primaryLabel}
        primaryHref={primaryHref}
        secondaryLabel={secondaryLabel}
        secondaryHref={secondaryHref}
      />
    </SectionWrapper>
  )
}
