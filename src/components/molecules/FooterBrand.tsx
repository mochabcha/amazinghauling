import React from 'react'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'

export interface FooterBrandProps {
  tagline?: string
  certifications?: string
  className?: string
}

export const FooterBrand: React.FC<FooterBrandProps> = ({
  tagline,
  certifications,
  className = '',
}) => {
  const classes = ['footer__brand', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {tagline && <Text size="sm" color="gray">{tagline}</Text>}
      {certifications && <Badge variant="orange">{certifications}</Badge>}
    </div>
  )
}
