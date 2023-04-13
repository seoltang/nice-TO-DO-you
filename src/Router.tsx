import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@pages/Main';
import Landing from '@pages/Landing';
import LogIn from '@pages/LogIn';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/start" element={<Landing />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
