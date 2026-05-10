import React from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'url'
  error?: boolean
  className?: string
}

export const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  error = false,
  className = '',
  ...props
}) => {
  const classes = [
    'input',
    error ? 'input--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <input
      name={name}
      type={type}
      className={classes}
      {...props}
    />
  )
}
