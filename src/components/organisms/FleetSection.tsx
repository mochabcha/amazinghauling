'use client'

import React from 'react'
import { MetricDisplay } from '../molecules/MetricDisplay'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
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
  const classes = ['fleet-section', className].filter(Boolean).join(' ')

  return (
    <section className={classes} ref={ref}>
      <div className="fleet-section__inner">
        <div className="fleet-section__content animate-fade-left">
          <h2 className="heading heading--2">{heading}</h2>
          <p className="text text--lg">{description}</p>
          <div className="fleet-section__metrics">
            {metrics.map((metric, index) => (
              <MetricDisplay
                key={index}
                iconName={metric.iconName}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
          <CTAButtonGroup
            primaryLabel="Request a Quote"
            primaryHref="/contact"
            secondaryLabel="View Projects"
            secondaryHref="/projects"
          />
        </div>
        <div className="fleet-section__image animate-fade-right">
          {imageSrc ? (
            <img src={imageSrc} alt="Amazing Hauling Fleet" className="img img--cover img--rounded" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue rounded-xl flex items-center justify-center min-h-[400px]">
              <span className="text text--white text--lg">Fleet Image</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
