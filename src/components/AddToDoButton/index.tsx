import { v4 as uuidv4 } from 'uuid';
import todoDb from '@utils/todoDb';
import { Container, StyledButton, StyledIcon } from './style';

type AddTodoButtonProps = {
  randomColor: string;
};

const AddTodoButton = ({ randomColor }: AddTodoButtonProps) => {
  const addNewTodo = () => {
    const newTodo: TodoType = {
      id: uuidv4(),
      color: randomColor,
      textValue: '',
      isCompleted: false,
      createdAt: Date.now(),
      lastEditedAt: Date.now(),
    };

    todoDb.create(newTodo);
  };

  return (
    <Container>
      <StyledButton
        $randomColor={randomColor}
        onClick={addNewTodo}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <StyledIcon className="fa-solid fa-plus" />
        nice TO DO you!
      </StyledButton>
    </Container>
  );
};

export default AddTodoButton;
