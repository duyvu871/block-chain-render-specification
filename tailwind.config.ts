import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateAreas: {
        'layout': [
          'wallet cost',
          'history history',
        ],
        graph: [
            'logo graph graph',
            'cost graph graph',
            'cost graph graph',
        ],
      },
      gridTemplateColumns: {
        'layout': '200px 3fr',
        "graph": "1fr 2fr 2fr",
      },
      gridTemplateRows: {
        'layout': '1fr 3fr',
        "graph": "1fr 2fr 2fr",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
