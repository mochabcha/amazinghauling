import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { AccentBar } from '../atoms/AccentBar'

export interface SectionHeaderProps {
  badge?: string
  heading: string
  headingLevel?: 2 | 3 | 4
  description?: string
  accentBar?: boolean
  centered?: boolean
  light?: boolean
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  heading,
  headingLevel = 3,
  description,
  accentBar = false,
  centered = false,
  light = false,
  className = '',
}) => {
  const classes = [
    centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {badge && (
        <Text as="p" size="sm" color={light ? 'orange' : 'orange'} uppercase className="mb-4">
          {badge}
        </Text>
      )}
      {accentBar && <AccentBar variant={light ? 'white' : 'orange'} className="mb-6" />}
      <Heading level={headingLevel} color={light ? 'white' : 'default'} className="mb-4">
        {heading}
      </Heading>
      {description && (
        <Text size="md" color={light ? 'cream' : 'default'}>
          {description}
        </Text>
      )}
    </div>
  )
}
