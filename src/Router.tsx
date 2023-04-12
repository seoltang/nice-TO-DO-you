import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
