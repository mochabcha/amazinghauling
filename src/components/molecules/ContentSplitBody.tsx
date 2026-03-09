import React from 'react'
import { Text } from '../atoms/Text'
import { AccentBar } from '../atoms/AccentBar'
import { Heading } from '../atoms/Heading'
import { CTAButtonGroup } from './CTAButtonGroup'

export interface ContentSplitBodyProps {
  badge?: string
  heading: string
  headingLevel?: 2 | 3 | 4
  children: React.ReactNode
  ctaLabel?: string
  ctaHref?: string
  ctaVariant?: 'primary' | 'outline' | 'outline-white'
  dark?: boolean
  className?: string
}

export const ContentSplitBody: React.FC<ContentSplitBodyProps> = ({
  badge,
  heading,
  headingLevel = 3,
  children,
  ctaLabel,
  ctaHref,
  ctaVariant,
  dark = false,
  className = '',
}) => {
  const classes = ['flex flex-col gap-4', className].filter(Boolean).join(' ')
  const resolvedCtaVariant = ctaVariant || (dark ? 'primary' : 'outline')

  return (
    <div className={classes}>
      {badge && (
        <Text as="p" size="xs" color="orange" uppercase>
          {badge}
        </Text>
      )}
      <AccentBar variant={dark ? 'white' : 'orange'} />
      <Heading level={headingLevel} color={dark ? 'white' : 'default'}>
        {heading}
      </Heading>
      <Text as="div" size="md" color={dark ? 'cream' : 'default'}>
        {children}
      </Text>
      {ctaLabel && ctaHref && (
        <CTAButtonGroup
          primaryLabel={ctaLabel}
          primaryHref={ctaHref}
          primaryVariant={resolvedCtaVariant}
        />
      )}
    </div>
  )
}
