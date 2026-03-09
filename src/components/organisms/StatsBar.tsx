'use client'

import React from 'react'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { StatsBarGrid } from '../molecules/StatsBarGrid'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface StatsBarProps {
  stats: Array<{ value: string; label: string }>
  className?: string
}

export const StatsBar: React.FC<StatsBarProps> = ({
  stats,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = ['stats-bar', className].filter(Boolean).join(' ')

  return (
    <SectionWrapper className={classes} ref={ref} noContainer background="black">
      <div className="stats-bar__inner">
        <StatsBarGrid stats={stats} white />
      </div>
    </SectionWrapper>
  )
}
