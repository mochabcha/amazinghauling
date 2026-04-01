'use client'

import React from 'react'
import { FooterColumn } from '../molecules/FooterColumn'
import { FooterBrand } from '../molecules/FooterBrand'
import { FooterContact } from '../molecules/FooterContact'
import { FooterBottom } from '../molecules/FooterBottom'
import { SectionHeader } from '../molecules/SectionHeader'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import { ContentBody } from '../molecules/ContentBody'
import type { FooterLink } from '../molecules/FooterColumn'

export interface FooterProps {
  companyName?: string
  logoSrc?: string
  tagline?: string
  description?: string
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
  tagline = 'Dump Truck & Materials Hauling Services',
  description = 'Serving Duval, Clay, Nassau, and St. Johns Counties',
  columns = [],
  contactInfo,
  certifications = 'Licensed & Insured',
  copyright = '© 2026 Amazing Hauling of North Florida. All Rights Reserved.',
  className = '',
}) => {
  const classes = ['footer', className].filter(Boolean).join(' ')

  return (
    <footer className={classes}>
      <div className="footer__cta">
        <div className="footer__cta-left">
          <SectionHeader
            heading="Let's Haul Together"
            headingLevel={2}
            light
          />
          <CTAButtonGroup
            primaryLabel="View Our Services"
            primaryHref="/services"
            secondaryLabel="Contact Us"
            secondaryHref="/contact"
            primaryVariant="primary"
            secondaryVariant="outline-white"
          />
        </div>
        <div className="footer__cta-right">
          <ContentBody light>
            {null}
          </ContentBody>
          <CTAButtonGroup
            primaryLabel="Contact Us"
            primaryHref="/contact"
            primaryVariant="primary"
            centered
          />
        </div>
      </div>

      <div className="footer__inner">
        <div className="footer__grid">
          <FooterBrand
            companyName={companyName}
            logoSrc={logoSrc}
            tagline={tagline}
            description={description}
            certifications={certifications}
          />

          {columns.map((col, index) => (
            <FooterColumn key={index} title={col.title} links={col.links} />
          ))}
        </div>

        {contactInfo && (
          <FooterContact
            address={contactInfo.address}
            phone={contactInfo.phone}
            email={contactInfo.email}
            hours={contactInfo.hours}
          />
        )}

        <FooterBottom copyright={copyright} />
      </div>
    </footer>
  )
}
