import React from 'react'

export interface SectionProps {
  children: React.ReactNode
  background?: 'white' | 'cream' | 'off-white' | 'black' | 'near-black' | 'orange'
  padding?: 'default' | 'sm' | 'none'
  noPadTop?: boolean
  noPadBottom?: boolean
  fullBleed?: boolean
  className?: string
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(function SectionInner({
  children,
  background = 'white',
  padding = 'default',
  noPadTop = false,
  noPadBottom = false,
  fullBleed = false,
  className = '',
}, ref) {
  const bgMap: Record<string, string> = {
    white: 'section--white',
    cream: 'section--cream',
    'off-white': 'section--off-white',
    black: 'section--black',
    'near-black': 'section--near-black',
    orange: 'section--orange',
  }

  const classes = [
    'section',
    bgMap[background] || '',
    padding === 'sm' ? 'section--sm' : '',
    padding === 'none' ? 'section--no-pad-top section--no-pad-bottom' : '',
    noPadTop ? 'section--no-pad-top' : '',
    noPadBottom ? 'section--no-pad-bottom' : '',
    fullBleed ? 'section--full-bleed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <section ref={ref} className={classes}>{children}</section>
})
