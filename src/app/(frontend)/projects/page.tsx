import React from 'react'
import { ProjectsTemplate } from '@/components/templates/ProjectsTemplate'

export const metadata = {
  title: 'Projects & Work Gallery | Amazing Hauling of North Florida',
  description: 'View our hauling projects across Northeast Florida. Road construction, asphalt paving, dirt hauling, and materials transport for contractors throughout Jacksonville.',
}

export default function ProjectsPage() {
  return (
    <ProjectsTemplate
      hero={{
        heading: 'Projects & Work Gallery',
        description: 'Amazing Hauling of North Florida proudly supports construction crews, road contractors, and development teams across Jacksonville and the surrounding region.',
      }}
      introHeading="Proven Hauling Support Across Northeast Florida"
      introContent="Our trucks work on projects that keep Northeast Florida growing — from road construction and asphalt paving to site development and materials delivery. This page highlights the type of work we regularly support."
      projects={[
        { title: 'Road Construction Support', category: 'Road Construction', location: 'Jacksonville, FL', description: 'Road construction requires precise coordination between contractors, paving crews, and hauling partners. Amazing Hauling regularly supports roadway construction projects by transporting asphalt, hauling aggregates, and removing construction debris from active job sites.', services: ['Asphalt hauling', 'Milling debris removal', 'Aggregate transport', 'Jobsite material delivery', 'Roadway cleanup hauling'] },
        { title: 'Asphalt Paving Operations', category: 'Asphalt Paving', location: 'Duval County, FL', description: 'Asphalt paving projects depend on reliable hauling to keep paving crews working without interruption. Amazing Hauling helps transport asphalt materials from plants to job sites and assists with hauling asphalt debris during resurfacing operations.', services: ['Hot asphalt transport', 'Debris removal', 'Resurfacing support'] },
        { title: 'Dirt Hauling for Development', category: 'Site Development', location: 'Northeast Florida', description: 'Land development projects require consistent hauling to move dirt and fill material between excavation areas and job sites. By providing efficient dirt hauling, we help development projects stay on schedule.', services: ['Residential development', 'Commercial construction', 'Land clearing', 'Grading and excavation'] },
        { title: 'Materials Transport', category: 'Materials Transport', location: 'Clay County, FL', description: 'Construction sites require a steady flow of materials to keep crews productive. Amazing Hauling helps move aggregates, gravel, rock, and other construction materials needed to support infrastructure and building projects.', services: ['Aggregate delivery', 'Gravel transport', 'Rock hauling'] },
      ]}
      growthContent={{
        heading: "Supporting Jacksonville's Growth",
        content: 'Jacksonville and Northeast Florida continue to experience strong growth in construction and infrastructure development. Amazing Hauling is proud to support the contractors and crews responsible for building roads, preparing land, and delivering materials that help shape the region\'s future. Our trucks can often be seen working throughout Jacksonville, Duval County, Clay County, Nassau County, and St. Johns County.',
      }}
      fleet={{
        heading: 'Our Fleet',
        description: 'Amazing Hauling currently operates three dump trucks, with plans to expand as demand continues to grow. Our fleet is maintained to professional standards and operated by experienced drivers who understand the demands of construction and infrastructure projects. We focus on providing reliable equipment, professional drivers, safe operations, and consistent service.',
      }}
      hardWorkContent={{
        heading: 'Built Through Hard Work',
        content: 'Amazing Hauling started with one truck and a commitment to doing the job right. Through hard work, reliability, and word-of-mouth referrals, the company has grown into a trusted hauling partner for contractors throughout the Jacksonville area. Every project we support helps strengthen our reputation for dependable service.',
      }}
    />
  )
}
