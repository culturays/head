export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow:[ '/privacy-policy','/rss']
      },
      sitemap: 'https://culturays.com/sitemap.xml',
    }
  }