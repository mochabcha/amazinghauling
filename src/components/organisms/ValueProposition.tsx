'use client'

import React from 'react'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { ValueCard } from '../molecules/ValueCard'
import { SectionHeader } from '../molecules/SectionHeader'
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
  columns?: 2 | 3 | 4
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

  const gridClass = columns === 2
    ? 'value-proposition__grid--2col'
    : columns === 4
      ? 'value-proposition__grid--4col'
      : 'value-proposition__grid'

  return (
    <SectionWrapper background={alt ? 'cream' : 'white'} className={className} ref={ref} noContainer>
      <div className="value-proposition__inner">
        <div className="value-proposition__header anim-reveal anim-accent-bar">
          <SectionHeader heading={heading} description={description} centered />
        </div>
        <div className={`${gridClass} anim-stagger`}>
          {values.map((value, index) => (
            <div key={index} className="anim-reveal">
              <ValueCard
                title={value.title}
                description={value.description}
                iconName={value.iconName}
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
