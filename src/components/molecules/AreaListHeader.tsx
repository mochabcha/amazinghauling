import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Divider } from '../atoms/Divider'

export interface AreaListHeaderProps {
  heading: string
  description?: string
  className?: string
}

export const AreaListHeader: React.FC<AreaListHeaderProps> = ({
  heading,
  description,
  className = '',
}) => {
  const classes = [className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Heading level={2} className="mb-4">{heading}</Heading>
      {description && <Text size="lg">{description}</Text>}
      <Divider variant="gold" className="mx-auto mt-6 animate-draw-line" />
    </div>
  )
}
