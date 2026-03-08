import React from 'react'

export interface DividerProps {
  variant?: 'default' | 'gold' | 'navy'
  thick?: boolean
  spacious?: boolean
  className?: string
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'default',
  thick = false,
  spacious = false,
  className = '',
}) => {
  const classes = [
    'divider',
    variant !== 'default' ? `divider--${variant}` : '',
    thick ? 'divider--thick' : '',
    spacious ? 'divider--spacious' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <hr className={classes} />
}
