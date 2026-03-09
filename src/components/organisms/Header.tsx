'use client'

import React, { useState } from 'react'
import { HeaderBrand } from '../molecules/HeaderBrand'
import { NavLink } from '../molecules/NavLink'
import { HeaderActions } from '../molecules/HeaderActions'
import { MobileMenu } from '../molecules/MobileMenu'

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
        <HeaderBrand src={logoSrc} companyName={companyName} />

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

        <HeaderActions
          phone={phone}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          mobileOpen={mobileOpen}
          onMobileToggle={() => setMobileOpen(!mobileOpen)}
        />
      </div>

      <MobileMenu
        navItems={navItems}
        isOpen={mobileOpen}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        phone={phone}
      />
    </header>
  )
}
