/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      pg: '#D3DFB8', // Tea Green
      sc: '#F2E86D', // Maize
      ic: '#C6A15B', // Satin sheen gold
      rs: '#050404', // Black
      at: '#726E75', // Dim Gray
    },
  },
  plugins: [],
};
