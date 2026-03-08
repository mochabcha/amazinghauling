'use client'

import React from 'react'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
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
        {backgroundImage && (
          <img src={backgroundImage} alt="" className="img img--cover" />
        )}
        <div className="hero__bg-overlay" />
      </div>
      <div className="hero__inner">
        <div className="hero__content">
          {badge && (
            <div className="anim-hero-badge mb-6">
              <span className="text text--label text--orange">{badge}</span>
            </div>
          )}
          <h1 className="heading heading--1 heading--white mb-8">
            {lines.map((line, i) => (
              <span key={i} className={`block anim-hero-line-${Math.min(i + 1, 3)}`}>
                {line}
              </span>
            ))}
          </h1>
          {description && (
            <p className="text text--md text--cream anim-hero-body mb-8" style={{ maxWidth: '600px' }}>
              {description}
            </p>
          )}
          <div className="anim-hero-cta">
            <CTAButtonGroup
              primaryLabel={primaryCTA.label}
              primaryHref={primaryCTA.href}
              secondaryLabel={secondaryCTA?.label}
              secondaryHref={secondaryCTA?.href}
              primaryVariant="primary"
              secondaryVariant="outline-white"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
