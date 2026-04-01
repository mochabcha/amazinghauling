import React from 'react'
import { Text } from '../atoms/Text'

export type GradientVariant = 'primary' | 'dark' | 'warm' | 'cream' | 'hero'

export interface ImagePlaceholderProps {
  label?: string
  src?: string
  alt?: string
  minHeight?: string
  fill?: boolean
  gradient?: GradientVariant
  className?: string
}

const gradientMap: Record<GradientVariant, string> = {
  primary: 'var(--gradient-brand-primary)',
  dark: 'var(--gradient-brand-dark)',
  warm: 'var(--gradient-brand-warm)',
  cream: 'var(--gradient-brand-cream)',
  hero: 'var(--gradient-brand-hero)',
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label = 'Image',
  src,
  alt,
  minHeight = '500px',
  fill = false,
  gradient = 'dark',
  className = '',
}) => {
  const fillStyle: React.CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%' }
    : { width: '100%', minHeight, height: '100%' }

  if (src) {
    return (
      <div className={className} style={fillStyle}>
        <img
          src={src}
          alt={alt || label}
          className="img img--cover"
          style={{ display: 'block', width: '100%', height: '100%', minHeight }}
        />
      </div>
    )
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ ...fillStyle, background: gradientMap[gradient] }}
    >
      {label && <Text color={gradient === 'cream' ? 'gray' : 'white'} size="sm">{label}</Text>}
    </div>
  )
}
