import React, { useCallback } from 'react';
import update from 'immutability-helper';
import TextareaAutosize from 'react-textarea-autosize';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../utils/itemTypes';

const ToDoList = props => {
  const {
    id,
    index,
    color,
    textValue,
    isCompleted,
    setToDoData,
    toDoData,
    className,
    style,
  } = props;

  const handleCheckbox = e => {
    const findIndex = toDoData.findIndex(ele => ele.id === id);
    const copyData = [...toDoData];
    if (findIndex !== -1) {
      copyData[findIndex] = {
        ...copyData[findIndex],
        isCompleted: e.target.checked,
      };
      setToDoData(copyData);
    }
  };

  const saveTextValue = e => {
    const findIndex = toDoData.findIndex(ele => ele.id === id);
    const copyData = [...toDoData];
    if (findIndex !== -1) {
      copyData[findIndex] = {
        ...copyData[findIndex],
        textValue: e.target.value,
      };
      setToDoData(copyData);
    }
  };

  const moveToDo = useCallback(
    (dragIndex, hoverIndex) => {
      setToDoData(prevToDoData =>
        update(prevToDoData, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevToDoData[dragIndex]],
          ],
        })
      );
    },
    [setToDoData]
  );

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id, index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      // const didDrop = monitor.didDrop();
      // if (!didDrop) moveToDo(item.index, item.index);

      if (item && dropResult?.delete) {
        setToDoData(prev => [...prev].filter(ele => ele.id !== item.id));
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: () => ({ move: true }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(item, monitor) {
      if (!dropRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      console.log('drag', dragIndex, 'hover', hoverIndex);

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      const hoverHeightHalf =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const cursorPosition = monitor.getClientOffset();
      const cursorOnHoverY = cursorPosition.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && cursorOnHoverY < hoverHeightHalf) return;
      if (dragIndex > hoverIndex && cursorOnHoverY > hoverHeightHalf) return;

      moveToDo(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  }));

  // const moveToDo = (dragIndex, hoverIndex) => {
  //   setToDoData(prevToDoData =>
  //     update(prevToDoData, {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, prevToDoData[dragIndex]],
  //       ],
  //     })
  //   );
  // };

  // const [, dropUpRef] = useDrop(() => ({
  //   accept: ItemTypes.TODO,
  //   canDrop: () => false,
  //   hover(item) {
  //     const { id: dragId, index: dragIndex } = item || {};
  //     if (dragId !== id) {
  //       moveToDo(dragIndex, index);
  //     }
  //   },
  // }));

  // const [, dropDownRef] = useDrop(() => ({
  //   accept: ItemTypes.TODO,
  //   canDrop: () => false,
  //   hover(item) {
  //     const { id: dragId, index: dragIndex } = item || {};
  //     console.log(dragId, id, dragIndex, index);
  //     if (dragId !== id) {
  //       moveToDo(dragIndex, index + 1);
  //     }
  //   },
  // }));

  return (
    <>
      {/* <DropMargin ref={dropUpRef} /> */}
      <List
        ref={dropRef}
        className={className}
        style={style}
        isDragging={isDragging}
      >
        <Label ref={dragRef}>
          <Checkbox
            type="checkbox"
            onChange={handleCheckbox}
            checked={isCompleted}
          />
          <StyledCheckbox isCompleted={isCompleted} color={color} />
        </Label>
        <StyledTextareaAutosize
          autoComplete="off"
          onInput={saveTextValue}
          value={textValue}
          $isCompleted={isCompleted}
          $color={color}
        />
      </List>
      {/* <DropMargin ref={dropDownRef} /> */}
    </>
  );
};

const List = styled.li`
  ${({ theme }) => theme.flexCustom('flex-start')}
  margin: 8px 0;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 'inherit')};
  list-style: none;
`;

const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label``;

const StyledCheckbox = styled.div`
  margin-top: ${props => props.theme.listSize * 0.1 - 1}px;
  margin-right: 8px;
  width: ${props => props.theme.listSize}px;
  height: ${props => props.theme.listSize}px;
  background-color: ${props =>
    props.isCompleted ? props.color : 'transparent'};
  border: 2px solid ${props => props.color};
  border-radius: 50%;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  all: unset;
  display: block;
  width: 100%;
  border-bottom: 1px solid transparent;
  color: ${props => (props.$isCompleted ? props.theme.lightGray : 'unset')};
  text-decoration: ${props => (props.$isCompleted ? 'line-through' : 'none')};
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  overflow: hidden;
  resize: none;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  }

  &::selection {
    background-color: ${({ $color }) => $color};
    color: ${({ theme }) => theme.floralWhite};
  }
`;

// const DropMargin = styled.div`
//   height: 8px;
// `;

export default ToDoList;
