import { css } from 'styled-components';

const theme = {
  floralWhite: '#FFFAF0',
  lightGray: '#D3D3D3',
  ink: '#303952',
  tomato: '#FF6347',
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
  listSize: 16,

  flexCustom: (alignItems, justifyContent, flexDirection) => css`
    display: flex;
    flex-direction: ${flexDirection || 'initial'};
    align-items: ${alignItems || 'center'};
    justify-content: ${justifyContent || 'center'};
  `,
};

export default theme;
