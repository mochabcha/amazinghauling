import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

export interface StatItemProps {
  value: string
  label: string
  white?: boolean
  className?: string
}

export const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  white = false,
  className = '',
}) => {
  const classes = [
    'stat-item',
    'animate-counter',
    white ? 'stat-item--white' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <Heading level={2} as="span" color={white ? 'orange' : 'orange'} className="stat-item__value">
        {value}
      </Heading>
      <Text as="span" size="sm" color={white ? 'white' : 'gray'} uppercase className="stat-item__label">
        {label}
      </Text>
    </div>
  )
}
