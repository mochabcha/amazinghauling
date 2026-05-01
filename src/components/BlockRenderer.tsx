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
import { resolveMediaAlt, resolveMediaUrl } from '@/lib/media'

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
            {
              const headingLine1 = block.headingLine1 === 'Reliable Dump Truck'
                ? 'Reliable Dump Trucks'
                : block.headingLine1 as string
              const headingLine2 = block.headingLine2 === '& Materials Hauling'
                ? '& Material Hauling'
                : block.headingLine2 as string
              const headingLine3 = block.headingLine3 as string
              const description = block.badge === 'Amazing Hauling of North Florida'
                ? 'When contractors need dependable hauling, they call Amazing. Amazing Hauling provides responsive, professional hauling support for construction companies, road crews, and development teams throughout Northeast Florida.'
                : block.description as string

            return (
              <HeroSection
                key={key}
                badge={block.badge as string}
                heading={[
                  headingLine1,
                  headingLine2,
                  headingLine3,
                ].filter(Boolean).join('\n')}
                headingLines={[
                  headingLine1,
                  headingLine2,
                  headingLine3,
                ].filter(Boolean)}
                description={description}
                primaryCTA={block.primaryCta ? { label: block.primaryCta as string, href: block.primaryCtaLink as string || '/contact' } : undefined}
                secondaryCTA={block.secondaryCta ? { label: block.secondaryCta as string, href: block.secondaryCtaLink as string || '#' } : undefined}
                backgroundImage={resolveMediaUrl(block.image)}
                short={block.short as boolean}
              />
            )
            }

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
                imageSrc={resolveMediaUrl(block.image)}
                imageAlt={resolveMediaAlt(block.image, block.heading as string)}
                dark={bg === 'black'}
                alt={bg === 'cream'}
              />
            )
          }

          case 'textBlock': {
            const bg = block.background as string
            const isDark = bg === 'black'
            const isAlt = bg === 'cream' || bg === 'offWhite'
            return (
              <ContentSection
                key={key}
                badge={block.badge as string}
                heading={block.heading as string || ''}
                content={block.body as string || ''}
                centered={block.centered as boolean}
                dark={isDark}
                alt={isAlt}
                imageSrc={resolveMediaUrl(block.image)}
                imageAlt={resolveMediaAlt(block.image, (block.heading as string) || 'Section image')}
                ctaLabel={block.ctaLabel as string}
                ctaHref={block.ctaLink as string}
              />
            )
          }

          case 'valuesGrid': {
            const items = (block.items as Array<{ icon?: string; title?: string; description?: string }>) || []
            const bg = block.background as string
            const colCount = parseInt(block.columns as string || '3', 10)
            const validColumns = ([2, 3, 4].includes(colCount) ? colCount : 3) as 2 | 3 | 4
            return (
              <ValueProposition
                key={key}
                heading={block.heading as string}
                description={block.description as string}
                values={items.map((item) => ({
                  title: item.title || '',
                  description: item.description || '',
                  iconName: item.icon,
                }))}
                columns={validColumns}
                alt={bg === 'cream'}
              />
            )
          }

          case 'statsBar': {
            const items = (block.items as Array<{ value?: string; label?: string }>) || []
            return (
              <StatsBar
                key={key}
                stats={items.map((item) => {
                  const originalLabel = item.label || ''
                  const label = originalLabel === 'Trucks Planned' ? 'Fast Response' : originalLabel
                  const value = originalLabel === 'Dump Trucks' && item.value === '3'
                    ? '4'
                    : originalLabel === 'Trucks Planned' && item.value === '4+'
                      ? 'Same-Day'
                      : item.value || ''
                  return { value, label }
                })}
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
            const items = (block.items as Array<{ title?: string; category?: string; location?: string; description?: string; image?: unknown; services?: Array<{ service?: string }> }>) || []
            return (
              <ProjectShowcase
                key={key}
                heading={block.heading as string}
                projects={items.map((item) => ({
                  title: item.title || '',
                  category: item.category || '',
                  location: item.location,
                  description: item.description,
                  imageSrc: resolveMediaUrl(item.image),
                  imageAlt: resolveMediaAlt(item.image, item.title || 'Project image'),
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
                imageSrc={resolveMediaUrl(block.image)}
                imageAlt={resolveMediaAlt(block.image, (block.heading as string) || 'CTA image')}
              />
            )

          case 'areaCards': {
            const items = (block.items as Array<{ name?: string; description?: string; href?: string; services?: Array<{ service?: string }> }>) || []
            const additionalAreas = (block.additionalAreas as Array<{ name?: string }>) || []
            return (
              <ServiceAreasList
                key={key}
                heading={block.heading as string}
                description={block.description as string}
                areas={items.map((item) => ({
                  name: item.name || '',
                  description: item.description,
                  href: item.href,
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
            const description = (block.body as string)?.replace('currently operates three professional dump trucks', 'currently operates four professional dump trucks')
              .replace('currently operates three dump trucks', 'currently operates four dump trucks')
            return (
              <FleetSection
                key={key}
                heading={block.heading as string}
                description={description}
                imageSrc={resolveMediaUrl(block.image)}
                metrics={metrics.map((m) => ({
                  iconName: m.icon || 'Truck',
                  value: m.label === 'Trucks in Operation' && m.value === '3'
                    ? '4'
                    : m.label === 'Planned Expansion' && m.value === '4+'
                      ? 'Same-Day'
                      : m.value || '',
                  label: m.label === 'Planned Expansion' ? 'Fast Response' : m.label || '',
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
