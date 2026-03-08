'use client'

import React from 'react'
import { StatItem } from '../molecules/StatItem'
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
    <section className={classes} ref={ref}>
      <div className="stats-bar__inner">
        <div className="stats-bar__grid animate-stagger">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} white />
          ))}
        </div>
      </div>
    </section>
  )
}
