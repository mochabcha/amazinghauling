import React from 'react'

export interface TextProps {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl'
  color?: 'default' | 'white' | 'black' | 'orange' | 'cream' | 'gray'
  weight?: 'normal' | 'semibold' | 'bold'
  uppercase?: boolean
  className?: string
  as?: 'p' | 'span' | 'div'
  style?: React.CSSProperties
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  color = 'default',
  weight,
  uppercase = false,
  className = '',
  as: Tag = 'p',
  style,
}) => {
  const classes = [
    'text',
    `text--${size}`,
    color !== 'default' ? `text--${color}` : '',
    weight === 'semibold' ? 'text--semibold' : '',
    weight === 'bold' ? 'text--bold' : '',
    uppercase ? 'text--label' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes} style={style}>{children}</Tag>
}
