import { homePageSeed } from './pages/home'
import { servicesPageSeed } from './pages/services'
import { projectsPageSeed } from './pages/projects'
import { aboutPageSeed } from './pages/about'
import { serviceAreasPageSeed } from './pages/service-areas'
import { subcontractorPageSeed } from './pages/subcontractor'
import { contactPageSeed } from './pages/contact'
import { seoPageSeeds } from './pages/seo-cities'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const allPages = [
  homePageSeed,
  servicesPageSeed,
  projectsPageSeed,
  aboutPageSeed,
  serviceAreasPageSeed,
  subcontractorPageSeed,
  contactPageSeed,
  ...seoPageSeeds,
]

async function login(): Promise<string> {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@amazinghauling.com', password: 'AmazingHauling2026!' }),
  })
  if (!res.ok) {
    // Try creating the user first
    console.log('Creating admin user...')
    const createRes = await fetch(`${BASE}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@amazinghauling.com', password: 'AmazingHauling2026!', name: 'Admin' }),
    })
    if (!createRes.ok) throw new Error(`Failed to create user: ${await createRes.text()}`)
    const createData = await createRes.json()
    console.log('✅ Admin user created')
    return createData.token || ''
  }
  const data = await res.json()
  return data.token
}

async function seedPage(token: string, page: typeof allPages[number]) {
  // Check if page exists
  const checkRes = await fetch(`${BASE}/api/pages?where[slug][equals]=${encodeURIComponent(page.slug)}&limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const checkData = await checkRes.json()

  if (checkData.totalDocs > 0) {
    // Update
    const id = checkData.docs[0].id
    const res = await fetch(`${BASE}/api/pages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(page),
    })
    if (!res.ok) console.error(`❌ Failed to update ${page.title}: ${res.status}`)
    else console.log(`🔄 Updated: ${page.title}`)
  } else {
    // Create
    const res = await fetch(`${BASE}/api/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(page),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error(`❌ Failed to create ${page.title}: ${res.status} ${text.substring(0, 200)}`)
    } else {
      console.log(`✅ Created: ${page.title}`)
    }
  }
}

async function seed() {
  console.log(`🌱 Seeding via REST API at ${BASE}...`)

  const token = await login()
  console.log('🔑 Authenticated')

  for (const page of allPages) {
    await seedPage(token, page)
  }

  // Verify
  const verifyRes = await fetch(`${BASE}/api/pages?limit=0`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const verifyData = await verifyRes.json()
  console.log(`📊 Total pages: ${verifyData.totalDocs}`)
  console.log('🌱 Seed complete!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
