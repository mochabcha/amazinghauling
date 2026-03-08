import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'navy' | 'orange' | 'white'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
}) => {
  const classes = ['badge', `badge--${variant}`, className].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}
