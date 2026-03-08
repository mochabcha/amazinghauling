'use client'

import React from 'react'
import { AreaCard } from '../molecules/AreaCard'
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
    <section className={classes} ref={ref}>
      <div className="service-areas-list__inner">
        <div className="service-areas-list__header animate-on-scroll">
          <h2 className="heading heading--2 mb-4">{heading}</h2>
          {description && <p className="text text--lg">{description}</p>}
          <div className="divider divider--gold mx-auto mt-6 animate-draw-line" />
        </div>
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
          <div className="service-areas-list__additional animate-on-scroll">
            <h3 className="heading heading--4 mb-4">Additional Areas We Serve</h3>
            <div className="flex flex-wrap gap-3">
              {additionalAreas.map((area, index) => (
                <span key={index} className="badge badge--navy">{area}</span>
              ))}
            </div>
            <p className="text text--base mt-4">
              For long-term or large-scale projects, we are able to travel beyond our core region when scheduling and logistics allow.
            </p>
          </div>
        )}
        {showCTA && (
          <div className="text-center mt-16 animate-on-scroll">
            <CTAButtonGroup centered />
          </div>
        )}
      </div>
    </section>
  )
}
