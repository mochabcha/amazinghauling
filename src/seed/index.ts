// This seed script is intended to be run via the API route at /api/seed
// while the dev server is running. See src/app/(frontend)/api/seed/route.ts
//
// Usage: Start dev server with `npm run dev`, then visit http://localhost:3000/api/seed
//
// The standalone script approach (npx tsx src/seed/index.ts) has issues with
// MongoDB Atlas write persistence when using getPayload in a standalone process.

export { homePageSeed } from './pages/home'
export { servicesPageSeed } from './pages/services'
export { projectsPageSeed } from './pages/projects'
export { aboutPageSeed } from './pages/about'
export { serviceAreasPageSeed } from './pages/service-areas'
export { subcontractorPageSeed } from './pages/subcontractor'
export { contactPageSeed } from './pages/contact'
export { seoPageSeeds } from './pages/seo-cities'
