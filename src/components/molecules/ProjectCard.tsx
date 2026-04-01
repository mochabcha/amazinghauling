import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'
import { Image } from '../atoms/Image'

export interface ProjectCardProps {
  title: string
  category: string
  location?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  services?: string[]
  href?: string
  tone?: 'light' | 'dark'
  className?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  location,
  description,
  imageSrc,
  imageAlt,
  services,
  href,
  tone = 'light',
  className = '',
}) => {
  const classes = ['project-card', `project-card--${tone}`, 'animate-card-lift', className].filter(Boolean).join(' ')

  const content = (
    <>
      <div className="project-card__image animate-img-zoom">
        {imageSrc ? (
          <Image src={imageSrc} alt={imageAlt || title} variant="cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center">
            <Text color="white" size="sm">Project Image</Text>
          </div>
        )}
        <div className="project-card__overlay">
          <Badge variant="gold">{category}</Badge>
        </div>
      </div>
      <div className="project-card__body">
        <Heading level={5} as="h3" className="project-card__title">
          {title}
        </Heading>
        {location && (
          <Text size="sm" color="gray" className="project-card__location">
            {location}
          </Text>
        )}
        {description && (
          <Text className="project-card__description">{description}</Text>
        )}
        {services && services.length > 0 && (
          <div className="project-card__services">
            {services.map((service, index) => (
              <Badge key={index} variant="navy">{service}</Badge>
            ))}
          </div>
        )}
      </div>
    </>
  )

  if (href) {
    return <a href={href} className={classes}>{content}</a>
  }

  return <div className={classes}>{content}</div>
}
