import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../utils/itemTypes';

const ToDoList = props => {
  const {
    id,
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
    const copyList = [...toDoData];
    if (findIndex !== -1) {
      copyList[findIndex] = {
        ...copyList[findIndex],
        isCompleted: e.target.checked,
      };
      setToDoData(copyList);
    }
  };

  const saveTextValue = e => {
    const findIndex = toDoData.findIndex(ele => ele.id === id);
    const copyList = [...toDoData];
    if (findIndex !== -1) {
      copyList[findIndex] = {
        ...copyList[findIndex],
        textValue: e.target.value,
      };
      setToDoData(copyList);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        setToDoData(prev => [...prev].filter(ele => ele.id !== item.id));
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <List
      ref={drag}
      className={className}
      style={style}
      isDragging={isDragging}
    >
      <Label>
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

export default ToDoList;
