export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow:[ '/privacy-policy']
      },
      sitemap: 'https://culturays.com/sitemap.xml',
    }
  }