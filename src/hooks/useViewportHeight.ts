import { useEffect } from 'react';

const useViewportHeight = () => {
  useEffect(() => {
    setViewportHeight();
  }, []);
};

function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export default useViewportHeight;
