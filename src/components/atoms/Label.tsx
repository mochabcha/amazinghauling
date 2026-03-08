import React from 'react'

export interface LabelProps {
  children: React.ReactNode
  htmlFor?: string
  required?: boolean
  className?: string
}

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  className = '',
}) => {
  const classes = [
    'label',
    required ? 'label--required' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
    </label>
  )
}
