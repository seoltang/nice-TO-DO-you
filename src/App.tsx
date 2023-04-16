import { ThemeProvider } from 'styled-components';
import Router from './Router';
import useViewportHeight from '@hooks/useViewportHeight';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';

function App() {
  useViewportHeight();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
