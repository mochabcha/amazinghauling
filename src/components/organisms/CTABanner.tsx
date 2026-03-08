'use client'

import React from 'react'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
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
    <section className={classes} ref={ref}>
      <div className="cta-banner__inner animate-on-scroll">
        <h2 className="heading heading--2 heading--white cta-banner__title">{heading}</h2>
        <p className="text text--xl cta-banner__description" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {description}
        </p>
        <CTAButtonGroup
          primaryLabel={primaryLabel}
          primaryHref={primaryHref}
          secondaryLabel={secondaryLabel}
          secondaryHref={secondaryHref}
          centered
          primaryVariant="primary"
          secondaryVariant="outline-white"
        />
      </div>
    </section>
  )
}
