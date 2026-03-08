import React from 'react'
import NextImage from 'next/image'

export interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  variant?: 'default' | 'rounded' | 'circle' | 'cover' | 'contain'
  priority?: boolean
  className?: string
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  variant = 'default',
  priority = false,
  className = '',
}) => {
  const classes = [
    'img',
    variant !== 'default' ? `img--${variant}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        className={classes}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={classes}
      priority={priority}
    />
  )
}
