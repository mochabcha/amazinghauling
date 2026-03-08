import React from 'react'
import { ServicesTemplate } from '@/components/templates/ServicesTemplate'

export const metadata = {
  title: 'Hauling Services | Amazing Hauling of North Florida',
  description: 'Dependable dump truck hauling services for contractors in Jacksonville and Northeast Florida. Dirt, asphalt, aggregates, milling debris, and construction materials hauling.',
}

export default function ServicesPage() {
  return (
    <ServicesTemplate
      hero={{
        heading: 'Reliable Materials Hauling Services',
        description: 'Amazing Hauling of North Florida provides dependable dump truck hauling services for contractors, construction crews, and development teams throughout Jacksonville and Northeast Florida.',
      }}
      introHeading="Reliable Materials Hauling Services"
      introContent="We understand that hauling is a critical part of keeping projects moving forward. Our team focuses on safe operations, predictable scheduling, and clear communication, ensuring every job runs smoothly from start to finish. Whether you need dirt transported, asphalt delivered, or aggregates hauled to a job site, Amazing Hauling is ready to support your project."
      services={[
        { title: 'Dirt & Fill Hauling', description: 'Site preparation and development projects often require moving large amounts of dirt and fill material.', iconName: 'Mountain', items: ['Excavated dirt removal', 'Fill dirt transport', 'Construction site dirt hauling', 'Land development site support', 'Dirt relocation between job sites'] },
        { title: 'Asphalt Hauling', description: 'Road construction and paving operations rely on dependable hauling partners to move asphalt efficiently.', iconName: 'Route', items: ['Hot asphalt transport from plants to job sites', 'Asphalt debris hauling', 'Road resurfacing support', 'Asphalt paving project logistics'] },
        { title: 'Aggregates & Rock Delivery', description: 'Construction projects require a steady supply of aggregate materials.', iconName: 'Gem', items: ['Granite stone', 'Gravel', 'Crushed rock', 'Base materials', 'Construction aggregates'] },
        { title: 'Milling & Road Debris Hauling', description: 'Road resurfacing and asphalt milling operations produce large volumes of debris that must be removed quickly.', iconName: 'Trash2', items: ['Asphalt milling debris transport', 'Road resurfacing support', 'Roadway cleanup hauling', 'Material relocation from milling operations'] },
        { title: 'Construction Site Materials Transport', description: 'Many projects require ongoing hauling of materials between sites, suppliers, and staging areas.', iconName: 'Building2', items: ['Jobsite material delivery', 'Debris hauling', 'Construction waste removal', 'Site logistics support'] },
        { title: 'Subcontract Hauling Services', description: 'Large projects often require additional hauling capacity.', iconName: 'Handshake', items: ['Additional hauling trucks when needed', 'Reliable scheduling support', 'Professional drivers and equipment', 'Consistent communication throughout the project'] },
      ]}
      serviceDetails={[
        { heading: 'Dirt & Fill Hauling', content: 'Site preparation and development projects often require moving large amounts of dirt and fill material. Amazing Hauling provides efficient dirt hauling services for contractors working on residential developments, commercial construction sites, and land clearing projects. Our fleet ensures that dirt and fill materials are transported quickly and safely so grading and construction work can continue without delay.', items: ['Excavated dirt removal', 'Fill dirt transport', 'Construction site dirt hauling', 'Land development site support', 'Dirt relocation between job sites'] },
        { heading: 'Asphalt Hauling', content: 'Road construction and paving operations rely on dependable hauling partners to move asphalt efficiently. Amazing Hauling supports asphalt contractors and road crews by transporting asphalt materials and assisting with roadway construction logistics. Our drivers understand the time-sensitive nature of asphalt work and prioritize reliable delivery to keep paving operations on schedule.', items: ['Hot asphalt transport from plants to job sites', 'Asphalt debris hauling', 'Road resurfacing support', 'Asphalt paving project logistics'] },
        { heading: 'Aggregates & Rock Delivery', content: 'Construction projects require a steady supply of aggregate materials. Amazing Hauling provides dependable delivery of aggregates including granite, gravel, and crushed stone used in road construction and site development. Reliable materials delivery helps contractors maintain project timelines and avoid costly delays.', items: ['Granite stone', 'Gravel', 'Crushed rock', 'Base materials', 'Construction aggregates'] },
        { heading: 'Milling & Road Debris Hauling', content: 'Road resurfacing and asphalt milling operations produce large volumes of debris that must be removed quickly. Amazing Hauling supports milling crews by hauling away asphalt millings and roadway debris so projects can move efficiently. We work alongside road crews to ensure materials are removed safely and efficiently.', items: ['Asphalt milling debris transport', 'Road resurfacing support', 'Roadway cleanup hauling', 'Material relocation from milling operations'] },
        { heading: 'Construction Site Materials Transport', content: 'Many projects require ongoing hauling of materials between sites, suppliers, and staging areas. Amazing Hauling provides dependable jobsite transport services that keep construction crews supplied with the materials they need. Our goal is to help contractors focus on their work while we handle the hauling.', items: ['Jobsite material delivery', 'Debris hauling', 'Construction waste removal', 'Site logistics support'] },
        { heading: 'Subcontract Hauling Services', content: 'Large projects often require additional hauling capacity. Amazing Hauling works as a subcontractor for larger contractors and construction companies that need reliable trucking support. Our subcontract hauling services allow project managers to scale their hauling capacity quickly without compromising quality or reliability.', items: ['Additional hauling trucks when needed', 'Reliable scheduling support', 'Professional drivers and equipment', 'Consistent communication throughout the project'] },
      ]}
      industries={[
        'Road Construction Contractors',
        'Asphalt Paving Companies',
        'Site Development Companies',
        'Residential Developers',
        'Commercial Construction Teams',
        'Municipal Infrastructure Projects',
      ]}
      safetyContent="Safety is a core part of how Amazing Hauling operates. Our drivers follow strict safety practices while operating on job sites, roadways, and construction environments. We are committed to professional jobsite conduct, safe equipment operation, compliance with industry standards, and protecting crews and communities. Contractors can trust that Amazing Hauling operates with professionalism and responsibility on every project."
    />
  )
}
