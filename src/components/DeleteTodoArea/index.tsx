import { useDrop } from 'react-dnd';
import { DND_ITEM_TYPE } from '@constants/todo';
import theme from '@styles/theme';
import { Container, TrashCan } from './style';

type DeleteTodoAreaProps = {
  todos: TodoType[];
};

const DeleteTodoArea = ({ todos }: DeleteTodoAreaProps) => {
  const [{ isOver, id, canDrop }, dropRef] = useDrop(() => ({
    accept: DND_ITEM_TYPE.todo,
    drop: () => ({ isDeleted: true }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      id: (monitor.getItem() as { id: string } | null)?.id,
      canDrop: monitor.canDrop(),
    }),
  }));

  const getTrashCanColor = (
    isOver: boolean,
    draggingId: string | undefined
  ) => {
    const { floralWhite, tomato } = theme.color;
    const colorStyles = { backgroundColor: floralWhite, fontColor: tomato };

    if (!draggingId) return colorStyles;
    const todo = todos.find((ele) => ele.id === draggingId);
    if (!todo) return colorStyles;
    const { isCompleted, color } = todo;

    if (isOver) {
      colorStyles.backgroundColor = isCompleted ? color : floralWhite;
      colorStyles.fontColor = isCompleted ? floralWhite : color;
    }

    return colorStyles;
  };

  return canDrop ? (
    <Container>
      <TrashCan
        ref={dropRef}
        isOver={isOver}
        draggingId={id}
        getTrashCanColor={getTrashCanColor}
      >
        <i className="fa-regular fa-trash-can" />
      </TrashCan>
    </Container>
  ) : null;
};

export default DeleteTodoArea;
