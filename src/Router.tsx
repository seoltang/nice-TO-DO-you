import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@pages/Main';
import Landing from '@pages/Landing';
import LogIn from '@pages/LogIn';
import AuthProvider from '@components/AuthProvider';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Main />
            </AuthProvider>
          }
        />
        <Route path="/start" element={<Landing />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
