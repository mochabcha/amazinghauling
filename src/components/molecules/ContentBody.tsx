import React from 'react'
import { Text } from '../atoms/Text'
import { CTAButtonGroup } from './CTAButtonGroup'

export interface ContentBodyProps {
  children: React.ReactNode
  note?: string
  ctaLabel?: string
  ctaHref?: string
  ctaVariant?: 'primary' | 'outline' | 'outline-white'
  light?: boolean
  className?: string
}

export const ContentBody: React.FC<ContentBodyProps> = ({
  children,
  note,
  ctaLabel,
  ctaHref,
  ctaVariant = 'outline',
  light = false,
  className = '',
}) => {
  const classes = ['flex flex-col gap-6', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Text as="div" size="md" color={light ? 'cream' : 'default'}>
        {children}
      </Text>
      {note && (
        <Text as="p" size="sm" color="gray">{note}</Text>
      )}
      {ctaLabel && ctaHref && (
        <CTAButtonGroup
          primaryLabel={ctaLabel}
          primaryHref={ctaHref}
          primaryVariant={ctaVariant}
        />
      )}
    </div>
  )
}
