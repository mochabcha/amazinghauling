import { resolveSharedMediaUrl, sharedMediaKeys } from '@/lib/sharedMedia'

type BlockRecord = {
  blockType: string
  id?: string | null
  [key: string]: unknown
}

type PageRecord = {
  title: string
  slug: string
  layout?: BlockRecord[] | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: unknown
  } | null
}

const workWithUsFallback: PageRecord = {
  title: 'Work With Us',
  slug: 'work-with-us',
  layout: [
    {
      blockType: 'hero',
      image: resolveSharedMediaUrl(sharedMediaKeys.fleet),
      headingLine1: 'Work With Us',
      headingLine2: 'At Amazing Hauling',
      description:
        'We are always looking for dependable drivers and owner-operators who take safety, communication, and jobsite professionalism seriously.',
      primaryCta: 'Start Application',
      primaryCtaLink: '#work-application',
      secondaryCta: 'Request a Quote',
      secondaryCtaLink: '/contact',
      short: true,
    },
    {
      blockType: 'textBlock',
      image: resolveSharedMediaUrl(sharedMediaKeys.fieldPhoto),
      badge: 'Drivers & Owner-Operators',
      heading: 'Apply to Drive or Lease On With Amazing Hauling',
      body:
        'Use this page if you want to join Amazing Hauling as a company driver or as an owner-operator looking to lease on your truck. We are looking for applicants who show up on time, communicate clearly, operate safely, and understand the pace of construction hauling in Northeast Florida.',
      centered: false,
      background: 'white',
    },
    {
      blockType: 'workApplicationForm',
      heading: 'Join the Amazing Hauling Team',
      description:
        'Complete the application below and send us the information we need to review your experience, availability, and equipment details.',
      sectionId: 'work-application',
    },
  ],
  meta: {
    title: 'Work With Us | Amazing Hauling of North Florida',
    description: 'Apply to work with Amazing Hauling as a driver or owner-operator in Northeast Florida.',
  },
}

function normalizeHomeLayout(layout: BlockRecord[] | null | undefined) {
  if (!layout?.length) {
    return layout
  }

  const nextLayout = layout.map((block, index) => {
    if (index === 0 && block.blockType === 'hero') {
      return {
        ...block,
        badge: '',
      }
    }

    return block
  })
  return stripTerminalPrefooterBlocks(nextLayout)
}

function stripTerminalPrefooterBlocks(layout: BlockRecord[] | null | undefined) {
  if (!layout?.length) {
    return layout
  }

  const nextLayout = [...layout]

  while (nextLayout.length > 0) {
    const lastBlock = nextLayout[nextLayout.length - 1]

    if (lastBlock?.blockType === 'ctaBanner' || lastBlock?.blockType === 'splitCtaBanner') {
      nextLayout.pop()
      continue
    }

    break
  }

  return nextLayout
}

export function withPageFallbacks(page: PageRecord | null, slug: string): PageRecord | null {
  if (!page && slug === 'work-with-us') {
    return workWithUsFallback
  }

  if (!page) {
    return null
  }

  if (slug === 'home') {
    return {
      ...page,
      layout: normalizeHomeLayout(page.layout),
    }
  }

  return page
    ? {
        ...page,
        layout: stripTerminalPrefooterBlocks(page.layout),
      }
    : null
}

export function withRequiredNavItems<T extends { label: string; href: string }>(navItems: T[] | null | undefined) {
  const base = navItems?.length ? [...navItems] : []
  const required = { label: 'Work With Us', href: '/work-with-us' } as T

  if (!base.some((item) => item.href === required.href)) {
    const contactIndex = base.findIndex((item) => item.href === '/contact')
    if (contactIndex >= 0) {
      base.splice(contactIndex, 0, required)
    } else {
      base.push(required)
    }
  }

  return base
}

export function withRequiredFooterLinks<T extends { label: string; href: string }>(
  columns: Array<{ title: string; links: T[] }> | null | undefined,
) {
  if (!columns?.length) {
    return columns
  }

  return columns.map((column) => {
    if (column.title !== 'Company') {
      return column
    }

    if (column.links.some((link) => link.href === '/work-with-us')) {
      return column
    }

    const nextLinks = [...column.links]
    const contactIndex = nextLinks.findIndex((link) => link.href === '/contact')

    if (contactIndex >= 0) {
      nextLinks.splice(contactIndex, 0, { label: 'Work With Us', href: '/work-with-us' } as T)
    } else {
      nextLinks.push({ label: 'Work With Us', href: '/work-with-us' } as T)
    }

    return {
      ...column,
      links: nextLinks,
    }
  })
}
