import { paragraphsToRichText } from '../richText'

export const projectSeeds = [
  {
    title: 'Road Construction Support',
    slug: 'road-construction-support',
    category: 'road-construction',
    location: 'Jacksonville, FL',
    shortDescription: 'Hauling support for roadway construction crews, aggregates, and project cleanup.',
    description: paragraphsToRichText([
      'Amazing Hauling supports roadway construction teams by moving materials efficiently and keeping active jobsites supplied and clean.',
      'Our work includes asphalt support, aggregate delivery, and debris removal so contractors can keep production on schedule.',
    ]),
    featuredImageKey: 'convoy',
    galleryKeys: ['convoy', 'worksite', 'siteDetail'],
    services: [
      { service: 'Asphalt hauling' },
      { service: 'Aggregate transport' },
      { service: 'Debris removal' },
    ],
    featured: true,
  },
  {
    title: 'Asphalt Paving Operations',
    slug: 'asphalt-paving-operations',
    category: 'asphalt-paving',
    location: 'Duval County, FL',
    shortDescription: 'Responsive hauling support for paving crews and resurfacing work.',
    description: paragraphsToRichText([
      'Paving operations depend on tight coordination, and Amazing Hauling helps keep asphalt moving from plant to project.',
      'We also support resurfacing teams with debris haul-off and reliable communication throughout the job.',
    ]),
    featuredImageKey: 'asphaltAction',
    galleryKeys: ['asphaltAction', 'asphaltPaving', 'convoyAlt'],
    services: [
      { service: 'Hot asphalt transport' },
      { service: 'Debris removal' },
      { service: 'Resurfacing support' },
    ],
    featured: true,
  },
  {
    title: 'Dirt Hauling for Development',
    slug: 'dirt-hauling-for-development',
    category: 'site-development',
    location: 'Northeast Florida',
    shortDescription: 'Consistent dirt hauling for site prep and development projects.',
    description: paragraphsToRichText([
      'Site development requires a hauling partner that can keep up with grading and excavation schedules.',
      'Amazing Hauling helps move spoil, fill, and site materials to keep land development projects advancing efficiently.',
    ]),
    featuredImageKey: 'dirtHaul',
    galleryKeys: ['dirtHaul', 'replacementTruck', 'fieldPhoto'],
    services: [
      { service: 'Residential development' },
      { service: 'Commercial construction' },
      { service: 'Grading and excavation support' },
    ],
    featured: true,
  },
  {
    title: 'Materials Transport',
    slug: 'materials-transport',
    category: 'materials-transport',
    location: 'Clay County, FL',
    shortDescription: 'Aggregate and construction-material hauling that keeps crews supplied.',
    description: paragraphsToRichText([
      'Our materials transport work helps contractors keep stone, gravel, and related construction materials moving where they are needed most.',
      'We support infrastructure, road, and site-prep jobs with dependable jobsite delivery across North Florida.',
    ]),
    featuredImageKey: 'materialsHauling',
    galleryKeys: ['materialsHauling', 'fleetAlt', 'worksite'],
    services: [
      { service: 'Aggregate delivery' },
      { service: 'Gravel transport' },
      { service: 'Rock hauling' },
    ],
    featured: false,
  },
] as const
