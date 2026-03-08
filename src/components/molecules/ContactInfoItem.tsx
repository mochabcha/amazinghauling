import React from 'react'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'
import { Heading } from '../atoms/Heading'

export interface ContactInfoItemProps {
  iconName: string
  label: string
  value: string
  href?: string
  className?: string
}

export const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  iconName,
  label,
  value,
  href,
  className = '',
}) => {
  const classes = ['contact-info-item', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="contact-info-item__icon">
        <Icon name={iconName} size="md" color="gold" />
      </div>
      <div className="contact-info-item__content">
        <Heading level={6} as="span" className="contact-info-item__label">
          {label}
        </Heading>
        <Text as="span" className="contact-info-item__value">
          {href ? <a href={href}>{value}</a> : value}
        </Text>
      </div>
    </div>
  )
}
