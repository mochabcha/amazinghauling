'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const selectors = [
      '.anim-reveal', '.anim-lines', '.anim-up', '.anim-down',
      '.anim-left', '.anim-right', '.anim-clip-up', '.anim-clip-left',
      '.anim-clip-right', '.anim-counter', '.anim-accent-bar',
    ]

    const animatedElements = () => element.querySelectorAll(selectors.join(', '))
    const revealAll = () => {
      animatedElements().forEach((animatedElement) => animatedElement.classList.add('is-visible'))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealAll()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold])

  return ref
}
