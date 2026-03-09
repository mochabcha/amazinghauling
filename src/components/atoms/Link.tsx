import React from 'react'

export interface LinkProps {
  href: string
  children: React.ReactNode
  variant?: 'default' | 'footer' | 'nav'
  className?: string
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  variant = 'default',
  className = '',
}) => {
  const classes = [
    'link',
    variant !== 'default' ? `link--${variant}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <a href={href} className={classes}>{children}</a>
}
