import React from 'react'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  rows?: number
  className?: string
}

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  rows = 5,
  className = '',
  ...props
}) => {
  const classes = ['textarea', className].filter(Boolean).join(' ')

  return (
    <textarea
      name={name}
      rows={rows}
      className={classes}
      {...props}
    />
  )
}
