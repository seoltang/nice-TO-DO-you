import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../utils/googleAuth';
import { LogInWrapper } from './style';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logIn(navigate);
  }, []);

  return <LogInWrapper>로그인하는 중...</LogInWrapper>;
};

export default Login;
