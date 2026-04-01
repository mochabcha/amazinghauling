import React from 'react'
import NextImage from 'next/image'

export interface LogoProps {
  src?: string
  companyName?: string
  size?: 'sm' | 'md' | 'lg'
  white?: boolean
  href?: string
  showText?: boolean
  className?: string
}

export const Logo: React.FC<LogoProps> = ({
  src,
  companyName = 'Amazing Hauling',
  size = 'md',
  white = false,
  href = '/',
  showText = !src,
  className = '',
}) => {
  const classes = ['logo', className].filter(Boolean).join(' ')
  const imgClass = `logo__image ${size !== 'md' ? `logo__image--${size}` : ''}`
  const textClass = `logo__text ${white ? 'logo__text--white' : ''}`
  const dimensions = size === 'sm'
    ? { width: 120, height: 85 }
    : size === 'lg'
      ? { width: 220, height: 156 }
      : { width: 180, height: 127 }

  const content = (
    <>
      {src && (
        <NextImage
          src={src}
          alt={companyName}
          width={dimensions.width}
          height={dimensions.height}
          sizes={size === 'lg' ? '220px' : size === 'sm' ? '120px' : '180px'}
          priority
          className={imgClass}
        />
      )}
      {showText && <span className={textClass}>{companyName}</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return <div className={classes}>{content}</div>
}
