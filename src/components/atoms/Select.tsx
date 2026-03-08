import React from 'react'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  name: string
  options: SelectOption[]
  placeholder?: string
  value?: string
  required?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  placeholder,
  value,
  required = false,
  className = '',
  onChange,
}) => {
  const classes = ['select', className].filter(Boolean).join(' ')

  return (
    <select
      name={name}
      value={value}
      required={required}
      className={classes}
      onChange={onChange}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
