import React from 'react'
import { Section } from '../atoms/Section'
import { Container } from '../atoms/Container'

export interface SectionWrapperProps {
  children: React.ReactNode
  background?: 'white' | 'cream' | 'off-white' | 'black' | 'near-black' | 'orange'
  padding?: 'default' | 'sm' | 'none'
  noPadTop?: boolean
  noPadBottom?: boolean
  fullBleed?: boolean
  containerVariant?: 'default' | 'wide' | 'narrow' | 'prose'
  noContainer?: boolean
  className?: string
}

export const SectionWrapper = React.forwardRef<HTMLDivElement, SectionWrapperProps>(
  function SectionWrapperInner(
    {
      children,
      background = 'white',
      padding = 'default',
      noPadTop = false,
      noPadBottom = false,
      fullBleed = false,
      containerVariant = 'default',
      noContainer = false,
      className = '',
    },
    ref,
  ) {
    return (
      <Section
        ref={ref}
        background={background}
        padding={padding}
        noPadTop={noPadTop}
        noPadBottom={noPadBottom}
        fullBleed={fullBleed}
        className={className}
      >
        {noContainer ? children : <Container variant={containerVariant}>{children}</Container>}
      </Section>
    )
  },
)
