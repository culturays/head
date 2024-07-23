export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow:[ '/admin', '/privacy-policy']
      },
      sitemap: 'https://culturays.com/sitemap.xml',
    }
  }