import { createGlobalStyle } from 'styled-components';
import resetStyle from './resetStyle';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  ${resetStyle}

  :root {
    --vh: 100%;
  }

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
