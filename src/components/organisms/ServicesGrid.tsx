'use client'

import React from 'react'
import { ServiceCard } from '../molecules/ServiceCard'
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
  const classes = ['services-grid', className].filter(Boolean).join(' ')

  return (
    <section className={classes} ref={ref}>
      <div className="services-grid__inner">
        <div className="services-grid__header animate-on-scroll">
          {subheading && (
            <p className="text text--uppercase text--gold mb-4">{subheading}</p>
          )}
          <h2 className="heading heading--2 mb-4">{heading}</h2>
          {description && (
            <p className="text text--lg">{description}</p>
          )}
          <div className="divider divider--gold mx-auto mt-6 animate-draw-line" />
        </div>
        <div className="services-grid__grid animate-stagger">
          {services.map((service, index) => (
            <div key={index} className="animate-on-scroll">
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
          <div className="text-center mt-16 animate-on-scroll">
            <CTAButtonGroup centered />
          </div>
        )}
      </div>
    </section>
  )
}
