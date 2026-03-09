import React from 'react'

export interface SplitLayoutProps {
  media: React.ReactNode
  body: React.ReactNode
  reverse?: boolean
  overlap?: boolean
  dark?: boolean
  mediaAnimClass?: string
  bodyAnimClass?: string
  className?: string
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  media,
  body,
  reverse = false,
  overlap = false,
  dark = false,
  mediaAnimClass = 'anim-clip-up',
  bodyAnimClass = 'anim-reveal',
  className = '',
}) => {
  const classes = [
    'content-split',
    reverse ? 'content-split--reverse' : '',
    overlap ? 'content-split--overlap' : '',
    dark ? 'content-split--dark' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className={`content-split__media ${mediaAnimClass}`}>{media}</div>
      <div className={`content-split__body ${bodyAnimClass}`}>{body}</div>
    </div>
  )
}
