import React from 'react';
import styled from 'styled-components';

const AddToDoButton = ({ randomColor, addNewToDo }) => {
  return (
    <Container>
      <StyledButton randomColor={randomColor} onClick={addNewToDo}>
        <StyledIcon className="fa-solid fa-plus" />
        Nice TO DO you!
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.flexCustom()}
`;

const StyledButton = styled.button`
  padding: 8px 12px;
  background-color: ${({ randomColor }) => randomColor};
  color: ${({ theme }) => theme.floralWhite};
  border: none;
  border-radius: ${({ theme }) => theme.listSize.slice(0, -2) / 2 + 8}px;
  text-align: center;
`;

const StyledIcon = styled.i`
  margin-right: 8px;
  vertical-align: baseline;
  color: ${({ theme }) => theme.floralWhite};
`;

export default AddToDoButton;
