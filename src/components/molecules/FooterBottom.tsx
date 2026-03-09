import React from 'react'
import { Text } from '../atoms/Text'

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
      <Text as="span" size="xs">
        <a href="/privacy" className="footer-column__link">Privacy Policy</a>
      </Text>
    </div>
  )
}
