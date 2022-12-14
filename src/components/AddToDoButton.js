import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AddToDoButton = ({ randomColor, setToDoData }) => {
  const addNewToDo = () => {
    setToDoData(prev => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map(ele => ele.id)) + 1 : 0,
        color: randomColor,
        textValue: '',
        isCompleted: false,
      },
    ]);
  };

  return (
    <Container>
      <StyledButton
        $randomColor={randomColor}
        onClick={addNewToDo}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <StyledIcon className="fa-solid fa-plus" />
        Nice TO DO you!
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 36px;
  left: 50%;
  ${({ theme }) => theme.flexCustom()}
  width: fit-content;
  transform: translateX(-50%);
`;

const StyledButton = styled(motion.button)`
  padding: 12px 16px;
  background-color: ${({ $randomColor }) => $randomColor};
  color: ${({ theme }) => theme.floralWhite};
  border: none;
  border-radius: ${({ theme }) => theme.listSize / 2 + 16}px;
  text-align: center;
  font-size: ${props => props.theme.listSize + 4}px;
  cursor: pointer;
`;

const StyledIcon = styled.i`
  margin-right: 8px;
  vertical-align: baseline;
  color: ${({ theme }) => theme.floralWhite};
`;

export default AddToDoButton;
