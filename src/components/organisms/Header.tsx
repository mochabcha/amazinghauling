'use client'

import React, { useState, useEffect } from 'react'
import { HeaderBrand } from '../molecules/HeaderBrand'
import { NavBar } from '../molecules/NavBar'
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
  const [scrolled, setScrolled] = useState(false)
  const splitIndex = Math.ceil(navItems.length / 2)
  const leftNavItems = navItems.slice(0, splitIndex)
  const rightNavItems = navItems.slice(splitIndex)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const classes = ['header', scrolled ? 'header--solid' : '', className].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div className="header__inner">
        <NavBar navItems={leftNavItems} className="header__nav header__nav--left" />
        <HeaderBrand src={logoSrc} companyName={companyName} className="header__brand" showText={false} />
        <NavBar navItems={rightNavItems} className="header__nav header__nav--right" />
        <HeaderActions
          phone={phone}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          mobileOpen={mobileOpen}
          onMobileToggle={() => setMobileOpen(!mobileOpen)}
          className="header__actions header__actions--desktop"
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
