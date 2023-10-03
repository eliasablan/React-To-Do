/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      // pg: '#1B998B', // Persian Green
      // sc: '#2D3047', // Space Cadet
      // ic: '#FFFD82', // Icterine
      // rs: '#ED217C', // Rose
      // at: '#FF9B71', // Atomic Tangerine
      pg: '#D3DFB8', // Tea Green
      sc: '#F2E86D', // Maize
      ic: '#C6A15B', // Satin sheen gold
      rs: '#050404', // Black
      at: '#726E75', // Dim Gray
    },
  },
  plugins: [],
};
