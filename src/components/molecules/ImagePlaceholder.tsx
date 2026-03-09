import React from 'react'
import { Text } from '../atoms/Text'

export interface ImagePlaceholderProps {
  label?: string
  src?: string
  alt?: string
  minHeight?: string
  className?: string
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label = 'Image',
  src,
  alt,
  minHeight = '500px',
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
      style={{ minHeight, background: 'linear-gradient(135deg, #111 0%, #333 100%)' }}
    >
      <Text color="white" size="sm">{label}</Text>
    </div>
  )
}
