import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Draggable } from 'react-beautiful-dnd';
import { useDrag } from 'react-dnd';
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

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id, index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult?.delete) {
        setToDoData(prev => [...prev].filter(ele => ele.id !== item.id));
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return index ? (
    <Draggable draggableId={`todo${id}`} index={index}>
      {provided => (
        <List
          className={className}
          isDragging={isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
      )}
    </Draggable>
  ) : null;
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

export default ToDoList;
