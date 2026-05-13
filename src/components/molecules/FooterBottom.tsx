import React from 'react'
import { Text } from '../atoms/Text'

export interface FooterBottomProps {
  description?: string
  copyright?: string
  className?: string
}

export const FooterBottom: React.FC<FooterBottomProps> = ({
  description,
  copyright = '© 2026 Amazing Hauling of North Florida. All Rights Reserved.',
  className = '',
}) => {
  const classes = ['footer__bottom', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="footer__bottom-copy">
        {description && <Text as="span" size="xs" color="gray">{description}</Text>}
        <Text as="span" size="xs" color="gray">{copyright}</Text>
      </div>
    </div>
  )
}
