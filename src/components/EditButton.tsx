import React from 'react';
import styled from 'styled-components';

type EditButtonProps = {
  setisEditModeOn: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditButton = ({ setisEditModeOn }: EditButtonProps) => {
  return (
    <StyledButton
      onClick={() => {
        setisEditModeOn((prev) => !prev);
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
    color: ${({ theme }) => theme.color.ink};
  }
`;

export default EditButton;
