import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'

export interface ServiceCardProps {
  title: string
  description: string
  iconName?: string
  items?: string[]
  className?: string
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconName = 'Truck',
  items,
  className = '',
}) => {
  const classes = ['service-card', 'animate-card-lift', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="service-card__icon">
        <Icon name={iconName} size="lg" color="gold" />
      </div>
      <Heading level={4} as="h3">
        <span className="service-card__title">{title}</span>
      </Heading>
      <Text className="service-card__description">{description}</Text>
      {items && items.length > 0 && (
        <ul className="service-card__items">
          {items.map((item, index) => (
            <li key={index} className="service-card__item">
              <Text as="span" size="sm">{item}</Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
