'use client'

import React from 'react'
import { Section } from '../atoms/Section'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { AccentBar } from '../atoms/AccentBar'
import { SectionHeader } from '../molecules/SectionHeader'
import { ContentBody } from '../molecules/ContentBody'
import { ImagePlaceholder } from '../molecules/ImagePlaceholder'
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
  const bg = dark ? 'black' : alt ? 'cream' : 'white'

  if (centered) {
    return (
      <Section background={bg} className={className} ref={ref}>
        <Container>
          <div className="max-w-3xl mx-auto text-center anim-reveal">
            <SectionHeader
              badge={badge}
              heading={heading}
              headingLevel={3}
              centered
              light={dark}
            />
            <Text as="div" size="md" color={dark ? 'cream' : 'default'}>
              {typeof content === 'string' ? <>{content}</> : content}
            </Text>
            {ctaLabel && (
              <ContentBody ctaLabel={ctaLabel} ctaHref={ctaHref} ctaVariant={dark ? 'primary' : 'outline'}>
                {null}
              </ContentBody>
            )}
          </div>
        </Container>
      </Section>
    )
  }

  const splitClasses = [
    'content-split',
    reverse ? 'content-split--reverse' : '',
    overlap ? 'content-split--overlap' : '',
    dark ? 'content-split--dark' : '',
  ].filter(Boolean).join(' ')

  return (
    <Section background={bg} noPadTop noPadBottom className={className} ref={ref}>
      <div className={splitClasses}>
        <div className="content-split__media anim-clip-up">
          <ImagePlaceholder src={imageSrc} alt={imageAlt || heading} label="Section Image" />
        </div>
        <div className="content-split__body anim-reveal">
          {badge && <Text as="p" size="xs" color="orange" uppercase>{badge}</Text>}
          <AccentBar variant={dark ? 'white' : 'orange'} />
          <Heading level={3} color={dark ? 'white' : 'default'}>{heading}</Heading>
          <Text as="div" size="md" color={dark ? 'cream' : 'default'}>
            {typeof content === 'string' ? <>{content}</> : content}
          </Text>
          {ctaLabel && (
            <ContentBody ctaLabel={ctaLabel} ctaHref={ctaHref} ctaVariant={dark ? 'primary' : 'outline'}>
              {null}
            </ContentBody>
          )}
        </div>
      </div>
    </Section>
  )
}
