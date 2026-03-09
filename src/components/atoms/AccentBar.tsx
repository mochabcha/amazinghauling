import React from 'react'

export interface AccentBarProps {
  variant?: 'orange' | 'white' | 'gold'
  className?: string
}

export const AccentBar: React.FC<AccentBarProps> = ({
  variant = 'orange',
  className = '',
}) => {
  const classes = [
    'accent-bar',
    variant === 'white' ? 'accent-bar--white' : '',
    variant === 'gold' ? 'accent-bar--gold' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} />
}
