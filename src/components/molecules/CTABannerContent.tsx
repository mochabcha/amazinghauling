import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { CTAButtonGroup } from './CTAButtonGroup'
import { ImagePlaceholder } from './ImagePlaceholder'

export interface CTABannerContentProps {
  heading: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export const CTABannerContent: React.FC<CTABannerContentProps> = ({
  heading,
  description,
  primaryLabel = 'Contact Amazing Hauling Today',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  imageSrc,
  imageAlt,
  className = '',
}) => {
  const classes = ['cta-banner__inner animate-on-scroll', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="cta-banner__split">
        <div className="cta-banner__text anim-reveal">
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
            primaryVariant="primary"
            secondaryVariant="outline-white"
          />
        </div>
        <div className="cta-banner__media anim-clip-right">
          <ImagePlaceholder
            src={imageSrc}
            alt={imageAlt || heading}
            label=""
            fill
            gradient="warm"
          />
        </div>
      </div>
    </div>
  )
}
