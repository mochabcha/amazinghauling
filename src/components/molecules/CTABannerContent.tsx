import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { CTAButtonGroup } from './CTAButtonGroup'

export interface CTABannerContentProps {
  heading: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  className?: string
}

export const CTABannerContent: React.FC<CTABannerContentProps> = ({
  heading,
  description,
  primaryLabel = 'Contact Amazing Hauling Today',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  className = '',
}) => {
  const classes = ['cta-banner__inner animate-on-scroll', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Heading level={2} color="white" className="cta-banner__title">{heading}</Heading>
      {description && (
        <Text size="xl" className="cta-banner__description" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {description}
        </Text>
      )}
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
  )
}
