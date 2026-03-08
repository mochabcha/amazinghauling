import React from 'react'

export interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  color?: 'default' | 'white' | 'gold'
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  color = 'default',
  className = '',
  as,
}) => {
  const Tag = (as || `h${level}`) as React.ElementType
  const classes = [
    'heading',
    `heading--${level}`,
    color !== 'default' ? `heading--${color}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}
