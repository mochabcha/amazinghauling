'use client'

import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Container } from '../atoms/Container'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
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
        <ImagePlaceholder src={backgroundImage} label="" alt="" minHeight="100%" />
        <div className="hero__bg-overlay" />
      </div>
      <Container className="hero__inner">
        <div className="hero__content">
          {badge && (
            <div className="anim-hero-badge mb-6">
              <Text as="span" size="xs" color="orange" uppercase>{badge}</Text>
            </div>
          )}
          <Heading level={1} color="white" className="mb-8">
            {lines.map((line, i) => (
              <Text key={i} as="span" className={`block anim-hero-line-${Math.min(i + 1, 3)}`}>
                {line}
              </Text>
            ))}
          </Heading>
          {description && (
            <Text as="p" size="md" color="cream" className="anim-hero-body mb-8" style={{ maxWidth: '600px' }}>
              {description}
            </Text>
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
      </Container>
    </section>
  )
}
