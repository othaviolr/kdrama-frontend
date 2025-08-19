export const designTokens = {
  colors: {
    primary: {
      50: '#f0f4ff',
      100: '#e0e9ff',
      200: '#c7d8ff',
      300: '#a4bcff',
      400: '#7c96ff',
      500: '#6366f1', // Base purple
      600: '#5b21b6',
      700: '#4c1d95',
      800: '#3730a3',
      900: '#1e1b4b',
    },
    glass: {
      white: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.1)',
      blur: 'backdrop-blur-xl',
    },
    gradients: {
      primary: 'bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600',
      secondary: 'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500',
      success: 'bg-gradient-to-r from-green-400 to-blue-500',
      warning: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      danger: 'bg-gradient-to-r from-red-400 to-pink-500',
      // Cards específicos baseados nas suas imagens
      netflix: 'bg-gradient-to-br from-red-500 to-red-600',
      disney: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hulu: 'bg-gradient-to-br from-green-500 to-green-600',
      prime: 'bg-gradient-to-br from-orange-500 to-orange-600',
      peacock: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
  },
  animation: {
    spring: 'transition-all duration-500 ease-out',
    smooth: 'transition-all duration-300 ease-in-out',
    fast: 'transition-all duration-150 ease-out',
  },
  shadows: {
    glass: 'shadow-2xl shadow-purple-500/20',
    glow: 'shadow-lg shadow-purple-500/50',
    float: 'shadow-xl shadow-black/10',
  },
};
