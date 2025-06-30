export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
           colors: {
        primary: {
          inputActiveBorderStart: 'hsl(249, 99%, 64%)',
          inputActiveBorderEnd: 'hsl(278, 94%, 30%)',
        },
        error: {
          400: 'hsl(0, 100%, 66%)',
        },
        neutral: {
          white: 'hsl(0, 100%, 100%)',
          gray200: 'hsl(270, 3%, 87%)',
          gray400: 'hsl(212, 12%, 71%)',
          purple950: 'hsl(278, 68%, 11%)',
        },
      },
      backgroundImage: {
        'bg-card-back': "url('/images/bg-card-back.png')",
        'bg-card-front': "url('/images/bg-card-front.png')", 
        'bg-main-desktop': "url('/images/bg-main-desktop.png')",
        'bg-main-mobile': "url('/images/bg-main-mobile.png')",
        'bg-card-logo': "url('/images/card-logo.svg')",
        'bg-complete-icon': "url('/images/icon-complete.svg')",
      },
    },
  },
  plugins: [],
}
