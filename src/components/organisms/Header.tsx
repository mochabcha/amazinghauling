'use client'

import React, { useState } from 'react'
import { Logo } from '../atoms/Logo'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { NavLink } from '../molecules/NavLink'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'

export interface HeaderNavItem {
  label: string
  href: string
  children?: Array<{ label: string; href: string; description?: string }>
}

export interface HeaderProps {
  logoSrc?: string
  companyName?: string
  navItems?: HeaderNavItem[]
  ctaLabel?: string
  ctaHref?: string
  phone?: string
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  logoSrc,
  companyName = 'Amazing Hauling',
  navItems = [],
  ctaLabel = 'Request a Quote',
  ctaHref = '/contact',
  phone,
  className = '',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = ['header', className].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div className="header__inner">
        <Logo src={logoSrc} companyName={companyName} white href="/" />

        <nav className="header__nav">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              label={item.label}
              href={item.href}
              hasDropdown={!!item.children?.length}
            />
          ))}
        </nav>

        <div className="header__actions">
          {phone && (
            <Button variant="ghost" href={`tel:${phone}`} className="header__phone" icon={<Icon name="Phone" size="sm" color="white" />}>
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
            onClick={() => setMobileOpen(!mobileOpen)}
            icon={<Icon name={mobileOpen ? 'X' : 'Menu'} size="md" color="white" />}
          >
            <Text as="span" className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</Text>
          </Button>
        </div>
      </div>

      <div className={`header__mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
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
    </header>
  )
}
