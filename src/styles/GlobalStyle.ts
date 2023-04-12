import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

	body {
    background-color: ${props => props.theme.floralWhite};
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${props => props.theme.listSize}px;
    pointer-events: none;
  }

  #root {
    pointer-events: auto;
  }
`;

export default GlobalStyle;
