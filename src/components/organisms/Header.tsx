'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
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
  const pathname = usePathname()
  const splitIndex = Math.ceil(navItems.length / 2)
  const leftNavItems = navItems.slice(0, splitIndex)
  const rightNavItems = navItems.slice(splitIndex)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = ''
      return
    }

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 1024) setMobileOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [mobileOpen])

  const classes = ['header', scrolled ? 'header--solid' : '', className].filter(Boolean).join(' ')

  return (
    <>
      <header className={classes}>
        <div className="header__inner">
          <NavBar navItems={leftNavItems} className="header__nav header__nav--left" />
          <HeaderBrand src={logoSrc} companyName={companyName} size="xl" className="header__brand" showText={false} white={false} />
          <NavBar navItems={rightNavItems} className="header__nav header__nav--right" />
          <HeaderActions
            phone={phone}
            mobileOpen={mobileOpen}
            onMobileToggle={() => setMobileOpen(!mobileOpen)}
            className="header__actions header__actions--desktop"
          />
        </div>
      </header>
      <MobileMenu
        navItems={navItems}
        isOpen={mobileOpen}
        logoSrc={logoSrc}
        companyName={companyName}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        phone={phone}
        onClose={() => setMobileOpen(false)}
      />
      <Button
        href={ctaHref}
        className="header__fab"
        icon={<Icon name="FileText" size="md" color="white" />}
      >
        <span className="sr-only">{ctaLabel}</span>
      </Button>
    </>
  )
}
