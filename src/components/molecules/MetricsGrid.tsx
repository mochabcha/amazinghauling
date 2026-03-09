import React from 'react'
import { MetricDisplay } from './MetricDisplay'

export interface MetricsGridProps {
  metrics: Array<{ iconName: string; value: string; label: string }>
  columns?: 2 | 3 | 4
  className?: string
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  metrics,
  columns = 2,
  className = '',
}) => {
  const classes = ['fleet-section__metrics', className].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--space-6)',
        marginTop: 'var(--space-4)',
      }}
    >
      {metrics.map((metric, index) => (
        <MetricDisplay
          key={index}
          iconName={metric.iconName}
          value={metric.value}
          label={metric.label}
        />
      ))}
    </div>
  )
}
