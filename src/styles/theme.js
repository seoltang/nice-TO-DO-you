import { css } from 'styled-components';

const theme = {
  floralWhite: '#FFFAF0',
  lightGray: '#D3D3D3',
  tomato: '#FF6347',
  random: {
    coral: '#f19066',
    tigerLily: '#e15f41',
    rose: '#e66767',
    pink: '#f78fb3',
    deepPink: '#cf6a87',
    cornFlower: '#546de5',
    gold: '#FFD700',
    yellowGreen: '#9ACD32',
    forestGreen: '#228B22',
    aqua: '#3dc1d3',
    purple: '#786fa6',
    pencil: '#596275',
  },
  listSize: '16px',

  flexCustom: (alignItems, justifyContent, flexDirection) => css`
    display: flex;
    flex-direction: ${flexDirection || 'initial'};
    align-items: ${alignItems || 'center'};
    justify-content: ${justifyContent || 'center'};
  `,
};

export default theme;
