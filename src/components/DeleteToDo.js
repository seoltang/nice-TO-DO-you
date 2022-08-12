import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../utils/itemTypes';
import theme from '../styles/theme';

const DeleteToDo = ({ toDoData }) => {
  const [{ isOver, id, canDrop }, dropRef] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: () => ({ delete: true }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      id: monitor.getItem()?.id,
      canDrop: monitor.canDrop(),
    }),
  }));

  const { isCompleted, color } = toDoData.find(ele => ele.id === id) || {};

  const getTrashCanColor = (isOver, isCompleted, color) => {
    let colorStyles = { backgroundColor: null, fontColor: null };
    if (isOver && isCompleted) {
      colorStyles.backgroundColor = color;
      colorStyles.fontColor = theme.floralWhite;
    } else if (isOver) {
      colorStyles.backgroundColor = theme.floralWhite;
      colorStyles.fontColor = color;
    } else {
      colorStyles.backgroundColor = theme.floralWhite;
      colorStyles.fontColor = theme.tomato;
    }
    return colorStyles;
  };

  return canDrop ? (
    <Container>
      <TrashCan
        ref={dropRef}
        isOver={isOver}
        isCompleted={isCompleted}
        color={color}
        getTrashCanColor={getTrashCanColor}
      >
        <i className="fa-regular fa-trash-can" />
      </TrashCan>
    </Container>
  ) : null;
};

const Container = styled.div`
  position: fixed;
  bottom: 48px;
  left: 50%;
  ${({ theme }) => theme.flexCustom()}
  transform: translateX(-50%);
`;

const TrashCan = styled.div`
  ${({ theme }) => theme.flexCustom()}
  width: 72px;
  height: 72px;
  background-color: ${({ isOver, isCompleted, color, getTrashCanColor }) =>
    getTrashCanColor(isOver, isCompleted, color).backgroundColor};
  color: ${({ isOver, isCompleted, color, getTrashCanColor }) =>
    getTrashCanColor(isOver, isCompleted, color).fontColor};
  border: 2px solid
    ${({ isOver, isCompleted, color, getTrashCanColor }) =>
      getTrashCanColor(isOver, isCompleted, color).fontColor};
  border-radius: 50%;
  font-size: ${({ theme }) => theme.listSize + 8}px;
  transform: ${({ isOver }) => (isOver ? 'scale(1.25)' : 'none')};
`;

export default DeleteToDo;
