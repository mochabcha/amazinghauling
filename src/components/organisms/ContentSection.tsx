'use client'

import React from 'react'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface ContentSectionProps {
  badge?: string
  heading: string
  content: string | React.ReactNode
  imageSrc?: string
  imageAlt?: string
  reverse?: boolean
  overlap?: boolean
  centered?: boolean
  alt?: boolean
  dark?: boolean
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  badge,
  heading,
  content,
  imageSrc,
  imageAlt,
  reverse = false,
  overlap = true,
  centered = false,
  alt = false,
  dark = false,
  ctaLabel,
  ctaHref,
  className = '',
}) => {
  const ref = useScrollAnimation()

  if (centered) {
    const bgClass = dark ? 'section--black' : alt ? 'section--cream' : 'section--white'
    return (
      <section className={`section ${bgClass} ${className}`} ref={ref}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center anim-reveal">
            {badge && <p className="text text--label text--orange mb-4">{badge}</p>}
            <h2 className={`heading heading--3 mb-6 ${dark ? 'heading--white' : ''}`}>{heading}</h2>
            <div className={`text text--md ${dark ? 'text--cream' : ''}`}>
              {typeof content === 'string' ? <p>{content}</p> : content}
            </div>
            {ctaLabel && (
              <div className="mt-8">
                <CTAButtonGroup
                  primaryLabel={ctaLabel}
                  primaryHref={ctaHref || '/contact'}
                  primaryVariant={dark ? 'primary' : 'outline'}
                  centered
                />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  const splitClasses = [
    'content-split',
    reverse ? 'content-split--reverse' : '',
    overlap ? 'content-split--overlap' : '',
    dark ? 'content-split--dark' : '',
  ].filter(Boolean).join(' ')

  const bgClass = alt ? 'section--cream' : 'section--white'

  return (
    <section className={`section section--no-pad-top section--no-pad-bottom ${bgClass} ${className}`} ref={ref}>
      <div className={splitClasses}>
        <div className="content-split__media anim-clip-up">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt || heading} className="img img--cover" />
          ) : (
            <div style={{ width: '100%', height: '100%', minHeight: '500px', background: 'linear-gradient(135deg, #111 0%, #333 100%)' }} />
          )}
        </div>
        <div className="content-split__body anim-reveal">
          {badge && <p className="text text--label text--orange">{badge}</p>}
          <div className="accent-bar" />
          <h2 className={`heading heading--3 ${dark ? 'heading--white' : ''}`}>{heading}</h2>
          <div className={`text text--md ${dark ? 'text--cream' : ''}`}>
            {typeof content === 'string' ? <p>{content}</p> : content}
          </div>
          {ctaLabel && (
            <CTAButtonGroup
              primaryLabel={ctaLabel}
              primaryHref={ctaHref || '/contact'}
              primaryVariant={dark ? 'primary' : 'outline'}
            />
          )}
        </div>
      </div>
    </section>
  )
}
