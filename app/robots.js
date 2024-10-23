export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow:[ '/privacy-policy','/rss-home', "/404"]
      },
      sitemap: 'https://culturays.com/sitemap.xml',
    }
  }