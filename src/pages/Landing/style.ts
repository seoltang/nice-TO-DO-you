import { motion } from 'framer-motion';
import styled from 'styled-components';

type SwitchProps = {
  isOn: boolean;
};

export const Wrapper = styled.div`
  ${({ theme }) => theme.flexCustom('column')}
  height: calc(var(--vh, 1vh) * 100);
`;

export const Switch = styled.div<SwitchProps>`
  ${({ theme, isOn }) =>
    theme.flexCustom('row', 'center', isOn ? 'flex-end' : 'flex-start')}
  width: 280px;
  height: 140px;
  background-color: ${({ theme, isOn }) =>
    isOn ? theme.color.random.forestGreen : theme.color.lemonCream};
  color: ${({ theme, isOn }) =>
    isOn ? theme.color.random.forestGreen : theme.color.lemonCream};
  box-shadow: inset 0 3px 10px 0 rgb(0 0 0 / 0.05);
  border-radius: 80px;
  padding: 10px;
  cursor: pointer;
  transition: background-color cubic-bezier(0.4, 0, 0.2, 1) 300ms,
    color cubic-bezier(0.4, 0, 0.2, 1) 300ms;
`;

export const Handle = styled(motion.span)`
  ${({ theme }) => theme.flexCustom()}
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 50%;
  font-size: 32px;
  font-weight: bold;
`;
