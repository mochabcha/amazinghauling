import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amazing Hauling of North Florida',
    short_name: 'Amazing Hauling',
    description: 'Reliable dump truck and materials hauling throughout North Florida.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A1628',
    theme_color: '#E8922E',
    icons: [
      {
        src: '/brand/amazing-hauling-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
