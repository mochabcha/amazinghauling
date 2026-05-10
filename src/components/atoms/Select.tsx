import React from 'react'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  options: SelectOption[]
  placeholder?: string
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  placeholder,
  className = '',
  ...props
}) => {
  const classes = ['select', className].filter(Boolean).join(' ')

  return (
    <select
      name={name}
      className={classes}
      {...props}
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
