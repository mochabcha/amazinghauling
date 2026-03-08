'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    const animatedElements = element.querySelectorAll(
      '.animate-on-scroll, .animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right, .animate-scale-in, .animate-slide-reveal, .animate-counter, .animate-draw-line, .animate-gold-line'
    )

    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [threshold])

  return ref
}
