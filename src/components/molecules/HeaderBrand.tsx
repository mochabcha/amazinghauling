import React from 'react'
import { Logo } from '../atoms/Logo'

export interface HeaderBrandProps {
  src?: string
  companyName?: string
  white?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  href?: string
  showText?: boolean
  className?: string
}

export const HeaderBrand: React.FC<HeaderBrandProps> = ({
  src,
  companyName = 'Amazing Hauling',
  white = true,
  size = 'md',
  href = '/',
  showText = !src,
  className = '',
}) => {
  return <Logo src={src} companyName={companyName} size={size} white={white} href={href} showText={showText} className={className} />
}
