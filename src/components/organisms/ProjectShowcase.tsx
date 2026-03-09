'use client'

import React from 'react'
import { SectionWrapper } from '../molecules/SectionWrapper'
import { ProjectCard } from '../molecules/ProjectCard'
import { SectionHeader } from '../molecules/SectionHeader'
import { CTAButtonGroup } from '../molecules/CTAButtonGroup'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export interface ProjectItem {
  title: string
  category: string
  location?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  services?: string[]
  href?: string
}

export interface ProjectShowcaseProps {
  heading?: string
  description?: string
  projects: ProjectItem[]
  featured?: boolean
  showCTA?: boolean
  className?: string
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  heading = 'Recent Project Work',
  description,
  projects,
  featured = false,
  showCTA = false,
  className = '',
}) => {
  const ref = useScrollAnimation()
  const classes = ['project-showcase', className].filter(Boolean).join(' ')

  return (
    <SectionWrapper className={className} ref={ref} noContainer>
      <div className="project-showcase__inner">
        <div className="project-showcase__header anim-reveal">
          <SectionHeader heading={heading} description={description} />
          <CTAButtonGroup primaryLabel="View All Projects" primaryHref="/projects" size="sm" primaryVariant="outline" />
        </div>
        <div className={`project-showcase__grid ${featured ? 'project-showcase__grid--featured' : ''} anim-stagger`}>
          {projects.map((project, index) => (
            <div key={index} className="anim-reveal">
              <ProjectCard
                title={project.title}
                category={project.category}
                location={project.location}
                description={project.description}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                services={project.services}
                href={project.href}
              />
            </div>
          ))}
        </div>
        {showCTA && (
          <div className="text-center mt-16 anim-reveal">
            <CTAButtonGroup centered />
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
