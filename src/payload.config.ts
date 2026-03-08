import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Pages } from './payload/collections/Pages'
import { Services } from './payload/collections/Services'
import { Projects } from './payload/collections/Projects'
import { ServiceAreas } from './payload/collections/ServiceAreas'
import { SEOPages } from './payload/collections/SEOPages'
import { Media } from './payload/collections/Media'
import { FormSubmissions } from './payload/collections/FormSubmissions'
import { SubcontractorApplications } from './payload/collections/SubcontractorApplications'
import { HeaderGlobal } from './payload/globals/Header'
import { FooterGlobal } from './payload/globals/Footer'
import { SiteSettings } from './payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    Pages,
    Services,
    Projects,
    ServiceAreas,
    SEOPages,
    Media,
    FormSubmissions,
    SubcontractorApplications,
  ],
  globals: [
    HeaderGlobal,
    FooterGlobal,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'amazing-hauling-dev-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/amazing-hauling',
  }),
  plugins: [],
})
