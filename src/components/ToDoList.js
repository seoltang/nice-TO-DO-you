import React, { useState } from 'react';
import styled from 'styled-components';

const ToDoList = ({ id, color, textValue, setToDoData, toDoData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState({
    row: 1,
    lineBreak: {},
  });

  const handleCheckbox = e => {
    setIsChecked(e.target.checked);
  };

  const onInput = e => {
    const { scrollHeight, clientHeight, value } = e.target;

    const saveTextValue = () => {
      const findIndex = toDoData.findIndex(ele => ele.id === id);
      const copyList = [...toDoData];
      if (findIndex !== -1) {
        copyList[findIndex] = { ...copyList[findIndex], textValue: value };
      }
      setToDoData(copyList);
    };

    const resizeTextarea = () => {
      if (scrollHeight > clientHeight) {
        setTextareaHeight(prev => ({
          row: prev.row + 1,
          lineBreak: { ...prev.lineBreak, [value.length - 1]: true },
        }));
      }

      if (textareaHeight.lineBreak[value.length]) {
        setTextareaHeight(prev => ({
          row: prev.row - 1,
          lineBreak: { ...prev.lineBreak, [value.length]: false },
        }));
      }
    };

    saveTextValue();
    resizeTextarea();
  };

  const onKeyEnter = e => {
    if (e.code === 'Enter') {
      setTextareaHeight(prev => ({
        row: prev.row + 1,
        lineBreak: { ...prev.lineBreak, [e.target.value.length]: true },
      }));
    }
  };

  return (
    <List>
      <Label>
        <Checkbox type="checkbox" onInput={handleCheckbox} />
        <StyledCheckbox isChecked={isChecked} color={color} />
      </Label>
      <InputText
        autoComplete="off"
        isChecked={isChecked}
        onInput={onInput}
        onKeyDown={onKeyEnter}
        row={textareaHeight.row}
        value={textValue}
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

const InputText = styled.textarea`
  all: unset;
  display: block;
  width: 100%;
  height: ${({ row, theme }) => +theme.listSize.slice(0, -2) * row + 4}px;
  border-bottom: 1px solid transparent;
  color: ${props => (props.isChecked ? props.theme.lightGray : 'unset')};
  text-decoration: ${props => (props.isChecked ? 'line-through' : 'none')};
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  resize: none;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  }
`;

export default ToDoList;
