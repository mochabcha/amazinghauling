import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

export interface FormHeaderProps {
  heading: string
  headingLevel?: 2 | 3 | 4 | 5
  description?: string
  descriptionSize?: 'sm' | 'base' | 'md' | 'lg'
  descriptionColor?: 'default' | 'gray'
  className?: string
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  heading,
  headingLevel = 2,
  description,
  descriptionSize = 'lg',
  descriptionColor = 'default',
  className = '',
}) => {
  const classes = [className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Heading level={headingLevel} className="mb-4">{heading}</Heading>
      {description && (
        <Text size={descriptionSize} color={descriptionColor}>{description}</Text>
      )}
    </div>
  )
}
