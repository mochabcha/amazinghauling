import type { CollectionConfig } from 'payload'

const HeroBlock = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'badge', type: 'text' as const, label: 'Badge / Eyebrow' },
    { name: 'headingLine1', type: 'text' as const, label: 'Heading Line 1' },
    { name: 'headingLine2', type: 'text' as const, label: 'Heading Line 2' },
    { name: 'headingLine3', type: 'text' as const, label: 'Heading Line 3' },
    { name: 'description', type: 'textarea' as const },
    { name: 'image', type: 'upload' as const, relationTo: 'media' as const },
    { name: 'primaryCta', type: 'text' as const, label: 'Primary CTA Label' },
    { name: 'primaryCtaLink', type: 'text' as const, label: 'Primary CTA Link' },
    { name: 'secondaryCta', type: 'text' as const, label: 'Secondary CTA Label' },
    { name: 'secondaryCtaLink', type: 'text' as const, label: 'Secondary CTA Link' },
    { name: 'short', type: 'checkbox' as const, defaultValue: false, label: 'Short Hero (60vh)' },
  ],
}

const ContentSplitBlock = {
  slug: 'contentSplit',
  labels: { singular: 'Content Split', plural: 'Content Splits' },
  fields: [
    { name: 'badge', type: 'text' as const, label: 'Eyebrow / Badge' },
    { name: 'heading', type: 'text' as const },
    { name: 'body', type: 'textarea' as const },
    { name: 'image', type: 'upload' as const, relationTo: 'media' as const },
    { name: 'ctaLabel', type: 'text' as const, label: 'CTA Label' },
    { name: 'ctaLink', type: 'text' as const, label: 'CTA Link' },
    { name: 'reverse', type: 'checkbox' as const, defaultValue: false, label: 'Reverse (image right)' },
    { name: 'overlap', type: 'checkbox' as const, defaultValue: true, label: 'Overlap Effect' },
    { name: 'background', type: 'select' as const, defaultValue: 'white', options: [
      { label: 'White', value: 'white' },
      { label: 'Cream', value: 'cream' },
      { label: 'Black', value: 'black' },
    ]},
  ],
}

const TextBlock = {
  slug: 'textBlock',
  labels: { singular: 'Text Block', plural: 'Text Blocks' },
  fields: [
    { name: 'badge', type: 'text' as const, label: 'Eyebrow' },
    { name: 'heading', type: 'text' as const },
    { name: 'body', type: 'textarea' as const },
    { name: 'image', type: 'upload' as const, relationTo: 'media' as const },
    { name: 'ctaLabel', type: 'text' as const },
    { name: 'ctaLink', type: 'text' as const },
    { name: 'centered', type: 'checkbox' as const, defaultValue: false },
    { name: 'background', type: 'select' as const, defaultValue: 'white', options: [
      { label: 'White', value: 'white' },
      { label: 'Cream', value: 'cream' },
      { label: 'Black', value: 'black' },
      { label: 'Off White', value: 'offWhite' },
    ]},
  ],
}

const ValuesGridBlock = {
  slug: 'valuesGrid',
  labels: { singular: 'Values Grid', plural: 'Values Grids' },
  fields: [
    { name: 'heading', type: 'text' as const },
    { name: 'description', type: 'textarea' as const },
    { name: 'columns', type: 'select' as const, defaultValue: '3', options: [
      { label: '2 Columns', value: '2' },
      { label: '3 Columns', value: '3' },
      { label: '4 Columns', value: '4' },
    ]},
    { name: 'background', type: 'select' as const, defaultValue: 'cream', options: [
      { label: 'White', value: 'white' },
      { label: 'Cream', value: 'cream' },
    ]},
    { name: 'items', type: 'array' as const, fields: [
      { name: 'icon', type: 'text' as const, label: 'Icon Name (Lucide)' },
      { name: 'title', type: 'text' as const },
      { name: 'description', type: 'textarea' as const },
    ]},
  ],
}

