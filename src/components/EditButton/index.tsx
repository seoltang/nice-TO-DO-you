import React from 'react';
import { motion, useCycle } from 'framer-motion';
import theme from '@styles/theme';
import { StyledButton } from './style';

type PathProps = {
  variants: {};
  d?: string;
  transition?: {};
};

type EditButtonProps = {
  setisEditModeOn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke={theme.color.ink}
    strokeLinecap="round"
    {...props}
  />
);

const EditButton = ({ setisEditModeOn }: EditButtonProps) => {
  const [isOn, toggleOn] = useCycle(false, true);

  return (
    <StyledButton
      onClick={() => {
        setisEditModeOn((prev) => !prev);
        toggleOn();
      }}
      animate={isOn ? 'on' : 'off'}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            off: { d: 'M 2 2.5 L 20 2.5' },
            on: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            off: { opacity: 1 },
            on: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            off: { d: 'M 2 16.346 L 20 16.346' },
            on: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </StyledButton>
  );
};

export default EditButton;
