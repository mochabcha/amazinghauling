import React from 'react'
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'
import { TextArea } from '../atoms/TextArea'
import { Select } from '../atoms/Select'
import type { SelectOption } from '../atoms/Select'

export interface FormFieldProps {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  error?: string
  options?: SelectOption[]
  className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  options,
  className = '',
}) => {
  const classes = ['form-field', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      {type === 'textarea' ? (
        <TextArea name={name} placeholder={placeholder} required={required} />
      ) : type === 'select' && options ? (
        <Select name={name} options={options} placeholder={placeholder} required={required} />
      ) : (
        <Input
          name={name}
          type={type as 'text' | 'email' | 'tel' | 'number' | 'date'}
          placeholder={placeholder}
          required={required}
          error={!!error}
        />
      )}
      {error && <span className="form-field__error">{error}</span>}
    </div>
  )
}
