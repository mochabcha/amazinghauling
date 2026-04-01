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

  const content = (
    <>
      {src && (
        <NextImage
          src={src}
          alt={companyName}
          width={size === 'sm' ? 32 : size === 'lg' ? 64 : 48}
          height={size === 'sm' ? 32 : size === 'lg' ? 64 : 48}
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
