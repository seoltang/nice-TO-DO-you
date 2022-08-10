import React from 'react';
import { useDragLayer } from 'react-dnd';
import styled from 'styled-components';
import ToDoList from './ToDoList';
import AddToDoButton from './AddToDoButton';
import DeleteToDo from './DeleteToDo';
import { ItemTypes } from '../utils/itemTypes';

const DragLayerPreview = ({ toDoData, randomColor, addNewToDo }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer(monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  const { id, color, textValue, isCompleted } =
    toDoData?.find(ele => ele.id === item?.id) || {};

  const getDragLayerStyles = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;

    return {
      transform,
      WebkitTransform: transform,
    };
  };

  return isDragging && itemType === ItemTypes.TODO ? (
    <>
      <PreviewToDoList
        id={id}
        color={color}
        textValue={textValue}
        isCompleted={isCompleted}
        style={getDragLayerStyles(initialOffset, currentOffset)}
      />
      <DeleteToDo toDoData={toDoData} />
    </>
  ) : (
    <AddToDoButton randomColor={randomColor} addNewToDo={addNewToDo} />
  );
};

const PreviewToDoList = styled(ToDoList)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 100;
  pointer-events: none;
`;

export default DragLayerPreview;
