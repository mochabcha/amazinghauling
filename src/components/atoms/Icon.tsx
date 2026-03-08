import React from 'react'
import { icons, type LucideProps } from 'lucide-react'

export interface IconProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'default' | 'gold' | 'navy' | 'white' | 'orange'
  className?: string
}

const sizeMap: Record<string, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'default',
  className = '',
}) => {
  const LucideIcon = icons[name as keyof typeof icons] as React.FC<LucideProps> | undefined

  const classes = [
    'icon',
    `icon--${size}`,
    color !== 'default' ? `icon--${color}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (!LucideIcon) {
    return <span className={classes} />
  }

  return (
    <span className={classes}>
      <LucideIcon size={sizeMap[size]} />
    </span>
  )
}
