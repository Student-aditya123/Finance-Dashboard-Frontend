/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    900: '#082f49',
                },
                secondary: {
                    50: '#f5f3ff',
                    500: '#a78bfa',
                    600: '#9333ea',
                    700: '#7e22ce',
                },
                accent: {
                    50: '#fef3c7',
                    500: '#f59e0b',
                    600: '#d97706',
                },
            },
            boxShadow: {
                'soft-glow': '0 8px 32px rgba(15, 23, 42, 0.12)',
                'soft-glow-lg': '0 16px 48px rgba(15, 23, 42, 0.15)',
            },
            borderRadius: {
                '2xl': '1rem',
            },
            backdropBlur: {
                xs: '2px',
            },
            opacity: {
                8: '0.08',
            },
        },
    },
    plugins: [],
};