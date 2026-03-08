'use client'

import React from 'react'
import { FooterColumn } from '../molecules/FooterColumn'
import { ContactInfoItem } from '../molecules/ContactInfoItem'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import type { FooterLink } from '../molecules/FooterColumn'

export interface FooterProps {
  companyName?: string
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
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="logo">
              <span className="logo__text logo__text--white">{companyName}</span>
            </a>
            <p className="text text--base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {tagline}
            </p>
            <p className="footer__brand-description">{description}</p>
            <div className="footer__certifications">
              <span className="badge badge--gold">{certifications}</span>
            </div>
          </div>

          {columns.map((col, index) => (
            <FooterColumn key={index} title={col.title} links={col.links} />
          ))}
        </div>

        {contactInfo && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-white/10">
            {contactInfo.address && (
              <ContactInfoItem iconName="MapPin" label="Location" value={contactInfo.address} />
            )}
            {contactInfo.phone && (
              <ContactInfoItem iconName="Phone" label="Phone" value={contactInfo.phone} href={`tel:${contactInfo.phone}`} />
            )}
            {contactInfo.email && (
              <ContactInfoItem iconName="Mail" label="Email" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
            )}
            {contactInfo.hours && (
              <ContactInfoItem iconName="Clock" label="Hours" value={contactInfo.hours} />
            )}
          </div>
        )}

        <div className="cta-banner py-12 border-b border-white/10" style={{ background: 'transparent', padding: '3rem 0' }}>
          <div className="text-center">
            <h3 className="heading heading--3 heading--white mb-4">Let&apos;s Build Together</h3>
            <p className="text text--lg text--white mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Ready to start your next project? Contact us today.
            </p>
            <CTAButtonGroup
              primaryLabel="Request a Quote"
              primaryHref="/contact"
              secondaryLabel="Call Now"
              secondaryHref={contactInfo?.phone ? `tel:${contactInfo.phone}` : '#'}
              centered
              primaryVariant="primary"
              secondaryVariant="outline-white"
            />
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">{copyright}</p>
          <div className="flex gap-4">
            <a href="/privacy" className="text text--sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
