import React from 'react'
import { Icon } from '../atoms/Icon'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

export interface MetricDisplayProps {
  iconName: string
  value: string
  label: string
  className?: string
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  iconName,
  value,
  label,
  className = '',
}) => {
  const classes = ['metric-display', 'animate-on-scroll', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="metric-display__icon">
        <Icon name={iconName} size="xl" color="gold" />
      </div>
      <Heading level={3} as="span" className="metric-display__value">
        {value}
      </Heading>
      <Text as="span" size="sm" className="metric-display__label">
        {label}
      </Text>
    </div>
  )
}
