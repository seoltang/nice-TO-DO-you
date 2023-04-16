import { css } from 'styled-components';

const size = {
  mobile: '767px',
  desktop: '768px',
};

const theme = {
  mobile: `(max-width: ${size.mobile})`,
  desktop: `(min-width: ${size.desktop})`,

  color: {
    white: '#FFFFFF',
    floralWhite: '#FFFAF0',
    lemonCream: '#faf0ca',
    custard: '#f8ecb9',
    ink: '#303952',
    tomato: '#FF6347',
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    random: {
      rose: '#e66767',
      pink: '#f78fb3',
      deepPink: '#cf6a87',
      paleRed: '#EB624D',
      coral: '#f19066',
      tigerLily: '#e15f41',
      salmon: '#FA8072',
      gold: '#FFD700',
      goldenYellow: '#FFE000',
      yellow: '#FFEC00',
      lemon: '#F2EE00',
      yellowGreen: '#9ACD32',
      grassGreen: '#68B506',
      forestGreen: '#228B22',
      seaGreen: '#c44569',
      lightSeaGreen: '#20B2AA',
      aqua: '#3dc1d3',
      turquoise: '#159AAF',
      darkTurquoise: '#236391',
      seaBlue: '#154DAF',
      blue: '#324BD1',
      paleBlue: '#4368CB',
      darkBlue: '#324BD1',
      orchid: '#DA70D6',
      purple: '#9370DB',
      pencil: '#596275',
    },
  },

  listSize: 16,

  flexCustom: (
    flexDirection?: string,
    alignItems?: string,
    justifyContent?: string
  ) => css`
    display: flex;
    flex-direction: ${flexDirection || 'row'};
    align-items: ${alignItems || 'center'};
    justify-content: ${justifyContent || 'center'};
  `,
};

export default theme;
