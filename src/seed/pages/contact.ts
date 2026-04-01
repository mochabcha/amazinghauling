export const contactPageSeed = {
  title: 'Contact & Request a Quote',
  slug: 'contact',
  layout: [
    {
      blockType: 'hero',
      imageKey: 'worksite',
      badge: 'Get In Touch',
      headingLine1: 'Contact &',
      headingLine2: 'Request a Quote',
      description: 'Need dependable hauling for your next project?',
      short: true,
    },
    {
      blockType: 'quoteForm',
      heading: 'Request Hauling Services',
      description: 'Need dependable hauling for your next project? Amazing Hauling of North Florida provides reliable dump truck and materials hauling services for contractors, construction companies, and development teams throughout Jacksonville and Northeast Florida. Whether you need dirt hauling, asphalt transport, aggregate delivery, or construction site materials moved, our team is ready to help keep your project moving. Complete the form below and a member of our team will contact you as soon as possible.',
    },
    {
      blockType: 'areaCards',
      heading: 'Service Areas',
      description: 'Amazing Hauling proudly serves contractors throughout Northeast Florida.',
      items: [
        { name: 'Jacksonville', services: [{ service: 'All hauling services' }] },
        { name: 'Duval County', services: [{ service: 'All hauling services' }] },
        { name: 'Clay County', services: [{ service: 'All hauling services' }] },
        { name: 'Nassau County', services: [{ service: 'All hauling services' }] },
        { name: 'St. Johns County', services: [{ service: 'All hauling services' }] },
        { name: "St. Mary's, Georgia", services: [{ service: 'Select hauling services' }] },
      ],
    },
    {
      blockType: 'ctaBanner',
      imageKey: 'worksite',
      heading: 'Reliable Hauling When You Need It',
      description: 'Construction projects depend on reliable partners. Amazing Hauling works hard to provide dependable service, clear communication, and professional hauling support for every project. When contractors call Amazing Hauling, they know they are working with a team committed to getting the job done right.',
      primaryCta: 'Call Now',
      primaryCtaLink: 'tel:',
      secondaryCta: 'Email Us',
      secondaryCtaLink: 'mailto:info@amazinghauling.com',
    },
  ],
  meta: {
    title: 'Contact & Request a Quote',
    description: 'Request hauling services from Amazing Hauling. Get a quote for dirt hauling, asphalt transport, aggregate delivery, and construction site materials in Jacksonville and Northeast Florida.',
    imageKey: 'worksite',
  },
}
