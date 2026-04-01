import React from 'react'
import { NavLink } from './NavLink'

export interface NavBarItem {
  label: string
  href: string
  children?: Array<{ label: string; href: string; description?: string }>
}

export interface NavBarProps {
  navItems: NavBarItem[]
  className?: string
}

export const NavBar: React.FC<NavBarProps> = ({ navItems, className = '' }) => {
  const classes = ['header__nav', className].filter(Boolean).join(' ')

  return (
    <nav className={classes} aria-label="Primary navigation">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          label={item.label}
          href={item.href}
          hasDropdown={!!item.children?.length}
        />
      ))}
    </nav>
  )
}
