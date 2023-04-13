import useAuthState from '@hooks/useAuthState';
import React from 'react';

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  useAuthState();

  return <>{children}</>;
};

export default AuthProvider;
