import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

	body {
    background-color: ${theme.color.floralWhite};
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${theme.listSize}px;
    pointer-events: none;
  }

  #root {
    pointer-events: auto;
  }
`;

export default GlobalStyle;
