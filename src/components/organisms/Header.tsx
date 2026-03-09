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
        <HeaderBrand src={logoSrc} companyName={companyName} />
        <NavBar navItems={navItems} />
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
