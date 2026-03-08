import React from 'react'

export interface ContainerProps {
  children: React.ReactNode
  variant?: 'default' | 'wide' | 'narrow' | 'prose'
  className?: string
  as?: 'div' | 'section' | 'article' | 'main'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'default',
  className = '',
  as: Tag = 'div',
}) => {
  const classes = [
    'container',
    variant !== 'default' ? `container--${variant}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}
