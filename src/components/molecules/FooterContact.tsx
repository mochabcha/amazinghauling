import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
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
    'footer__grid',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="footer__brand">
        <Heading level={6} color="white" className="mb-2">Contact</Heading>
        {address && <Text size="sm" color="gray">{address}</Text>}
        {hours && <Text size="sm" color="gray">{hours}</Text>}
      </div>
      <div>
        {phone && (
          <Link href={`tel:${phone}`} variant="footer">{phone}</Link>
        )}
        {email && (
          <Link href={`mailto:${email}`} variant="footer">{email}</Link>
        )}
      </div>
    </div>
  )
}
