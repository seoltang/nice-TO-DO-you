import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/firebase';
import userIcon from '@assets/image/logo/user.png';

const useAuthState = () => {
  const [user, setUser] = useState({ id: '', imageURL: userIcon });

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, photoURL } = user;
        setUser({ id: uid, imageURL: photoURL || userIcon });
      } else navigate('/start');
    });
  }, []);

  return user;
};

export default useAuthState;
