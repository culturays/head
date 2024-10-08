import { getCookie } from 'cookies-next';
import '@/styles/globals.css'
import TagManager from "@/components/TagManager";
import GoogleAnalytics from '@/components/Analytics';
import Script from "next/script";   
import { Open_Sans, Nokora } from 'next/font/google';
import { Suspense } from 'react'; 
import Footer from '@/components/Footer';
import { headers } from "next/headers";
import SocialNav from "@/components/SocialNav"
import Header from '@/components/Header';
import AuthButton from '@/app/AuthButton';
import Nav from '@/components/Nav';
import SearchItems from '@/components/SearchItems'; 
import TabNav from '@/components/TabNav';
import Latests from '@/components/Latests';
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
  

export default function RootLayout({ children  }) { 
 const GTM_ID = process.env.GTM_ID
 const GA_ID= process.env.GA_ID
 const consent = getCookie('localConsent'); 
//  const headersList = new URL(headers().get('x-url') )
 const url = new URL(headers()?.get('pathname')); 
const { searchParams } = new URL(url);  
const pathname=url.pathname
const confirmParam= searchParams?.get("confirm")
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
     <Script async type="text/javascript" src="//clickiocmp.com/t/consent_234292.js"/> 
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
<body className={` ${noko.className}` } > 
  <main >
  <Header item={`| ${pathname.split('/')[1]}` }/> 
 <SocialNav/> 
 <AuthButton confirmParam={confirmParam} /> 
 <Nav /> 
 <SearchItems />
 <TabNav/>
 <Suspense fallback={<p>Loading...</p>}>  
    {children} 
</Suspense>
  <Latests/> 
</main>
 <Footer/> 
</body> 
   <TagManager gtmId={'GTM-W7BMCC9'}/>
 
</html>
)
}