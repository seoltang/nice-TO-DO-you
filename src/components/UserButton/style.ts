import { motion } from 'framer-motion';
import styled from 'styled-components';

type ListWrapperProps = {
  isOpen: boolean;
};

export const Container = styled.div`
  position: relative;
`;

export const UserImgButton = styled.input`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const ListWrapper = styled.ul<ListWrapperProps>`
  position: absolute;
  right: 0;
  ${({ theme }) => theme.flexCustom('column', 'stretch')}
  row-gap: 4px;
  margin-top: 4px;
  width: max-content;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
`;

export const AuthButton = styled(motion.button)`
  padding: 6px;
  width: 100%;
  border-radius: 5px;
  background-color: rgb(255, 255, 255, 0.5);
  color: ${({ theme }) => theme.color.gray[700]};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  font-size: 14px;

  &:active {
    transform: scale(0.95);
  }
`;
