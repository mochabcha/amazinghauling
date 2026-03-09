'use client'

import React from 'react'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { SectionHeader } from '../molecules/SectionHeader'
import { ContentBody } from '../molecules/ContentBody'
import { MetricsGrid } from '../molecules/MetricsGrid'
import { SplitLayout } from '../molecules/SplitLayout'
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
    <SectionWrapper background="cream" className={className} ref={ref}>
      <SplitLayout
        mediaAnimClass="anim-clip-up"
        bodyAnimClass="anim-left"
        media={<ImagePlaceholder src={imageSrc} label="Fleet Image" alt="Amazing Hauling Fleet" gradient="warm" />}
        body={
          <>
            <SectionHeader badge="Our Equipment" heading={heading} accentBar />
            <ContentBody ctaLabel="Request a Quote" ctaHref="/contact">
              {description}
            </ContentBody>
            <MetricsGrid metrics={metrics} />
          </>
        }
      />
    </SectionWrapper>
  )
}
