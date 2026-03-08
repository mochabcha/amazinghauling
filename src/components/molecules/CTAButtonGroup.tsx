import React from 'react'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'

export interface CTAButtonGroupProps {
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  primaryVariant?: 'primary' | 'secondary' | 'outline' | 'outline-white'
  secondaryVariant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
  className?: string
}

export const CTAButtonGroup: React.FC<CTAButtonGroupProps> = ({
  primaryLabel = 'Request a Quote',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  primaryVariant = 'primary',
  secondaryVariant = 'outline',
  size = 'md',
  centered = false,
  className = '',
}) => {
  const classes = [
    'cta-group',
    centered ? 'cta-group--center' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <Button
        variant={primaryVariant}
        size={size}
        href={primaryHref}
        icon={<Icon name="ArrowRight" size="sm" />}
        iconPosition="right"
      >
        {primaryLabel}
      </Button>
      {secondaryLabel && secondaryHref && (
        <Button
          variant={secondaryVariant}
          size={size}
          href={secondaryHref}
        >
          {secondaryLabel}
        </Button>
      )}
    </div>
  )
}
