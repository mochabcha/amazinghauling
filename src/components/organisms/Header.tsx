'use client'

import React, { useState } from 'react'
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
        <a href="/" className="logo">
          {logoSrc && (
            <img src={logoSrc} alt={companyName} className="logo__image" />
          )}
          <span className="logo__text">{companyName}</span>
        </a>

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
            <a href={`tel:${phone}`} className="header__phone">
              <span className="icon icon--sm icon--navy">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              {phone}
            </a>
          )}
          <CTAButtonGroup
            primaryLabel={ctaLabel}
            primaryHref={ctaHref}
            size="sm"
          />
          <button
            className="header__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
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
