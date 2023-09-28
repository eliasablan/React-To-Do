/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      pg: '#1B998B', // Persian Green
      sc: '#2D3047', // Space Cadet
      ic: '#FFFD82', // Icterine
      rs: '#ED217C', // Rose
      at: '#FF9B71', // Atomic Tangerine
    },
  },
  plugins: [],
};
