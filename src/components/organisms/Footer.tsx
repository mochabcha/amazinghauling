'use client'

import React from 'react'
import { FooterColumn } from '../molecules/FooterColumn'
import { SectionHeader } from '../molecules/SectionHeader'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import type { FooterLink } from '../molecules/FooterColumn'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Logo } from '../atoms/Logo'
import { Badge } from '../atoms/Badge'

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
          <Text size="xs" color="gray" uppercase>Need to reach us?</Text>
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
          <div className="footer__brand">
            <Logo companyName={companyName} white href="/" />
            <Text size="sm" color="gray">{tagline}</Text>
            <Text size="sm" className="footer__brand-description">{description}</Text>
            <Badge variant="orange">{certifications}</Badge>
            <div className="footer__social">
              <Text as="span" size="sm" color="gray">Follow Us</Text>
            </div>
          </div>

          {columns.map((col, index) => (
            <FooterColumn key={index} title={col.title} links={col.links} />
          ))}
        </div>

        {contactInfo && (
          <div className="footer__grid" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="footer__brand">
              <Heading level={6} color="white" className="mb-2">Contact</Heading>
              {contactInfo.address && <Text size="sm" color="gray">{contactInfo.address}</Text>}
              {contactInfo.hours && <Text size="sm" color="gray">{contactInfo.hours}</Text>}
            </div>
            <div>
              {contactInfo.phone && (
                <Text size="sm"><a href={`tel:${contactInfo.phone}`} className="footer-column__link">{contactInfo.phone}</a></Text>
              )}
              {contactInfo.email && (
                <Text size="sm"><a href={`mailto:${contactInfo.email}`} className="footer-column__link">{contactInfo.email}</a></Text>
              )}
            </div>
          </div>
        )}

        <div className="footer__bottom">
          <Text as="span" size="xs" color="gray">{copyright}</Text>
          <Text as="span" size="xs"><a href="/privacy" className="footer-column__link">Privacy Policy</a></Text>
        </div>
      </div>
    </footer>
  )
}
