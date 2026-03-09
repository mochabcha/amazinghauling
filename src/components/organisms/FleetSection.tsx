'use client'

import React from 'react'
import { Section } from '../atoms/Section'
import { Container } from '../atoms/Container'
import { SectionHeader } from '../molecules/SectionHeader'
import { ContentBody } from '../molecules/ContentBody'
import { MetricDisplay } from '../molecules/MetricDisplay'
import { ImagePlaceholder } from '../molecules/ImagePlaceholder'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface FleetSectionProps {
  heading?: string
  description?: string
  metrics?: Array<{ iconName: string; value: string; label: string }>
  imageSrc?: string
  className?: string
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  heading = 'Our Fleet',
  description = 'Amazing Hauling currently operates three professional dump trucks, with plans to expand to four trucks as demand continues to grow.',
  metrics = [
    { iconName: 'Truck', value: '3', label: 'Trucks in Operation' },
    { iconName: 'TrendingUp', value: '4+', label: 'Planned Expansion' },
    { iconName: 'MapPin', value: 'NE FL', label: 'Service Region' },
    { iconName: 'Users', value: '100%', label: 'Family-Owned' },
  ],
  imageSrc,
  className = '',
}) => {
  const ref = useScrollAnimation()

  return (
    <Section background="cream" className={className} ref={ref}>
      <Container>
        <div className="content-split">
          <div className="content-split__body anim-left">
            <SectionHeader badge="Our Equipment" heading={heading} accentBar />
            <ContentBody
              ctaLabel="Request a Quote"
              ctaHref="/contact"
            >
              {description}
            </ContentBody>
            <div className="fleet-section__metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
              {metrics.map((metric, index) => (
                <MetricDisplay
                  key={index}
                  iconName={metric.iconName}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
          </div>
          <div className="content-split__media anim-clip-up">
            <ImagePlaceholder src={imageSrc} label="Fleet Image" alt="Amazing Hauling Fleet" />
          </div>
        </div>
      </Container>
    </Section>
  )
}
