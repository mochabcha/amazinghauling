import React from 'react'

export interface TextAreaProps {
  name: string
  placeholder?: string
  value?: string
  required?: boolean
  rows?: number
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  value,
  required = false,
  rows = 5,
  className = '',
  onChange,
}) => {
  const classes = ['textarea', className].filter(Boolean).join(' ')

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      required={required}
      rows={rows}
      className={classes}
      onChange={onChange}
    />
  )
}
