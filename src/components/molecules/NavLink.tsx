import React from 'react'
import { Icon } from '../atoms/Icon'

export interface NavLinkProps {
  label: string
  href: string
  active?: boolean
  hasDropdown?: boolean
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  href,
  active = false,
  hasDropdown = false,
  children,
  onClick,
  className = '',
}) => {
  const classes = [
    'nav-link',
    active ? 'nav-link--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="relative group">
      <a href={href} className={classes} onClick={onClick}>
        <span>{label}</span>
        {hasDropdown && <Icon name="ChevronDown" size="sm" />}
      </a>
      {children && (
        <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-50">
          {children}
        </div>
      )}
    </div>
  )
}
