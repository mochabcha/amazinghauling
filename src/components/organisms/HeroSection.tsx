'use client'

import React from 'react'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import { StatItem } from '../molecules/StatItem'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface HeroSectionProps {
  badge?: string
  heading: string
  subheading?: string
  description?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  certifications?: string[]
  stats?: Array<{ value: string; label: string }>
  backgroundImage?: string
  short?: boolean
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  heading,
  subheading,
  description,
  primaryCTA = { label: 'Request a Quote', href: '/contact' },
  secondaryCTA,
  certifications,
  stats,
  backgroundImage,
  short = false,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = ['hero', short ? 'hero--short' : '', className].filter(Boolean).join(' ')

  return (
    <section className={classes} ref={ref}>
      <div className="hero__background">
        {backgroundImage && (
          <img src={backgroundImage} alt="" className="hero__background-image" />
        )}
        <div className="hero__background-overlay" />
      </div>
      <div className="hero__inner">
        <div className="hero__content">
          {badge && (
            <div className="hero__badge animate-hero-title">
              <span className="badge badge--white">{badge}</span>
            </div>
          )}
          <h1 className="heading heading--1 heading--white hero__title animate-hero-title">
            {heading}
          </h1>
          {subheading && (
            <p className="heading heading--4 heading--gold hero__subtitle animate-hero-subtitle">
              {subheading}
            </p>
          )}
          {description && (
            <p className="text text--lg text--white hero__description animate-hero-subtitle">
              {description}
            </p>
          )}
          <div className="animate-hero-cta">
            <CTAButtonGroup
              primaryLabel={primaryCTA.label}
              primaryHref={primaryCTA.href}
              secondaryLabel={secondaryCTA?.label}
              secondaryHref={secondaryCTA?.href}
              primaryVariant="primary"
              secondaryVariant="outline-white"
            />
          </div>
          {certifications && certifications.length > 0 && (
            <div className="hero__certifications animate-hero-cta">
              {certifications.map((cert, i) => (
                <span key={i} className="badge badge--white">{cert}</span>
              ))}
            </div>
          )}
        </div>
        {stats && stats.length > 0 && (
          <div className="stats-bar__grid mt-16 animate-on-scroll">
            {stats.map((stat, i) => (
              <StatItem key={i} value={stat.value} label={stat.label} white />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
