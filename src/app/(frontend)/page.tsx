import React from 'react'
import { HomeTemplate } from '@/components/templates/HomeTemplate'

export default function HomePage() {
  return (
    <HomeTemplate
      hero={{
        heading: 'Amazing Hauling of North Florida',
        subheading: 'Reliable Dump Truck & Materials Hauling in Jacksonville and Northeast Florida',
        description: 'When contractors need dependable hauling, they call Amazing. Amazing Hauling provides responsive, professional dump truck services for construction companies, road crews, and development teams throughout Northeast Florida. From asphalt transport to dirt hauling and aggregates delivery, our mission is simple: keep your project moving.',
        certifications: ['Licensed', 'Insured', 'Reliable'],
      }}
      introHeading="Built for Contractors Who Need Reliable Hauling"
      introContent="Construction projects move fast, and delays cost money. Amazing Hauling exists to make sure your hauling partner is never the reason a project slows down. Our fleet supports contractors across Jacksonville and surrounding counties with dependable dump truck hauling and materials transport. Whether you're moving dirt, hauling asphalt, delivering aggregates, or clearing debris from a job site, Amazing Hauling delivers professional service backed by clear communication and dependable scheduling."
      services={[
        {
          title: 'Dirt & Fill Hauling',
          description: 'Transporting fill dirt and excavation material for development projects and site preparation.',
          iconName: 'Mountain',
        },
        {
          title: 'Asphalt Hauling',
          description: 'Supporting paving crews and asphalt plants with reliable transport of hot asphalt and asphalt debris.',
          iconName: 'Route',
        },
        {
          title: 'Rock & Aggregate Delivery',
          description: 'Granite, gravel, crushed stone, and other base materials delivered where you need them.',
          iconName: 'Gem',
        },
        {
          title: 'Milling Debris Removal',
          description: 'Efficient hauling for asphalt milling and roadway resurfacing projects.',
          iconName: 'Trash2',
        },
        {
          title: 'Construction Site Materials',
          description: 'Transporting jobsite materials and debris to keep projects clean and on schedule.',
          iconName: 'Building2',
        },
        {
          title: 'Subcontract Hauling',
          description: 'Additional hauling capacity for larger contractors and construction companies.',
          iconName: 'Handshake',
        },
      ]}
      values={[
        { title: 'Dependability', description: 'When we commit to a job, we show up ready to work. Our clients know they can count on us.', iconName: 'Shield' },
        { title: 'Predictable Service', description: 'Clear communication, reliable scheduling, and no surprises.', iconName: 'Clock' },
        { title: 'Safety Focus', description: 'We operate with strict safety practices that protect drivers, crews, and job sites.', iconName: 'HardHat' },
        { title: 'Local Expertise', description: 'We know Jacksonville and the surrounding counties, allowing us to move materials efficiently across Northeast Florida.', iconName: 'MapPin' },
        { title: 'Family-Owned Accountability', description: 'As a locally owned company, our reputation is everything. We take pride in delivering work that earns repeat business.', iconName: 'Heart' },
      ]}
      stats={[
        { value: 'Family', label: 'Owned & Operated' },
        { value: '3', label: 'Dump Trucks' },
        { value: '4+', label: 'Trucks Planned' },
        { value: 'NE FL', label: 'Service Region' },
        { value: '100%', label: 'Contractor Focus' },
      ]}
      fleet={{
        heading: 'Our Fleet',
        description: 'Amazing Hauling currently operates three professional dump trucks, with plans to expand to four trucks as demand continues to grow. Our drivers bring experience and professionalism to every jobsite, ensuring safe and efficient operations. Whether it\'s a one-day haul or a long-term project, we have the capability to support your work.',
      }}
      projects={[
        { title: 'Road Construction Support', category: 'Road Construction', location: 'Jacksonville, FL', description: 'Supporting roadway construction projects by transporting asphalt, hauling aggregates, and removing construction debris from active job sites.', services: ['Asphalt Hauling', 'Aggregate Transport', 'Debris Removal'] },
        { title: 'Asphalt Paving Operations', category: 'Asphalt Paving', location: 'Duval County, FL', description: 'Helping transport asphalt materials from plants to job sites and assisting with hauling asphalt debris during resurfacing operations.', services: ['Asphalt Hauling', 'Milling Debris'] },
        { title: 'Site Development Projects', category: 'Site Development', location: 'Northeast Florida', description: 'Supporting developers and contractors with dependable dirt hauling services for residential and commercial construction.', services: ['Dirt Hauling', 'Grading Support'] },
        { title: 'Materials Transport', category: 'Materials Transport', location: 'Clay County, FL', description: 'Moving aggregates, gravel, rock, and other construction materials for infrastructure and building projects.', services: ['Aggregate Delivery', 'Rock Transport'] },
      ]}
      serviceAreas={[
        { name: 'Jacksonville', description: 'Center of operations with constant road construction, development projects, and infrastructure improvements.', services: ['Asphalt Paving', 'Road Construction', 'Dirt Hauling', 'Aggregate Delivery'] },
        { name: 'Duval County', description: 'Major construction and infrastructure growth throughout the county.', services: ['Road Construction', 'Residential Development', 'Commercial Construction'] },
        { name: 'Clay County', description: 'Continued growth creating strong demand for construction and development services.', services: ['Dirt Hauling', 'Rock Transport', 'Asphalt Hauling'] },
        { name: 'Nassau County', description: 'Development and infrastructure expansion, particularly around Fernandina Beach.', services: ['Development Support', 'Infrastructure', 'Roadway Improvements'] },
        { name: 'St. Johns County', description: 'One of the fastest-growing areas in Northeast Florida.', services: ['Residential Development', 'Road Construction', 'Commercial Development'] },
      ]}
      additionalAreas={['Keystone Heights', 'Gainesville', "St. Mary's, Georgia"]}
      commitment={{
        heading: 'Our Commitment',
        content: 'Amazing Hauling was built on a simple belief: Reliable service builds lasting relationships. Our goal is to become the hauling partner contractors trust when the job must be done right. Every project we support reflects our commitment to professionalism, safety, and dependable service.',
      }}
    />
  )
}
