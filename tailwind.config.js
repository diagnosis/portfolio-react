/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
            },
            colors: {
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            textShadow: {
                none: 'none',
                custom: '0 1px 2px rgba(0, 0, 0, 0.5)',
                soft: '0 2px 4px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};