import { sharedMediaKeys } from '@/lib/sharedMedia'

export const workWithUsPageSeed = {
  title: 'Work With Us',
  slug: 'work-with-us',
  layout: [
    {
      blockType: 'hero',
      imageKey: sharedMediaKeys.fleet,
      headingLine1: 'Work With Us',
      headingLine2: 'At Amazing Hauling',
      description: 'We are always looking for dependable drivers and owner-operators who take safety, communication, and jobsite professionalism seriously.',
      primaryCta: 'Start Application',
      primaryCtaLink: '#work-application',
      secondaryCta: 'Request a Quote',
      secondaryCtaLink: '/contact',
      short: true,
    },
    {
      blockType: 'textBlock',
      imageKey: sharedMediaKeys.fieldPhoto,
      badge: 'Drivers & Owner-Operators',
      heading: 'Apply to Drive or Lease On With Amazing Hauling',
      body: 'Use this page if you want to join Amazing Hauling as a company driver or as an owner-operator looking to lease on your truck. We are looking for applicants who show up on time, communicate clearly, operate safely, and understand the pace of construction hauling in Northeast Florida.',
      centered: false,
      background: 'white',
    },
    {
      blockType: 'workApplicationForm',
      heading: 'Join the Amazing Hauling Team',
      description: 'Complete the application below and send us the information we need to review your experience, availability, and equipment details.',
      sectionId: 'work-application',
    },
  ],
  meta: {
    title: 'Work With Us | Amazing Hauling of North Florida',
    description: 'Apply to work with Amazing Hauling as a driver or owner-operator in Northeast Florida.',
    imageKey: 'fleet',
  },
}
