import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./node_modules/flowbite/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './commons/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]

}
export default config
