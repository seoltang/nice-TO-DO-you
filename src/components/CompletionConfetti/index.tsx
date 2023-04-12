import React from 'react';
import Confetti from 'react-confetti';
import useWindowSize from '../../hooks/useWindowSize';
import theme from '../../styles/theme';

const CompletionConfetti = () => {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={150}
      confettiSource={{
        x: width / 2,
        y: height - (48 + theme.listSize),
        w: 16,
        h: 12,
      }}
      initialVelocityX={6}
      initialVelocityY={20}
      recycle={false}
      tweenDuration={500}
      style={{ position: 'fixed', zIndex: 200 }}
    />
  );
};

export default CompletionConfetti;
