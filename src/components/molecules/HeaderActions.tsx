import React from 'react'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'
import { CTAButtonGroup } from './CTAButtonGroup'

export interface HeaderActionsProps {
  phone?: string
  ctaLabel?: string
  ctaHref?: string
  mobileOpen?: boolean
  onMobileToggle?: () => void
  className?: string
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  phone,
  ctaLabel = 'Request a Quote',
  ctaHref = '/contact',
  mobileOpen = false,
  onMobileToggle,
  className = '',
}) => {
  const classes = ['header__actions', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {phone && (
        <Button
          variant="ghost"
          href={`tel:${phone}`}
          className="header__phone"
          icon={<Icon name="Phone" size="sm" color="white" />}
        >
          <Text as="span" size="xs" color="white" uppercase>{phone}</Text>
        </Button>
      )}
      <CTAButtonGroup
        primaryLabel={ctaLabel}
        primaryHref={ctaHref}
        size="sm"
      />
      <Button
        variant="ghost"
        className="header__mobile-toggle"
        onClick={onMobileToggle}
        icon={<Icon name={mobileOpen ? 'X' : 'Menu'} size="md" color="white" />}
      >
        <Text as="span" className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</Text>
      </Button>
    </div>
  )
}
