export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow:[ '/privacy-policy','/rss-home']
      },
      sitemap: 'https://culturays.com/sitemap.xml',
    }
  }