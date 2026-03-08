import React from 'react'
import { Heading } from '../atoms/Heading'
import { Icon } from '../atoms/Icon'

export interface NavLinkProps {
  label: string
  href: string
  active?: boolean
  white?: boolean
  hasDropdown?: boolean
  children?: React.ReactNode
  className?: string
}

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  href,
  active = false,
  white = false,
  hasDropdown = false,
  children,
  className = '',
}) => {
  const classes = [
    'nav-link',
    active ? 'nav-link--active' : '',
    white ? 'nav-link--white' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="relative group">
      <a href={href} className={classes}>
        <Heading level={6} as="span" className="heading--6" color={white ? 'white' : 'default'}>
          {label}
        </Heading>
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
