import { paragraphsToRichText } from '../richText'

export const serviceSeeds = [
  {
    title: 'Dirt & Fill Hauling',
    slug: 'dirt-fill-hauling',
    shortDescription: 'Dependable transport for fill dirt, excavation spoil, and site-prep materials across North Florida.',
    fullDescription: paragraphsToRichText([
      'Amazing Hauling supports site development crews with dependable dirt and fill hauling that keeps grading, excavation, and pad preparation moving.',
      'We coordinate closely with contractors to move material safely, efficiently, and on schedule between excavation areas, staging yards, and active jobsites.',
    ]),
    icon: 'Mountain',
    imageKey: 'dirtHaul',
    serviceItems: [
      { item: 'Excavated dirt removal' },
      { item: 'Fill dirt transport' },
      { item: 'Site-prep hauling support' },
      { item: 'Material relocation between jobsites' },
    ],
    order: 1,
  },
  {
    title: 'Asphalt Hauling',
    slug: 'asphalt-hauling',
    shortDescription: 'Reliable support for asphalt plants, paving crews, and resurfacing contractors.',
    fullDescription: paragraphsToRichText([
      'Our asphalt hauling service is built around timing, communication, and consistency so paving crews can stay productive.',
      'Amazing Hauling supports road construction and resurfacing teams with dependable transport from plant to project and efficient debris haul-off when the work is done.',
    ]),
    icon: 'Route',
    imageKey: 'asphaltAction',
    serviceItems: [
      { item: 'Hot asphalt transport' },
      { item: 'Road resurfacing support' },
      { item: 'Asphalt debris hauling' },
      { item: 'Paving logistics coordination' },
    ],
    order: 2,
  },
  {
    title: 'Aggregates & Rock Delivery',
    slug: 'aggregates-rock-delivery',
    shortDescription: 'Jobsite delivery for aggregate, gravel, crushed rock, and base materials.',
    fullDescription: paragraphsToRichText([
      'Construction crews rely on steady material delivery to keep work moving, and we help close that gap with dependable aggregate and rock hauling.',
      'From stone and gravel to base materials, our trucks support roadwork, site prep, and infrastructure jobs throughout Northeast Florida.',
    ]),
    icon: 'Gem',
    imageKey: 'materialsHauling',
    serviceItems: [
      { item: 'Crushed stone delivery' },
      { item: 'Gravel hauling' },
      { item: 'Base material transport' },
      { item: 'Road and site material support' },
    ],
    order: 3,
  },
  {
    title: 'Milling & Road Debris Hauling',
    slug: 'milling-road-debris-hauling',
    shortDescription: 'Fast debris removal for milling, resurfacing, and roadway cleanup operations.',
    fullDescription: paragraphsToRichText([
      'Roadway milling creates constant movement on site, and debris removal has to keep up.',
      'Amazing Hauling supports resurfacing crews with responsive haul-off services that help maintain production and cleaner worksites.',
    ]),
    icon: 'Trash2',
    imageKey: 'asphaltPaving',
    serviceItems: [
      { item: 'Milling debris transport' },
      { item: 'Roadway cleanup hauling' },
      { item: 'Resurfacing debris support' },
      { item: 'Material relocation' },
    ],
    order: 4,
  },
  {
    title: 'Construction Site Materials Transport',
    slug: 'construction-site-materials-transport',
    shortDescription: 'Flexible hauling support for construction materials, debris, and site logistics.',
    fullDescription: paragraphsToRichText([
      'Amazing Hauling helps crews move the materials and debris that keep busy projects organized and productive.',
      'Whether the need is inbound material delivery or outbound haul-off, we provide dependable support tailored to contractor schedules.',
    ]),
    icon: 'Building2',
    imageKey: 'worksite',
    serviceItems: [
      { item: 'Material delivery between sites' },
      { item: 'Construction debris hauling' },
      { item: 'Jobsite logistics support' },
      { item: 'Waste and spoil removal' },
    ],
    order: 5,
  },
  {
    title: 'Subcontract Hauling Services',
    slug: 'subcontract-hauling-services',
    shortDescription: 'Additional hauling capacity for larger contractors and regional project teams.',
    fullDescription: paragraphsToRichText([
      'When prime contractors need more capacity, Amazing Hauling provides dependable subcontract hauling backed by responsive communication and professional drivers.',
      'We fit into active project teams and help extend hauling coverage without creating friction on site.',
    ]),
    icon: 'Handshake',
    imageKey: 'replacementTruckAlt',
    serviceItems: [
      { item: 'Extra hauling capacity' },
      { item: 'Reliable dispatch support' },
      { item: 'Professional drivers and equipment' },
      { item: 'Contractor-focused communication' },
    ],
    order: 6,
  },
] as const
