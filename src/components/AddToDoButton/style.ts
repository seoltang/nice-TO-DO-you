import styled from 'styled-components';
import { motion } from 'framer-motion';

type StyledButtonProps = {
  $randomColor: string;
};

export const Container = styled.div`
  position: fixed;
  bottom: 36px;
  left: 50%;
  ${({ theme }) => theme.flexCustom()}
  width: fit-content;
  transform: translateX(-50%);
`;

export const StyledButton = styled(motion.button)<StyledButtonProps>`
  padding: 12px 16px;
  width: max-content;
  background-color: ${({ $randomColor }) => $randomColor};
  color: ${({ theme }) => theme.color.floralWhite};
  border: none;
  border-radius: 48px;
  text-align: center;
  font-size: 1.4rem;
  line-height: 1;
`;

export const StyledIcon = styled.i`
  margin-right: 8px;
  vertical-align: baseline;
  color: ${({ theme }) => theme.color.floralWhite};
`;
