import React from 'react';
import styled from 'styled-components';

const EditButton = ({ setisEditModeOn }) => {
  return (
    <StyledButton
      onClick={() => {
        setisEditModeOn(prev => !prev);
      }}
    >
      <i className="fa-regular fa-pen-to-square" />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  all: unset;
  align-self: flex-end;
  cursor: pointer;

  i {
    color: ${({ theme }) => theme.ink};
  }
`;

export default EditButton;
