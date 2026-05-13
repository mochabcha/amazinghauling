import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { CTAButtonGroup } from './CTAButtonGroup'

export interface HeroCTA {
  label: string
  href: string
}

export interface HeroContentProps {
  badge?: string
  headingLines: string[]
  description?: string
  primaryCTA?: HeroCTA
  secondaryCTA?: HeroCTA
  layout?: 'standard' | 'cornerMinimal'
  headingSize?: 'default' | 'small'
  hideCtas?: boolean
  className?: string
}

export const HeroContent: React.FC<HeroContentProps> = ({
  badge,
  headingLines,
  description,
  primaryCTA = { label: 'Request a Quote', href: '/contact' },
  secondaryCTA,
  layout = 'standard',
  headingSize = 'default',
  hideCtas = false,
  className = '',
}) => {
  const classes = [
    'hero__content',
    layout === 'cornerMinimal' ? 'hero__content--corner-minimal' : '',
    headingSize === 'small' ? 'hero__content--heading-small' : '',
    className,
  ].filter(Boolean).join(' ')
  const showCtas = !hideCtas && (primaryCTA || secondaryCTA)

  return (
    <div className={classes}>
      {badge && (
        <div className="anim-hero-badge mb-6">
          <Text as="span" size="xs" color="orange" uppercase>{badge}</Text>
        </div>
      )}
      <Heading level={1} color="white" className="mb-8">
        {headingLines.map((line, i) => (
          <Text key={i} as="span" noBase className={`block anim-hero-line-${Math.min(i + 1, 3)}`}>
            {line}
          </Text>
        ))}
      </Heading>
      {description && (
        <Text as="p" size="md" color="cream" className="anim-hero-body mb-8" style={{ maxWidth: '600px' }}>
          {description}
        </Text>
      )}
      {showCtas ? (
        <div className="anim-hero-cta">
          <CTAButtonGroup
            primaryLabel={primaryCTA?.label}
            primaryHref={primaryCTA?.href}
            secondaryLabel={secondaryCTA?.label}
            secondaryHref={secondaryCTA?.href}
            primaryVariant="primary"
            secondaryVariant="outline-white"
          />
        </div>
      ) : null}
    </div>
  )
}
