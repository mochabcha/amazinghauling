'use client'

import React from 'react'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { ServiceCard } from '../molecules/ServiceCard'
import { SectionHeader } from '../molecules/SectionHeader'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface ServiceItem {
  title: string
  description: string
  iconName?: string
  items?: string[]
}

export interface ServicesGridProps {
  heading?: string
  subheading?: string
  description?: string
  services: ServiceItem[]
  showCTA?: boolean
  className?: string
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  heading = 'Materials & Services We Provide',
  subheading,
  description,
  services,
  showCTA = false,
  className = '',
}) => {
  const ref = useScrollAnimation()

  return (
    <SectionWrapper className={className} ref={ref} noContainer>
      <div className="services-grid__inner">
        <div className="services-grid__header anim-reveal">
          <SectionHeader badge={subheading} heading={heading} description={description} accentBar />
        </div>
        <div className="services-grid__grid anim-stagger">
          {services.map((service, index) => (
            <div key={index} className="anim-reveal">
              <ServiceCard
                title={service.title}
                description={service.description}
                iconName={service.iconName}
                items={service.items}
              />
            </div>
          ))}
        </div>
        {showCTA && (
          <div className="text-center mt-16 anim-reveal">
            <CTAButtonGroup centered />
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
