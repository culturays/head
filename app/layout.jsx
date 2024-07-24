import { getCookie } from 'cookies-next';
import '@/styles/globals.css'
import TagManager from "@/components/TagManager";
import GoogleAnalytics from '@/components/Analytics';
import Script from "next/script";  
import {ContextProvider} from '@/components/ContextProvider'; 
import { Open_Sans, Nokora } from 'next/font/google';
import { Suspense } from 'react';
const noko =Nokora({
  subsets:['latin'], 
   weight:['300', '400', '700'],
   display: 'swap', 
   })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff'},
    { media: '(prefers-color-scheme: dark)', color: '#41414f'},
 
  ],
}
 export const metadata = {
 title:{
  default: 'Culturays',
  template:"%s - Culturays"
 },
 description: 'This is an upcoming new outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',
generator: 'Culturays',
applicationName: 'Culturays',
referrer: 'origin-when-cross-origin',
keywords: ['Africa', 'News', 'Nigeria'],
authors: [{ name: 'Christina Ngene', url: 'https://culturays.com/creator' }],
creator: 'Christina Ngene',
publisher: 'Christina Ngene',
metadataBase: new URL('https://culturays.com'),
openGraph: {
title: 'Culturays',
description: 'This is an upcoming new outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',
url: 'https://culturays.com',
siteName: 'Culturays',
images: [
{
url: 'https://culturays.com/assets/images/culturays.png',  
width: 800,
height: 600,
},
      {
        url: 'https://culturays.com/assets/images/culturays.png', 
        width: 1800,
        height: 1600,
        alt: 'Culturays Image & Logo',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  
  robots: {
    // index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
  //icon: '/assets/icons/favicon-32x32.png',
  //   shortcut: '/assets/icons/favicon-16x16.png',
  //   apple: '/assets/icons/apple-touch-icon.png',
    
  },
  icons: {
    // icon: [
    //   { url: '/assets/icons/favicon-32x32.png' },
    //   new URL('/assets/icons/favicon-32x32.png', 'https://culturays.com'),
    //   { url: '/assets/icons/culturays.png', media: '(prefers-color-scheme: dark)' },
    // ],
    shortcut: ['/assets/icons/favicon-16x16.png'],
    apple: [
      { url: '/assets/icons/apple-touch-icon.png' },
      { url: '/assets/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
 
  },
  alternates: {
    canonical: 'https://www.culturays.com',
    languages: {
      'en-US': '/en-US', 
    },
  },
 manifest: 'https://culturays.com/assets/icons/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'Culturays',
    description: 'This is an upcoming new outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',    
    images: ['https://culturays.com/assets/images/culturays.png'],  
  },
  alternates: { 
    languages: {
      'en-US': 'https://www.culturays.com/en-US', 
    }
  },
    types: {
      'application/rss+xml': 'https://culturays.com/rss',
      // 'application/rss+xml': 'https://culturays.com/rss2',
      // 'application/rss+xml': 'https://culturays.com/rss3',
      // 'application/rss+xml': 'https://culturays.com/rss4',
      // 'application/rss+xml': 'https://culturays.com/rss5',
      // 'application/rss+xml': 'https://culturays.com/rss6',
    },
  },
  verification: {
    google: 'google',  
  },
  
 }
  

export default function RootLayout({ children }) { 
 const GTM_ID = process.env.GTM_ID
 const GA_ID= process.env.GA_ID
 const consent = getCookie('localConsent'); 
  
 return (
    <html lang="en" > 
     <Script async type="text/javascript"  src="//clickiocmp.com/t/consent_234292.js"/> 
     <GoogleAnalytics GA_ID={GA_ID}/>  
    
   {consent === true && (

<Script
  strategy="afterInteractive"
  id='google_analytics_id'
 dangerouslySetInnerHTML={{
  __html: ` 
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
  
    'region': ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
        "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU",
        "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
        "UK", "CH"
    ]
});
` 
}}

>  
</Script> 

 )}   
<body className={noko.className}> 
<Suspense fallback={<p>Loading...</p>}>
 <ContextProvider>   
  <main >  
 {children} 
</main> </ContextProvider> 
</Suspense>
  
</body> 
   <TagManager gtmId={'GTM-W7BMCC9'}/>
</html>
)
}