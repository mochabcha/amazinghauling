'use client'

import React from 'react'
import { ProjectCard } from '../molecules/ProjectCard'
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
    <section className={classes} ref={ref}>
      <div className="project-showcase__inner">
        <div className="project-showcase__header animate-on-scroll">
          <div>
            <h2 className="heading heading--2 mb-4">{heading}</h2>
            {description && <p className="text text--lg">{description}</p>}
          </div>
          <CTAButtonGroup primaryLabel="View All Projects" primaryHref="/projects" size="sm" primaryVariant="outline" />
        </div>
        <div className={`project-showcase__grid ${featured ? 'project-showcase__grid--featured' : ''} animate-stagger`}>
          {projects.map((project, index) => (
            <div key={index} className="animate-on-scroll">
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
          <div className="text-center mt-16 animate-on-scroll">
            <CTAButtonGroup centered />
          </div>
        )}
      </div>
    </section>
  )
}
