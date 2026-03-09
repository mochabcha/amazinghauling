'use client'

import React from 'react'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { AreaListHeader } from '../molecules/AreaListHeader'
import { AreaCard } from '../molecules/AreaCard'
import { AdditionalAreas } from '../molecules/AdditionalAreas'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface ServiceAreaItem {
  name: string
  description?: string
  services?: string[]
  href?: string
}

export interface ServiceAreasListProps {
  heading?: string
  description?: string
  areas: ServiceAreaItem[]
  additionalAreas?: string[]
  showCTA?: boolean
  className?: string
}

export const ServiceAreasList: React.FC<ServiceAreasListProps> = ({
  heading = 'Hauling Services Across Northeast Florida',
  description,
  areas,
  additionalAreas,
  showCTA = true,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = ['service-areas-list', className].filter(Boolean).join(' ')

  return (
    <SectionWrapper className={classes} ref={ref} noContainer>
      <div className="service-areas-list__inner">
        <AreaListHeader heading={heading} description={description} className="service-areas-list__header animate-on-scroll" />
        <div className="service-areas-list__grid animate-stagger">
          {areas.map((area, index) => (
            <div key={index} className="animate-on-scroll">
              <AreaCard
                name={area.name}
                description={area.description}
                services={area.services}
                href={area.href}
              />
            </div>
          ))}
        </div>
        {additionalAreas && additionalAreas.length > 0 && (
          <AdditionalAreas areas={additionalAreas} className="animate-on-scroll" />
        )}
        {showCTA && (
          <div className="text-center mt-16 animate-on-scroll">
            <CTAButtonGroup centered />
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
