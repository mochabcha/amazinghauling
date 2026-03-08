import React from 'react'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  disabled?: boolean
  pulseGlow?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  disabled = false,
  pulseGlow = false,
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    size !== 'md' ? `btn--${size}` : '',
    fullWidth ? 'btn--full' : '',
    pulseGlow ? 'animate-pulse-glow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}
