import { getCookie } from 'cookies-next';
import '@/styles/globals.css'
import TagManager from "@/components/TagManager";
import GoogleAnalytics from '@/components/Analytics';
import Script from "next/script";   
import { Open_Sans, Nokora } from 'next/font/google';
import Footer from '@/components/Footer';
import SocialNav from "@/components/SocialNav"
import Header from '@/components/Header';
import AuthButton from '@/app/AuthButton';
import Nav from '@/components/Nav';
import SearchItems from '@/components/SearchItems'; 
import TabNav from '@/components/TabNav';
import Latests from '@/components/Latests'; 
import { Suspense } from 'react';
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/` 
  : "http://localhost:3000/";

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
  template:"%s | Culturays"
 },
description: 'This is an upcoming new outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',
generator: 'Culturays',
applicationName: 'Culturays',
referrer: 'origin-when-cross-origin',
keywords: ['Africa', 'News', 'Nigeria', 'Nollywood', 'Netflix Naija', 'Business', 'Movies'],
authors: [{ name: 'Christina Ngene', url: 'https://culturays.com/creator/christina-ngene' }],
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
alt: 'Culturays Image & Logo',
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
  },
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
    // icon: [
    //   { url: '/favicon-32x32.png' },
    //   new URL('/assets/icons/favicon-32x32.png', 'https://culturays.com'),
    //   { url: '/assets/icons/culturays.png', media: '(prefers-color-scheme: dark)' },
    // ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/favicon.ico' },
      // { url: '/assets/icons/favicon.ico', sizes: '180x180' },
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
  
  verification: {
    google: 'google',  
  },
  alternates: {
    types: {
      'application/rss+xml':`${defaultUrl}/rss.xml`,
      'application/rss+xml':`${defaultUrl}/rss1.xml`,
      'application/rss+xml': `${defaultUrl}/rss2.xml`,
      'application/rss+xml': `${defaultUrl}/rss3.xml`,
      'application/rss+xml': `${defaultUrl}/rss4.xml`, 
    },
  },
 }
  

export default  function RootLayout({ children }) { 
 const GTM_ID = process.env.GTM_ID
 const GA_ID= process.env.GA_ID
 const consent = getCookie('localConsent'); 
  //console.log(JSON.stringify(Array.from(headersList.entries()), null, 2))

  function transformString(inputStr) { 
    inputStr = inputStr.replace(/^\/|\/$/g, ''); 
    inputStr = inputStr.replace(/-/g, ' '); 
    inputStr = inputStr.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    });
    return inputStr;
} 

 return (
    <html lang="en" > 
        <Script async type="text/javascript"strategy="afterInteractive" src="//clickiocmp.com/t/consent_234292.js"/>  
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
<body className={`${noko.className}` }> 
<Header/>  
<SocialNav/>
<AuthButton/>  
<Nav /> 
<SearchItems />  
 <TabNav/> 
<Suspense fallback={<div>Loading...</div>}>  
{children}
</Suspense> 
  <Latests/> 
<Footer/>  
</body> 
<TagManager gtmId={'GTM-W7BMCC9'}/>  
</html>
)
}