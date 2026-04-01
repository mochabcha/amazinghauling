import React from 'react'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Logo } from '../atoms/Logo'
import { Text } from '../atoms/Text'
import { NavLink } from './NavLink'
import { CTAButtonGroup } from './CTAButtonGroup'

export interface MobileMenuProps {
  navItems: Array<{ label: string; href: string }>
  isOpen?: boolean
  logoSrc?: string
  companyName?: string
  ctaLabel?: string
  ctaHref?: string
  phone?: string
  onClose?: () => void
  className?: string
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems,
  isOpen = false,
  logoSrc,
  companyName = 'Amazing Hauling',
  ctaLabel = 'Request a Quote',
  ctaHref = '/contact',
  phone,
  onClose,
  className = '',
}) => {
  const handleActionClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('a,button')) onClose?.()
  }

  const classes = [
    'header__mobile-menu',
    isOpen ? 'is-open' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} aria-hidden={!isOpen}>
      <button
        type="button"
        className="header__mobile-backdrop"
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <div className="header__mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="header__mobile-header">
          <div className="header__mobile-brand">
            <Logo
              src={logoSrc}
              companyName={companyName}
              size="lg"
              white
              href="/"
              showText={!logoSrc}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            className="header__mobile-close"
            onClick={onClose}
            icon={<Icon name="X" size="md" color="white" />}
          >
            <Text as="span" color="white" size="xs" uppercase>
              Close
            </Text>
          </Button>
        </div>
        <div className="header__mobile-links">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              label={item.label}
              href={item.href}
              onClick={onClose}
              className="header__mobile-link"
            />
          ))}
        </div>
        <div className="header__mobile-cta" onClick={handleActionClick}>
          <CTAButtonGroup
            primaryLabel={ctaLabel}
            primaryHref={ctaHref}
            secondaryLabel={phone ? `Call ${phone}` : undefined}
            secondaryHref={phone ? `tel:${phone}` : undefined}
          />
        </div>
      </div>
    </div>
  )
}
