import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/itemTypes';
import theme from '../../styles/theme';
import type { ToDoType } from '../../types/todo';
import { Container, TrashCan } from './style';

type DeleteToDoProps = {
  toDos: ToDoType[];
  setDeletedId: React.Dispatch<React.SetStateAction<number | null>>;
};

const DeleteToDo = ({ toDos, setDeletedId }: DeleteToDoProps) => {
  const [{ isOver, id, canDrop }, dropRef] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: ({ id }) => {
      setDeletedId(id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      id: (monitor.getItem() as { id: number })?.id,
      canDrop: monitor.canDrop(),
    }),
  }));

  const getTrashCanColor = (isOver: boolean, draggingId: number) => {
    const { isCompleted, color } =
      toDos.find((ele) => ele.id === draggingId) || {};

    let colorStyles = { backgroundColor: '', fontColor: '' };
    if (isOver && isCompleted && color) {
      colorStyles.backgroundColor = color;
      colorStyles.fontColor = theme.color.floralWhite;
    } else if (isOver && color) {
      colorStyles.backgroundColor = theme.color.floralWhite;
      colorStyles.fontColor = color;
    } else {
      colorStyles.backgroundColor = theme.color.floralWhite;
      colorStyles.fontColor = theme.color.tomato;
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

export default DeleteToDo;
