import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'

export interface AreaCardProps {
  name: string
  description?: string
  services?: string[]
  href?: string
  className?: string
}

export const AreaCard: React.FC<AreaCardProps> = ({
  name,
  description,
  services,
  href,
  className = '',
}) => {
  const classes = ['area-card', 'animate-card-lift', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Heading level={4} as="h3" className="area-card__name">
        {name}
      </Heading>
      {description && (
        <Text className="area-card__description">{description}</Text>
      )}
      {services && services.length > 0 && (
        <div className="area-card__services">
          {services.map((service, index) => (
            <Badge key={index} variant="navy">{service}</Badge>
          ))}
        </div>
      )}
      {href && (
        <Button variant="ghost" size="sm" href={href}>
          Learn More
        </Button>
      )}
    </div>
  )
}
