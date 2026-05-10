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
  id?: string
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  min?: number | string
  max?: number | string
  minLength?: number
  maxLength?: number
  pattern?: string
  rows?: number
  disabled?: boolean
  defaultValue?: string | number
  value?: string | number
  helperText?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
  id,
  autoComplete,
  inputMode,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  rows,
  disabled = false,
  defaultValue,
  value,
  helperText,
  onChange,
  className = '',
}) => {
  const classes = ['form-field', className].filter(Boolean).join(' ')
  const fieldId = id || name
  const helperId = helperText ? `${fieldId}-helper` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={classes}>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      {type === 'textarea' ? (
        <TextArea
          id={fieldId}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows}
          disabled={disabled}
          defaultValue={defaultValue}
          value={typeof value === 'string' ? value : undefined}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement> | undefined}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        />
      ) : type === 'select' && options ? (
        <Select
          id={fieldId}
          name={name}
          options={options}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          value={typeof value === 'string' ? value : undefined}
          onChange={onChange as React.ChangeEventHandler<HTMLSelectElement> | undefined}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        />
      ) : (
        <Input
          id={fieldId}
          name={name}
          type={type as 'text' | 'email' | 'tel' | 'number' | 'date'}
          placeholder={placeholder}
          required={required}
          error={!!error}
          disabled={disabled}
          defaultValue={defaultValue}
          value={typeof value === 'string' || typeof value === 'number' ? value : undefined}
          autoComplete={autoComplete}
          inputMode={inputMode}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement> | undefined}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        />
      )}
      {helperText && !error && <span id={helperId} className="form-field__helper">{helperText}</span>}
      {error && <span id={errorId} className="form-field__error">{error}</span>}
    </div>
  )
}
