/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Emerald + Gold palette
        'primary': '#0D9F6E',
        'primary-dark': '#065F46',
        'primary-light': '#D1FAE5',
        'primary-green': '#0D9F6E',
        'secondary-green': '#059669',
        'accent-green': '#34D399',
        'light-green': '#ECFDF5',

        // Gold accents for luxury feel
        'gold': '#D4A853',
        'gold-light': '#F5E6C8',
        'gold-dark': '#B8860B',

        // Premium dark neutrals
        'dark-gray': '#111827',
        'medium-gray': '#6B7280',
        'light-gray': '#F9FAFB',
        'border-gray': '#E5E7EB',
        'card-bg': '#FFFFFF',

        // Glassmorphism
        'glass': 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(17, 24, 39, 0.8)',

        // Status with luxury tones
        'success': '#059669',
        'warning': '#D97706',
        'error': '#DC2626',
        'info': '#3B82F6',
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        'heading': ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
        'display': ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.08)',
        'hard': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'luxury': '0 8px 32px rgba(13, 159, 110, 0.15)',
        'glow': '0 0 20px rgba(13, 159, 110, 0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.1)',
        'float': '0 20px 50px rgba(0, 0, 0, 0.12)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #065F46 0%, #0D9F6E 50%, #34D399 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4A853 0%, #F5E6C8 100%)',
        'gradient-dark': 'linear-gradient(180deg, #111827 0%, #1F2937 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(13, 159, 110, 0.2)' },
          '50%': { boxShadow: '0 0 35px rgba(13, 159, 110, 0.4)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
}