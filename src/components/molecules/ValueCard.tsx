import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'

export interface ValueCardProps {
  title: string
  description: string
  iconName?: string
  className?: string
}

export const ValueCard: React.FC<ValueCardProps> = ({
  title,
  description,
  iconName = 'CheckCircle',
  className = '',
}) => {
  const classes = ['value-card', 'animate-card-lift', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="value-card__icon">
        <Icon name={iconName} size="lg" color="white" />
      </div>
      <Heading level={5} as="h3" className="value-card__title">
        {title}
      </Heading>
      <Text className="value-card__description">{description}</Text>
    </div>
  )
}
