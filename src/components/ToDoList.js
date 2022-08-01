import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

const ToDoList = ({ id, color, textValue, setToDoData, toDoData }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = e => {
    setIsChecked(e.target.checked);
  };

  const saveTextValue = e => {
    const findIndex = toDoData.findIndex(ele => ele.id === id);
    const copyList = [...toDoData];
    if (findIndex !== -1) {
      copyList[findIndex] = {
        ...copyList[findIndex],
        textValue: e.target.value,
      };
    }
    setToDoData(copyList);
  };

  return (
    <List>
      <Label>
        <Checkbox type="checkbox" onInput={handleCheckbox} />
        <StyledCheckbox isChecked={isChecked} color={color} />
      </Label>
      <StyledTextareaAutosize
        autoComplete="off"
        onInput={saveTextValue}
        value={textValue}
        $isChecked={isChecked}
        $color={color}
      />
    </List>
  );
};

const List = styled.li`
  ${({ theme }) => theme.flexCustom('flex-start')}
  margin: 8px 0;
  list-style: none;
`;

const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label``;

export const StyledCheckbox = styled.div`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  background-color: ${props => (props.isChecked ? props.color : 'transparent')};
  border: 2px solid ${props => props.color};
  border-radius: 50%;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  all: unset;
  display: block;
  width: 100%;
  border-bottom: 1px solid transparent;
  color: ${props => (props.$isChecked ? props.theme.lightGray : 'unset')};
  text-decoration: ${props => (props.$isChecked ? 'line-through' : 'none')};
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
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
