import React from 'react'
import { Logo } from '../atoms/Logo'

export interface HeaderBrandProps {
  src?: string
  companyName?: string
  white?: boolean
  href?: string
  showText?: boolean
  className?: string
}

export const HeaderBrand: React.FC<HeaderBrandProps> = ({
  src,
  companyName = 'Amazing Hauling',
  white = true,
  href = '/',
  showText = !src,
  className = '',
}) => {
  return <Logo src={src} companyName={companyName} white={white} href={href} showText={showText} className={className} />
}
