import React from 'react'

import { Button } from '../atoms/Button'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

export interface ActionPathPanelProps {
  eyebrow?: string
  title: string
  description?: string
  ctaLabel: string
  ctaHref: string
  emphasized?: boolean
  className?: string
}

export const ActionPathPanel: React.FC<ActionPathPanelProps> = ({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  emphasized = false,
  className = '',
}) => {
  const classes = [
    'action-path-panel',
    emphasized ? 'action-path-panel--emphasized' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <article className={classes}>
      {eyebrow && (
        <Text as="span" size="xs" color={emphasized ? 'orange' : 'cream'} uppercase className="action-path-panel__eyebrow">
          {eyebrow}
        </Text>
      )}
      <Heading level={3} color="white" className="action-path-panel__title">
        {title}
      </Heading>
      {description && (
        <Text size="lg" color="cream" className="action-path-panel__description">
          {description}
        </Text>
      )}
      <Button
        href={ctaHref}
        variant={emphasized ? 'primary' : 'outline-white'}
        size="lg"
        className="action-path-panel__button"
      >
        {ctaLabel}
      </Button>
    </article>
  )
}
