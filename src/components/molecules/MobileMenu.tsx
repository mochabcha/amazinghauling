import React from 'react'
import { NavLink } from './NavLink'
import { CTAButtonGroup } from './CTAButtonGroup'

export interface MobileMenuProps {
  navItems: Array<{ label: string; href: string }>
  isOpen?: boolean
  ctaLabel?: string
  ctaHref?: string
  phone?: string
  className?: string
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems,
  isOpen = false,
  ctaLabel = 'Request a Quote',
  ctaHref = '/contact',
  phone,
  className = '',
}) => {
  const classes = [
    'header__mobile-menu',
    isOpen ? 'is-open' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {navItems.map((item, index) => (
        <NavLink key={index} label={item.label} href={item.href} />
      ))}
      <CTAButtonGroup
        primaryLabel={ctaLabel}
        primaryHref={ctaHref}
        secondaryLabel={phone ? `Call ${phone}` : undefined}
        secondaryHref={phone ? `tel:${phone}` : undefined}
      />
    </div>
  )
}
