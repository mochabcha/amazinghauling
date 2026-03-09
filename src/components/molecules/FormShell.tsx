import React from 'react'

export interface FormShellProps {
  children: React.ReactNode
  action?: string
  method?: 'GET' | 'POST'
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  className?: string
}

export const FormShell: React.FC<FormShellProps> = ({
  children,
  action,
  method = 'POST',
  onSubmit,
  className = '',
}) => {
  const classes = ['quote-form__form animate-fade-right', className].filter(Boolean).join(' ')

  return (
    <form className={classes} action={action} method={method} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
