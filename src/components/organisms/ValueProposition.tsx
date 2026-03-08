'use client'

import React from 'react'
import { ValueCard } from '../molecules/ValueCard'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface ValueItem {
  title: string
  description: string
  iconName?: string
}

export interface ValuePropositionProps {
  heading?: string
  description?: string
  values: ValueItem[]
  columns?: 2 | 3 | 5
  alt?: boolean
  className?: string
}

export const ValueProposition: React.FC<ValuePropositionProps> = ({
  heading = 'Why Contractors Choose Amazing Hauling',
  description,
  values,
  columns = 3,
  alt = false,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = [
    'value-proposition',
    alt ? 'value-proposition--alt' : '',
    className,
  ].filter(Boolean).join(' ')

  const gridClass = columns === 2
    ? 'value-proposition__grid--2col'
    : columns === 5
      ? 'value-proposition__grid--5col'
      : 'value-proposition__grid'

  return (
    <section className={classes} ref={ref}>
      <div className="value-proposition__inner">
        <div className="value-proposition__header animate-on-scroll animate-gold-line">
          <h2 className="heading heading--2 mb-4">{heading}</h2>
          {description && <p className="text text--lg">{description}</p>}
        </div>
        <div className={`${gridClass} animate-stagger`}>
          {values.map((value, index) => (
            <div key={index} className="animate-on-scroll">
              <ValueCard
                title={value.title}
                description={value.description}
                iconName={value.iconName}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
