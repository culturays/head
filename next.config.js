/** @type {import('next').NextConfig} */
const nextConfig = {
  
    env: {
        GOOGLE_AUTH_CLIENT_ID:process.env.GOOGLE_AUTH_CLIENT_ID,
        GOOGLE_AUTH_CLIENT_SECRET:process.env.GOOGLE_AUTH_CLIENT_SECRET,
        NEXT_PUBLIC_SUPABASE_ANON_KEY:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_SUPABASE_URL:process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXTAUTH_URL:process.env.NEXTAUTH_URL,
        NEXTAUTH_URL_INTERNAL:process.env.NEXTAUTH_URL_INTERNAL,
        NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
        MAIL_GUN_API_KEY:process.env.MAIL_GUN_API_KEY,
        SUPABASE_SERVICE_ROLE_SECRET:process.env.SUPABASE_SERVICE_ROLE_SECRET,
        SUPABASE_PUBLIC_POST_IMAGE_URL:process.env.SUPABASE_PUBLIC_POST_IMAGE_URL,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        EMAILJS_PUBLIC_API: process.env.EMAILJS_PUBLIC_API,
    },
    
   images: {
       unoptimized: true,
       remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
        },
      ],
      domains: 
        [ 'peezrwllibppqkolgsto.supabase.co', 'content.culturays.com, culturays.com']     
   
    },   
    // async redirects() {
    //   return [
    //     {
    //       source: "/forum",
    //       destination: "/routesthatrequirelogintoview",
    //       permanent: true,
    //     },
    //   ];
    // },
   
  trailingSlash: true,
  experimental: {
    taint: true,
  },
 
};

module.exports =nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "ngenet-studio",
    project: "culturays-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true,
    },

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
