import React from 'react';
import { StyledButton } from './style';

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

export default EditButton;
