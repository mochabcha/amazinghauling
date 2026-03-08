import React from 'react'

export interface TextProps {
  children: React.ReactNode
  size?: 'sm' | 'base' | 'lg' | 'xl'
  color?: 'default' | 'white' | 'navy' | 'gold' | 'gray'
  weight?: 'normal' | 'semibold' | 'bold'
  uppercase?: boolean
  className?: string
  as?: 'p' | 'span' | 'div'
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  color = 'default',
  weight,
  uppercase = false,
  className = '',
  as: Tag = 'p',
}) => {
  const classes = [
    'text',
    `text--${size}`,
    color !== 'default' ? `text--${color}` : '',
    weight === 'semibold' ? 'text--semibold' : '',
    weight === 'bold' ? 'text--bold' : '',
    uppercase ? 'text--uppercase' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}
