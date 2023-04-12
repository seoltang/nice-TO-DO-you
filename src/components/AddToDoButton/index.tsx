import React from 'react';
import { Container, StyledButton, StyledIcon } from './style';

type AddToDoButtonProps = {
  randomColor: string;
  setToDos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
};

const AddToDoButton = ({ randomColor, setToDos }: AddToDoButtonProps) => {
  const addNewToDo = () => {
    setToDos((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((ele) => ele.id)) + 1 : 0,
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

export default AddToDoButton;
