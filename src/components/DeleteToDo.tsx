import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../utils/itemTypes';
import theme from '../styles/theme';
import type { ToDoType } from '../types/todo';

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

type TrashCanProps = {
  isOver: boolean;
  draggingId: number;
  getTrashCanColor: (
    isOver: boolean,
    id: number
  ) => {
    backgroundColor: string;
    fontColor: string;
  };
};

const Container = styled.div`
  position: fixed;
  bottom: 48px;
  left: 50%;
  ${({ theme }) => theme.flexCustom()}
  transform: translateX(-50%);
`;

const TrashCan = styled.div<TrashCanProps>`
  ${({ theme }) => theme.flexCustom()}
  width: 72px;
  height: 72px;
  background-color: ${({ isOver, draggingId, getTrashCanColor }) =>
    getTrashCanColor(isOver, draggingId).backgroundColor};
  color: ${({ isOver, draggingId, getTrashCanColor }) =>
    getTrashCanColor(isOver, draggingId).fontColor};
  border: 2px solid
    ${({ isOver, draggingId, getTrashCanColor }) =>
      getTrashCanColor(isOver, draggingId).fontColor};
  border-radius: 50%;
  font-size: ${({ theme }) => theme.listSize + 8}px;
  transform: ${({ isOver }) => (isOver ? 'scale(1.25)' : 'none')};
`;

export default DeleteToDo;
