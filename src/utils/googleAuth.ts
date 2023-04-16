import type { NavigateFunction } from 'react-router-dom';
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  type Auth,
} from 'firebase/auth';
import { auth } from 'src/firebase';

export async function logIn(navigate: NavigateFunction) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate('/');
      return;
    }

    signInGoogle(auth);
  });
}

async function signInGoogle(auth: Auth) {
  const provider = new GoogleAuthProvider();

  await signInWithRedirect(auth, provider);

  try {
    const result = await getRedirectResult(auth);

    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      sessionStorage.setItem('google-access-token', JSON.stringify(token));
    }
  } catch (error) {
    console.error(`${error.code}: ${error.message}`);
  }
}

export async function logOut(navigate: NavigateFunction) {
  try {
    await signOut(auth);
    navigate('/start');
  } catch (error) {
    console.error(error.message);
  }
}