const StatsBarBlock = {
  slug: 'statsBar',
  labels: { singular: 'Stats Bar', plural: 'Stats Bars' },
  fields: [
    { name: 'items', type: 'array' as const, fields: [
      { name: 'value', type: 'text' as const },
      { name: 'label', type: 'text' as const },
    ]},
  ],
}

const ServiceCardsBlock = {
  slug: 'serviceCards',
  labels: { singular: 'Service Cards', plural: 'Service Cards' },
  fields: [
    { name: 'heading', type: 'text' as const },
    { name: 'description', type: 'textarea' as const },
    { name: 'items', type: 'array' as const, fields: [
      { name: 'icon', type: 'text' as const, label: 'Icon Name (Lucide)' },
      { name: 'title', type: 'text' as const },
      { name: 'description', type: 'textarea' as const },
      { name: 'bulletPoints', type: 'array' as const, fields: [
        { name: 'item', type: 'text' as const },
      ]},
    ]},
  ],
}

const ProjectGridBlock = {
  slug: 'projectGrid',
  labels: { singular: 'Project Grid', plural: 'Project Grids' },
  fields: [
    { name: 'heading', type: 'text' as const },
    { name: 'items', type: 'array' as const, fields: [
      { name: 'title', type: 'text' as const },
      { name: 'category', type: 'text' as const },
      { name: 'location', type: 'text' as const },
      { name: 'description', type: 'textarea' as const },
      { name: 'image', type: 'upload' as const, relationTo: 'media' as const },
      { name: 'services', type: 'array' as const, fields: [
        { name: 'service', type: 'text' as const },
      ]},
    ]},
  ],
}

const CtaBannerBlock = {
  slug: 'ctaBanner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'heading', type: 'text' as const },
    { name: 'description', type: 'textarea' as const },
    { name: 'primaryCta', type: 'text' as const },
    { name: 'primaryCtaLink', type: 'text' as const },
    { name: 'secondaryCta', type: 'text' as const },
    { name: 'secondaryCtaLink', type: 'text' as const },
    { name: 'image', type: 'upload' as const, relationTo: 'media' as const },
  ],
}

const AreaCardsBlock = {
  slug: 'areaCards',
  labels: { singular: 'Area Cards', plural: 'Area Cards' },
  fields: [
    { name: 'heading', type: 'text' as const },
    { name: 'description', type: 'textarea' as const },
    { name: 'items', type: 'array' as const, fields: [
      { name: 'name', type: 'text' as const },
      { name: 'description', type: 'textarea' as const },
      { name: 'href', type: 'text' as const, label: 'Link URL' },
      { name: 'services', type: 'array' as const, fields: [
        { name: 'service', type: 'text' as const },
      ]},
    ]},
    { name: 'additionalAreas', type: 'array' as const, fields: [
      { name: 'name', type: 'text' as const },
    ]},
  ],
}

const QuoteFormBlock = {
  slug: 'quoteForm',
  labels: { singular: 'Quote Form', plural: 'Quote Forms' },
  fields: [
    { name: 'heading', type: 'text' as const },
    { name: 'description', type: 'textarea' as const },
  ],
}

const FleetBlock = {
  slug: 'fleet',
  labels: { singular: 'Fleet Section', plural: 'Fleet Sections' },
  fields: [
    { name: 'heading', type: 'text' as const },
    { name: 'body', type: 'textarea' as const },
    { name: 'image', type: 'upload' as const, relationTo: 'media' as const },
    { name: 'metrics', type: 'array' as const, fields: [
      { name: 'icon', type: 'text' as const },
      { name: 'value', type: 'text' as const },
      { name: 'label', type: 'text' as const },
    ]},
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout',
      blocks: [
        HeroBlock,
        ContentSplitBlock,
        TextBlock,
        ValuesGridBlock,
        StatsBarBlock,
        ServiceCardsBlock,
        ProjectGridBlock,
        CtaBannerBlock,
        AreaCardsBlock,
        QuoteFormBlock,
        FleetBlock,
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', label: 'Meta Title' },
        { name: 'description', type: 'textarea', label: 'Meta Description' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
  ],
}
