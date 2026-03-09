import React from 'react'
import { StatItem } from './StatItem'

export interface StatsBarGridProps {
  stats: Array<{ value: string; label: string }>
  white?: boolean
  className?: string
}

export const StatsBarGrid: React.FC<StatsBarGridProps> = ({
  stats,
  white = false,
  className = '',
}) => {
  const classes = ['stats-bar__grid animate-stagger', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {stats.map((stat, index) => (
        <StatItem key={index} value={stat.value} label={stat.label} white={white} />
      ))}
    </div>
  )
}
