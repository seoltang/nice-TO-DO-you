import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
	body {
    background-color: ${props => props.theme.floralWhite};
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyle;
