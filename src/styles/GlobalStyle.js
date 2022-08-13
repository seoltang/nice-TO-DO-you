import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
	body {
    background-color: ${props => props.theme.floralWhite};
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${props => props.theme.listSize}px;
  }

  #rbd-announcement-0 {
    display: none;
  }
`;

export default GlobalStyle;
