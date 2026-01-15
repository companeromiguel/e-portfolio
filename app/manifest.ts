import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Miguel Compañero Portfolio',
    short_name: 'Miguel Portfolio',
    description: 'BS Information Technology student specializing in web development, database management, and UI/UX design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050805',
    theme_color: '#22c55e',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
