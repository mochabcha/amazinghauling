'use client'

import React from 'react'

import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { ActionPathPanel } from '../molecules/ActionPathPanel'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface SplitCTABannerPath {
  eyebrow?: string
  title: string
  description?: string
  ctaLabel: string
  ctaHref: string
}

export interface SplitCTABannerProps {
  heading: string
  description?: string
  paths: SplitCTABannerPath[]
  className?: string
}

export const SplitCTABanner: React.FC<SplitCTABannerProps> = ({
  heading,
  description,
  paths,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = ['split-cta-banner', className].filter(Boolean).join(' ')

  return (
    <SectionWrapper className={classes} ref={ref} noContainer background="near-black">
      <div className="split-cta-banner__inner">
        <div className="split-cta-banner__header animate-on-scroll">
          <Heading level={2} color="white">{heading}</Heading>
          {description && (
            <Text size="lg" color="cream" className="split-cta-banner__description">
              {description}
            </Text>
          )}
        </div>
        <div className="split-cta-banner__grid">
          {paths.slice(0, 2).map((path, index) => (
            <ActionPathPanel
              key={`${path.title}-${index}`}
              eyebrow={path.eyebrow}
              title={path.title}
              description={path.description}
              ctaLabel={path.ctaLabel}
              ctaHref={path.ctaHref}
              emphasized={index === 0}
              className="animate-on-scroll"
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
