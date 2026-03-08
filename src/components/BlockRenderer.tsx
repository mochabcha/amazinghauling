'use client'

import React from 'react'
import { HeroSection } from './organisms/HeroSection'
import { ContentSection } from './organisms/ContentSection'
import { ServicesGrid } from './organisms/ServicesGrid'
import { StatsBar } from './organisms/StatsBar'
import { ProjectShowcase } from './organisms/ProjectShowcase'
import { ValueProposition } from './organisms/ValueProposition'
import { CTABanner } from './organisms/CTABanner'
import { FleetSection } from './organisms/FleetSection'
import { ServiceAreasList } from './organisms/ServiceAreasList'
import { QuoteRequestForm } from './organisms/QuoteRequestForm'

interface BlockData {
  blockType: string
  id?: string
  [key: string]: unknown
}

interface BlockRendererProps {
  blocks: BlockData[]
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="block-renderer">
      {blocks.map((block, index) => {
        const key = block.id || `block-${index}`

        switch (block.blockType) {
          case 'hero':
            return (
              <HeroSection
                key={key}
                badge={block.badge as string}
                heading={[
                  block.headingLine1 as string,
                  block.headingLine2 as string,
                  block.headingLine3 as string,
                ].filter(Boolean).join('\n')}
                headingLines={[
                  block.headingLine1 as string,
                  block.headingLine2 as string,
                  block.headingLine3 as string,
                ].filter(Boolean)}
                description={block.description as string}
                primaryCTA={block.primaryCta ? { label: block.primaryCta as string, href: block.primaryCtaLink as string || '/contact' } : undefined}
                secondaryCTA={block.secondaryCta ? { label: block.secondaryCta as string, href: block.secondaryCtaLink as string || '#' } : undefined}
                short={block.short as boolean}
              />
            )

          case 'contentSplit': {
            const bg = block.background as string
            return (
              <ContentSection
                key={key}
                badge={block.badge as string}
                heading={block.heading as string}
                content={block.body as string}
                ctaLabel={block.ctaLabel as string}
                ctaHref={block.ctaLink as string}
                reverse={block.reverse as boolean}
                overlap={block.overlap as boolean}
                dark={bg === 'black'}
                alt={bg === 'cream'}
              />
            )
          }

          case 'textBlock': {
            const bg = block.background as string
            const badgeText = block.badge as string | undefined
            const headingText = block.heading as string | undefined
            const bodyText = block.body as string | undefined
            const ctaLabelText = block.ctaLabel as string | undefined
            const ctaLinkText = block.ctaLink as string | undefined
            const isCentered = block.centered as boolean
            return (
              <section key={key} className={`section ${bg === 'black' ? 'section--black' : bg === 'cream' ? 'section--cream' : bg === 'offWhite' ? 'section--off-white' : 'section--white'}`}>
                <div className={`container ${isCentered ? 'text-center' : ''}`}>
                  <div className={`${isCentered ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
                    {badgeText && <p className="text text--label text--orange mb-4">{badgeText}</p>}
                    {headingText && <h2 className={`heading heading--3 ${bg === 'black' ? 'heading--white' : ''} mb-6`}>{headingText}</h2>}
                    {bodyText && <p className={`text text--md ${bg === 'black' ? 'text--cream' : ''}`}>{bodyText}</p>}
                    {ctaLabelText && (
                      <div className="mt-8">
                        <a href={ctaLinkText || '#'} className={`btn ${bg === 'black' ? 'btn--primary' : 'btn--outline'}`}>
                          {ctaLabelText}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          case 'valuesGrid': {
            const items = (block.items as Array<{ icon?: string; title?: string; description?: string }>) || []
            const bg = block.background as string
            return (
              <div key={key} className={bg === 'cream' ? 'section--cream' : ''}>
                <ValueProposition
                  heading={block.heading as string}
                  description={block.description as string}
                  values={items.map((item) => ({
                    title: item.title || '',
                    description: item.description || '',
                    iconName: item.icon,
                  }))}
                  columns={(parseInt(block.columns as string || '3', 10) as 2 | 3) || 3}
                  alt={bg === 'cream'}
                />
              </div>
            )
          }

          case 'statsBar': {
            const items = (block.items as Array<{ value?: string; label?: string }>) || []
            return (
              <StatsBar
                key={key}
                stats={items.map((item) => ({ value: item.value || '', label: item.label || '' }))}
              />
            )
          }

          case 'serviceCards': {
            const items = (block.items as Array<{ icon?: string; title?: string; description?: string; bulletPoints?: Array<{ item?: string }> }>) || []
            return (
              <ServicesGrid
                key={key}
                heading={block.heading as string}
                description={block.description as string}
                services={items.map((item) => ({
                  title: item.title || '',
                  description: item.description || '',
                  iconName: item.icon,
                  items: item.bulletPoints?.map((bp) => bp.item || ''),
                }))}
              />
            )
          }

          case 'projectGrid': {
            const items = (block.items as Array<{ title?: string; category?: string; location?: string; description?: string; services?: Array<{ service?: string }> }>) || []
            return (
              <ProjectShowcase
                key={key}
                heading={block.heading as string}
                projects={items.map((item) => ({
                  title: item.title || '',
                  category: item.category || '',
                  location: item.location,
                  description: item.description,
                  services: item.services?.map((s) => s.service || ''),
                }))}
              />
            )
          }

          case 'ctaBanner':
            return (
              <CTABanner
                key={key}
                heading={block.heading as string}
                description={block.description as string}
                primaryLabel={block.primaryCta as string}
                primaryHref={block.primaryCtaLink as string}
                secondaryLabel={block.secondaryCta as string}
                secondaryHref={block.secondaryCtaLink as string}
              />
            )

          case 'areaCards': {
            const items = (block.items as Array<{ name?: string; description?: string; services?: Array<{ service?: string }> }>) || []
            const additionalAreas = (block.additionalAreas as Array<{ name?: string }>) || []
            return (
              <ServiceAreasList
                key={key}
                heading={block.heading as string}
                description={block.description as string}
                areas={items.map((item) => ({
                  name: item.name || '',
                  description: item.description,
                  services: item.services?.map((s) => s.service || ''),
                }))}
                additionalAreas={additionalAreas.map((a) => a.name || '')}
              />
            )
          }

          case 'quoteForm':
            return (
              <QuoteRequestForm
                key={key}
                heading={block.heading as string}
                description={block.description as string}
              />
            )

          case 'fleet': {
            const metrics = (block.metrics as Array<{ icon?: string; value?: string; label?: string }>) || []
            return (
              <FleetSection
                key={key}
                heading={block.heading as string}
                description={block.body as string}
                metrics={metrics.map((m) => ({
                  iconName: m.icon || 'Truck',
                  value: m.value || '',
                  label: m.label || '',
                }))}
              />
            )
          }

          default:
            return null
        }
      })}
    </div>
  )
}
