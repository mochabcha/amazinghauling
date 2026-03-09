import React from 'react'
import { Text } from '../atoms/Text'

export type GradientVariant = 'primary' | 'dark' | 'warm' | 'cream' | 'hero'

export interface ImagePlaceholderProps {
  label?: string
  src?: string
  alt?: string
  minHeight?: string
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
  gradient = 'dark',
  className = '',
}) => {
  if (src) {
    return (
      <div className={`w-full h-full ${className}`}>
        <img src={src} alt={alt || label} className="img img--cover" style={{ minHeight }} />
      </div>
    )
  }

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{ minHeight, background: gradientMap[gradient] }}
    >
      {label && <Text color={gradient === 'cream' ? 'gray' : 'white'} size="sm">{label}</Text>}
    </div>
  )
}
