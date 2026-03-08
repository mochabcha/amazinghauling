import React from 'react'
import { SubcontractorTemplate } from '@/components/templates/SubcontractorTemplate'

export const metadata = {
  title: 'Subcontractor Resources | Amazing Hauling of North Florida',
  description: 'Partner with Amazing Hauling. Download our subcontractor packet and learn about opportunities for dump truck owners and trucking companies in Northeast Florida.',
}

export default function SubcontractorResourcesPage() {
  return (
    <SubcontractorTemplate
      hero={{
        heading: 'Subcontractor Resources',
        description: 'Partner With Amazing Hauling',
      }}
      introContent="Amazing Hauling of North Florida works with trusted trucking partners to support larger construction and infrastructure projects throughout the region. When projects require additional hauling capacity, we partner with reliable subcontractors to ensure contractors receive the dependable service they expect. If you are a dump truck owner or trucking company interested in working with Amazing Hauling, we welcome the opportunity to partner with you."
      benefits={[
        { title: 'Consistent Work Opportunities', description: 'Large projects often require additional trucks, and we regularly work with subcontract drivers to support project demand.', iconName: 'Briefcase' },
        { title: 'Clear Communication', description: 'We coordinate hauling operations carefully so subcontractors understand expectations, schedules, and project requirements.', iconName: 'MessageSquare' },
        { title: 'Professional Jobsite Standards', description: 'We maintain a high level of professionalism on job sites and expect the same from our subcontract partners.', iconName: 'Award' },
        { title: 'Long-Term Partnerships', description: 'Our goal is to build lasting relationships with dependable trucking professionals who can support projects as our company continues to grow.', iconName: 'Handshake' },
      ]}
      requirements={[
        'Valid commercial driver\'s license (CDL) if required',
        'Properly insured trucks and equipment',
        'Compliance with safety regulations',
        'Professional jobsite conduct',
        'Ability to communicate clearly with dispatch and project supervisors',
      ]}
      contactEmail="info@amazinghauling.com"
      growthContent="Amazing Hauling is a growing company, and strong subcontract partnerships help us support larger projects across Northeast Florida. By working together, we can provide contractors with the dependable hauling capacity they need to complete their projects successfully. If you are a professional truck driver or trucking company looking for new opportunities, we look forward to working with you."
    />
  )
}
