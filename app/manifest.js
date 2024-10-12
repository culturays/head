export default function manifest() {
    return {
      name: 'Culturays',
      short_name: 'Culturays',
      description: 'This is an upcoming new outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      icons: [
        {
          src: '/assets/icons/favicon.ico',
          sizes:"16x16",
          type: 'image/x-icon',
        },
      ],
    }
  }