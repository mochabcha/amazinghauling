import React from 'react'
import { notFound } from 'next/navigation'
import { SEOCityTemplate } from '@/components/templates/SEOCityTemplate'

const seoPageData: Record<string, {
  title: string
  city: string
  county?: string
  heroHeading: string
  heroDescription: string
  sections: Array<{ heading: string; content: string; items?: string[] }>
  whyChoose?: Array<{ title: string; description: string }>
}> = {
  jacksonville: {
    title: 'Jacksonville Dump Truck Hauling',
    city: 'Jacksonville',
    county: 'Duval County',
    heroHeading: 'Jacksonville Dump Truck Hauling',
    heroDescription: 'Reliable Dump Truck Hauling in Jacksonville, Florida',
    sections: [
      { heading: 'Reliable Dump Truck Hauling in Jacksonville, Florida', content: 'Amazing Hauling of North Florida provides dependable dump truck and materials hauling services throughout Jacksonville. From road construction and asphalt paving to site development and land clearing, contractors rely on dependable hauling partners to keep their projects moving. Amazing Hauling delivers reliable hauling support backed by professional drivers, responsive scheduling, and clear communication. Our trucks regularly operate across Jacksonville supporting construction projects, infrastructure improvements, and development sites throughout the city.' },
      { heading: 'Hauling Services in Jacksonville', content: 'Amazing Hauling supports contractors throughout Jacksonville with a wide range of hauling services.', items: ['Dirt hauling and fill material transport', 'Asphalt hauling for paving projects', 'Rock and aggregate delivery', 'Milling debris hauling', 'Construction site material transport', 'Jobsite debris removal'] },
      { heading: 'Supporting Jacksonville Construction Projects', content: 'Jacksonville continues to experience strong growth with new infrastructure projects, residential developments, and commercial construction across the city. Amazing Hauling works alongside contractors to help move the materials that support this growth. Our drivers understand the demands of active job sites and work carefully to ensure materials are transported safely and on time.' },
    ],
    whyChoose: [
      { title: 'Dependable Scheduling', description: 'We commit to schedules and show up ready to work.' },
      { title: 'Professional Drivers', description: 'Experienced operators who understand jobsite demands.' },
      { title: 'Safe Operations', description: 'Strict safety practices on every project.' },
      { title: 'Clear Communication', description: 'You always know the status of your hauling.' },
      { title: 'Reliable Equipment', description: 'Well-maintained fleet ready for any project.' },
    ],
  },
  'fernandina-beach': {
    title: 'Dirt Hauling in Fernandina Beach',
    city: 'Fernandina Beach',
    county: 'Nassau County',
    heroHeading: 'Dirt Hauling in Fernandina Beach',
    heroDescription: 'Dirt Hauling Services in Fernandina Beach, Florida',
    sections: [
      { heading: 'Dirt Hauling Services in Fernandina Beach, Florida', content: 'Fernandina Beach and Nassau County continue to experience strong development growth, creating demand for reliable hauling services. Amazing Hauling provides dependable dirt hauling services for contractors and development projects throughout Fernandina Beach and surrounding areas. Our fleet helps contractors move dirt, fill materials, and aggregates efficiently so projects can stay on schedule.' },
      { heading: 'Dirt & Fill Hauling for Development Projects', content: 'Development projects in Fernandina Beach often require moving large volumes of dirt and fill material during excavation and site preparation. Amazing Hauling supports these projects by providing reliable hauling.', items: ['Excavated dirt removal', 'Fill dirt transport', 'Construction site dirt hauling', 'Development site preparation', 'Land clearing projects'] },
      { heading: 'Reliable Hauling for Nassau County Contractors', content: 'Amazing Hauling is proud to support construction crews and developers working throughout Nassau County. Our hauling services help contractors complete projects faster by providing dependable trucking support when materials need to be moved quickly.' },
    ],
  },
  'orange-park': {
    title: 'Dump Truck Services in Orange Park',
    city: 'Orange Park',
    county: 'Clay County',
    heroHeading: 'Dump Truck Services in Orange Park',
    heroDescription: 'Dump Truck Hauling in Orange Park, Florida',
    sections: [
      { heading: 'Dump Truck Hauling in Orange Park, Florida', content: 'Orange Park and Clay County continue to grow through residential development and infrastructure improvements. Amazing Hauling provides dependable dump truck hauling services for contractors working throughout Orange Park and nearby communities. Our trucks help transport the materials that keep construction projects moving forward.' },
      { heading: 'Materials Hauling Services in Orange Park', content: 'Amazing Hauling provides hauling services for a variety of construction materials.', items: ['Dirt and fill material', 'Rock and aggregates', 'Asphalt materials', 'Construction debris', 'Milling debris'] },
      { heading: 'Construction Support for Clay County', content: 'Clay County contractors rely on dependable hauling partners to move materials safely and efficiently between job sites. Amazing Hauling works alongside construction teams to ensure materials arrive when they are needed.' },
    ],
  },
  'st-augustine': {
    title: 'Aggregate Hauling in St. Augustine',
    city: 'St. Augustine',
    county: 'St. Johns County',
    heroHeading: 'Aggregate Hauling in St. Augustine',
    heroDescription: 'Aggregate Delivery & Hauling in St. Augustine, Florida',
    sections: [
      { heading: 'Aggregate Delivery & Hauling in St. Augustine, Florida', content: 'St. Augustine and St. Johns County continue to see strong residential and commercial development. Amazing Hauling provides reliable aggregate hauling services for contractors working on construction and infrastructure projects throughout St. Augustine. Our trucks transport the materials needed to support development projects across the region.' },
      { heading: 'Aggregates We Haul', content: 'Amazing Hauling regularly transports construction aggregates.', items: ['Granite stone', 'Gravel', 'Crushed rock', 'Base materials', 'Construction aggregates'] },
      { heading: 'Supporting Construction Projects in St. Johns County', content: 'Our team works closely with contractors to provide dependable hauling services that support development projects across St. Johns County. We focus on providing professional service that contractors can trust.' },
    ],
  },
  yulee: {
    title: 'Dump Truck Hauling in Yulee',
    city: 'Yulee',
    county: 'Nassau County',
    heroHeading: 'Dump Truck Hauling in Yulee',
    heroDescription: 'Dump Truck Services in Yulee, Florida',
    sections: [
      { heading: 'Dump Truck Services in Yulee, Florida', content: 'Yulee is one of the fastest growing communities in Nassau County, with new residential developments and infrastructure projects taking place throughout the area. Amazing Hauling provides dependable dump truck hauling services for contractors working on development projects in Yulee.' },
      { heading: 'Construction Hauling Services in Yulee', content: 'Our hauling services support contractors with transporting materials needed for development and construction projects.', items: ['Dirt hauling', 'Aggregate delivery', 'Asphalt hauling', 'Construction debris removal', 'Jobsite materials transport'] },
      { heading: 'Reliable Hauling for Nassau County Projects', content: 'Amazing Hauling works alongside contractors throughout Nassau County to ensure construction projects have dependable hauling support. Our drivers understand the importance of reliable service and professional jobsite conduct.' },
    ],
  },
}

interface PageParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(seoPageData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params
  const data = seoPageData[slug]
  if (!data) return { title: 'Page Not Found' }
  return {
    title: `${data.title} | Amazing Hauling of North Florida`,
    description: data.heroDescription,
  }
}

export default async function SEOCityPage({ params }: PageParams) {
  const { slug } = await params
  const data = seoPageData[slug]
  if (!data) notFound()

  return (
    <SEOCityTemplate
      hero={{
        heading: data.heroHeading,
        description: data.heroDescription,
      }}
      city={data.city}
      county={data.county}
      sections={data.sections}
      whyChoose={data.whyChoose}
    />
  )
}
