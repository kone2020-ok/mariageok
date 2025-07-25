/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fdf7f0',
          100: '#faeee0',
          200: '#f4dcc1',
          300: '#ecc196',
          400: '#e2a169',
          500: '#d88447',
          600: '#ca6f3c',
          700: '#a85a34',
          800: '#874a32',
          900: '#6e3e2c',
          950: '#3b1f16',
        },
        'terracotta-warm': {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#f9dcc1',
          300: '#f4c196',
          400: '#ed9f69',
          500: '#e67e47',
          600: '#d4653c',
          700: '#b15234',
          800: '#8d4332',
          900: '#72392c',
          950: '#3e1c16',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
