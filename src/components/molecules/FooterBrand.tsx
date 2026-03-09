import React from 'react'
import { Logo } from '../atoms/Logo'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'

export interface FooterBrandProps {
  companyName?: string
  logoSrc?: string
  tagline?: string
  description?: string
  certifications?: string
  className?: string
}

export const FooterBrand: React.FC<FooterBrandProps> = ({
  companyName = 'Amazing Hauling of North Florida',
  logoSrc,
  tagline,
  description,
  certifications,
  className = '',
}) => {
  const classes = ['footer__brand', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Logo src={logoSrc} companyName={companyName} white href="/" />
      {tagline && <Text size="sm" color="gray">{tagline}</Text>}
      {description && <Text size="sm" className="footer__brand-description">{description}</Text>}
      {certifications && <Badge variant="orange">{certifications}</Badge>}
      <div className="footer__social">
        <Text as="span" size="sm" color="gray">Follow Us</Text>
      </div>
    </div>
  )
}
