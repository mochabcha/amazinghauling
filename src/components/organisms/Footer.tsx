'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import { FooterColumn } from '../molecules/FooterColumn'
import { FooterBrand } from '../molecules/FooterBrand'
import { FooterContact } from '../molecules/FooterContact'
import { FooterBottom } from '../molecules/FooterBottom'
import { ActionPathPanel } from '../molecules/ActionPathPanel'
import { Logo } from '../atoms/Logo'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import type { FooterLink } from '../molecules/FooterColumn'

export interface FooterProps {
  companyName?: string
  logoSrc?: string
  tagline?: string
  description?: string
  ctaImageSrc?: string
  ctaImageAlt?: string
  columns?: Array<{ title: string; links: FooterLink[] }>
  contactInfo?: {
    address?: string
    phone?: string
    email?: string
    hours?: string
  }
  certifications?: string
  copyright?: string
  className?: string
}

export const Footer: React.FC<FooterProps> = ({
  companyName = 'Amazing Hauling of North Florida',
  logoSrc,
  tagline = 'Dump Trucks & Material Hauling Services',
  description = 'Serving Duval, Clay, Nassau, and St. Johns Counties',
  ctaImageSrc,
  ctaImageAlt,
  columns = [],
  contactInfo,
  certifications = 'Licensed & Insured',
  copyright = '© 2026 Amazing Hauling of North Florida. All Rights Reserved.',
  className = '',
}) => {
  const classes = ['footer', className].filter(Boolean).join(' ')
  const ctaRef = useScrollAnimation()
  const pathname = usePathname()
  const hidePrefooter = pathname === '/contact' || pathname === '/work-with-us'

  return (
    <footer className={classes}>
      {!hidePrefooter && (
        <div ref={ctaRef} className="footer__cta">
          <div className="footer__cta-header">
            <Heading level={2} color="white">Choose Your Next Step</Heading>
            <Text size="lg" color="cream" className="footer__cta-description">
              Whether you need dependable hauling support or want to join the Amazing Hauling team, start in the right place.
            </Text>
          </div>
          <div className="footer__cta-grid">
            <ActionPathPanel
              eyebrow="For Contractors"
              title="Request a Quote"
              description="Tell us about your project and get hauling support lined up quickly."
              ctaLabel="Request a Quote"
              ctaHref="/contact"
              emphasized
              className="animate-on-scroll"
            />
            <ActionPathPanel
              eyebrow="For Drivers & Owner-Operators"
              title="Work With Us"
              description="Apply as a company driver or lease on your truck for review by our team."
              ctaLabel="View Application"
              ctaHref="/work-with-us"
              className="animate-on-scroll"
            />
          </div>
        </div>
      )}

      <div className="footer__inner">
        <div className="footer__logo-row">
          <Logo
            src={logoSrc}
            companyName={companyName}
            white
            href="/"
            size="xl"
            className="footer__logo"
          />

          <FooterBrand
            tagline={tagline}
            certifications={certifications}
            className="footer__logo-copy"
          />
        </div>

        <div className="footer__grid">
          <div className="footer__primary">
            {contactInfo && (
              <FooterContact
                address={contactInfo.address}
                phone={contactInfo.phone}
                email={contactInfo.email}
                hours={contactInfo.hours}
              />
            )}
          </div>

          {columns.map((col, index) => (
            <FooterColumn key={index} title={col.title} links={col.links} />
          ))}
        </div>

        <FooterBottom description={description} copyright={copyright} />
      </div>
    </footer>
  )
}
