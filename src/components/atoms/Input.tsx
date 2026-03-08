import React from 'react'

export interface InputProps {
  name: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'url'
  placeholder?: string
  value?: string
  required?: boolean
  error?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  value,
  required = false,
  error = false,
  className = '',
  onChange,
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
      placeholder={placeholder}
      value={value}
      required={required}
      className={classes}
      onChange={onChange}
    />
  )
}
