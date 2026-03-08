'use client'

import React from 'react'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface ContentSectionProps {
  heading: string
  content: string | React.ReactNode
  imageSrc?: string
  imageAlt?: string
  reverse?: boolean
  centered?: boolean
  alt?: boolean
  navy?: boolean
  showCTA?: boolean
  className?: string
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  heading,
  content,
  imageSrc,
  imageAlt,
  reverse = false,
  centered = false,
  alt = false,
  navy = false,
  showCTA = false,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const sectionClasses = [
    'content-section',
    alt ? 'content-section--alt' : '',
    navy ? 'content-section--navy' : '',
    className,
  ].filter(Boolean).join(' ')

  if (centered) {
    return (
      <section className={sectionClasses} ref={ref}>
        <div className="content-section__inner">
          <div className="content-section__text-centered animate-on-scroll">
            <h2 className={`heading heading--2 mb-6 ${navy ? 'heading--white' : ''}`}>{heading}</h2>
            <div className={`text text--lg ${navy ? 'text--white' : ''}`}>
              {typeof content === 'string' ? <p>{content}</p> : content}
            </div>
            {showCTA && (
              <div className="mt-8">
                <CTAButtonGroup centered primaryVariant={navy ? 'primary' : 'primary'} secondaryVariant={navy ? 'outline-white' : 'outline'} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClasses} ref={ref}>
      <div className="content-section__inner">
        <div className={`content-section__split ${reverse ? 'direction-rtl' : ''}`}>
          <div className="content-section__text animate-fade-left" style={{ direction: 'ltr' }}>
            <h2 className="heading heading--2">{heading}</h2>
            <div className="text text--lg">
              {typeof content === 'string' ? <p>{content}</p> : content}
            </div>
            {showCTA && <CTAButtonGroup />}
          </div>
          {imageSrc && (
            <div className="content-section__image animate-fade-right animate-img-zoom" style={{ direction: 'ltr' }}>
              <img src={imageSrc} alt={imageAlt || heading} className="img img--cover img--rounded" />
            </div>
          )}
          {!imageSrc && (
            <div className="content-section__image animate-fade-right" style={{ direction: 'ltr' }}>
              <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue rounded-xl flex items-center justify-center min-h-[300px]">
                <span className="text text--white">Section Image</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
