/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,js,jsx,jsx,mdx}",
    "./components/**/*.{js,js,jsx,jsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
        sans:['var(--font-roboto)'],
        workSans: "Work Sans",
        openSans: "Open Sans",
        Montserrat: "Montserrat",
        "anek":['"Anek Bangla"', "sans-serif"],
        "mono": ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"',], 
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        'primary':' #272727',
        'culturaysBg':'#020730',
        'dark':'hsl( var(--color-dark)/<alpha-value>)',
       'light':'hsl( var(--color-light)/<alpha-value>)',
       'text':'hsl( var(--color-text)/<alpha-value>)', 
      },
      backgroundColor:{
      'main-bg':'#0f0f1a',
      
      },
      boxShadow: {
        'sharebtn':'2px 0 2px 2px rgb(249, 249, 249)',
        '4xl': '0 5px 10px 2px rgba(100, 100, 100, 0.3)', 
        '3xl': '0 35px 60px 50px rgba(0, 0, 0, 0.3)', 
        '1xl': '3px 3px 20px rgba(0,0,0,0.5)',        
        'bottomShadow':'inset 0 15px 5px -16px #111',
      },
   
    },
    
      screens: {
        'xxs': "280px",
         'xs': "480px",
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
     
    }
    
  },
  plugins: [],
};
