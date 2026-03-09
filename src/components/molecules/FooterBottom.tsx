import React from 'react'
import { Text } from '../atoms/Text'
import { Link } from '../atoms/Link'

export interface FooterBottomProps {
  copyright?: string
  className?: string
}

export const FooterBottom: React.FC<FooterBottomProps> = ({
  copyright = '© 2026 Amazing Hauling of North Florida. All Rights Reserved.',
  className = '',
}) => {
  const classes = ['footer__bottom', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Text as="span" size="xs" color="gray">{copyright}</Text>
      <Link href="/privacy" variant="footer">Privacy Policy</Link>
    </div>
  )
}
