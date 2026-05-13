import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { Link } from '../atoms/Link'

export interface FooterContactProps {
  address?: string
  phone?: string
  email?: string
  hours?: string
  className?: string
}

export const FooterContact: React.FC<FooterContactProps> = ({
  address,
  phone,
  email,
  hours,
  className = '',
}) => {
  const classes = [
    'footer-column',
    'footer-contact',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Heading level={6} as="h4" color="orange" className="footer-column__title">
        Contact
      </Heading>
      <div className="footer-contact__items">
        {address && (
          <div className="footer-contact__item">
            <Icon name="MapPin" size="sm" color="orange" className="footer-contact__icon" />
            <Text size="sm" color="gray">{address}</Text>
          </div>
        )}
        {phone && (
          <div className="footer-contact__item">
            <Icon name="Phone" size="sm" color="orange" className="footer-contact__icon" />
            <Link href={`tel:${phone}`} variant="footer">{phone}</Link>
          </div>
        )}
        {email && (
          <div className="footer-contact__item">
            <Icon name="Mail" size="sm" color="orange" className="footer-contact__icon" />
            <Link href={`mailto:${email}`} variant="footer">{email}</Link>
          </div>
        )}
        {hours && (
          <div className="footer-contact__item">
            <Icon name="Clock3" size="sm" color="orange" className="footer-contact__icon" />
            <Text size="sm" color="gray">{hours}</Text>
          </div>
        )}
      </div>
    </div>
  )
}
