import React from 'react'
import { Heading } from '../atoms/Heading'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumnProps {
  title: string
  links: FooterLink[]
  className?: string
}

export const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  links,
  className = '',
}) => {
  const classes = ['footer-column', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Heading level={6} as="h4" color="gold" className="footer-column__title">
        {title}
      </Heading>
      <ul className="footer-column__links">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="footer-column__link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
