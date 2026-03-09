import React from 'react'
import { ImagePlaceholder } from './ImagePlaceholder'
import type { GradientVariant } from './ImagePlaceholder'

export interface HeroShellProps {
  children: React.ReactNode
  backgroundImage?: string
  backgroundGradient?: GradientVariant
  short?: boolean
  className?: string
  innerRef?: React.Ref<HTMLElement>
}

export const HeroShell: React.FC<HeroShellProps> = ({
  children,
  backgroundImage,
  backgroundGradient = 'primary',
  short = false,
  className = '',
  innerRef,
}) => {
  const classes = ['hero', short ? 'hero--short' : '', className].filter(Boolean).join(' ')

  return (
    <section className={classes} ref={innerRef}>
      <div className="hero__bg">
        <ImagePlaceholder
          src={backgroundImage}
          label=""
          alt=""
          fill
          gradient={backgroundGradient}
        />
        <div className="hero__bg-overlay" />
      </div>
      <div className="container hero__inner">
        {children}
      </div>
    </section>
  )
}
