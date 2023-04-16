import { useEffect, useState } from 'react';
import { Wrapper, Switch, Handle } from './style';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!isOn) return;

    const timeout = setTimeout(() => {
      navigate('/login');
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOn]);

  const navigate = useNavigate();

  const toggleSwitch = () => setIsOn(true);

  return (
    <Wrapper>
      <Switch isOn={isOn} onClick={toggleSwitch}>
        <Handle layout transition={spring}>
          {isOn ? 'ON' : 'OFF'}
        </Handle>
      </Switch>
    </Wrapper>
  );
};

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 50,
};

export default Landing;
