import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Draggable } from 'react-beautiful-dnd';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../utils/itemTypes';
import theme from '../styles/theme';

const ToDoList = props => {
  const {
    id,
    index,
    color,
    textValue,
    isCompleted,
    setToDoData,
    toDoData,
    deletedId,
    isEditModeOn,
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
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const preventDeleteAnimation = (style, snapshot, id) => {
    if (snapshot.isDropAnimating && id === deletedId) {
      const { moveTo } = snapshot.dropAnimation;
      return {
        ...style,
        transform: `translate(${moveTo.x}px, ${moveTo.y}px)`,
        transitionDuration: '0.000001s',
        visibility: 'hidden',
      };
    }
    return style;
  };

  return Number.isInteger(index) ? (
    <Draggable
      draggableId={`${id}`}
      index={index}
      isDragDisabled={!isEditModeOn}
    >
      {(provided, snapshot) => (
        <List
          className={className}
          isDragging={isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={preventDeleteAnimation(
            provided.draggableProps.style,
            snapshot,
            id
          )}
        >
          {isEditModeOn ? (
            <CheckboxWrapper ref={dragRef}>
              <StyledCheckbox
                color={color}
                isCompleted={isCompleted}
                isEditModeOn={isEditModeOn}
              >
                <GripIcon
                  color={color}
                  isCompleted={isCompleted}
                  className="fa-solid fa-grip-lines"
                />
              </StyledCheckbox>
            </CheckboxWrapper>
          ) : (
            <CheckboxWrapper>
              <label>
                <Checkbox
                  type="checkbox"
                  onChange={handleCheckbox}
                  checked={isCompleted}
                />
                <StyledCheckbox
                  color={color}
                  isCompleted={isCompleted}
                  isEditModeOn={isEditModeOn}
                />
              </label>
            </CheckboxWrapper>
          )}

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
  ${theme.flexCustom('flex-start')}
  margin-bottom: 12px;
  list-style: none;
`;

const Checkbox = styled.input`
  display: none;
`;

const CheckboxWrapper = styled.div`
  padding-top: 1px;
  padding-right: 8px;
`;

const StyledCheckbox = styled.div`
  ${theme.flexCustom()}
  width: ${theme.listSize + 4}px;
  height: ${theme.listSize + 4}px;
  background-color: ${props =>
    props.isCompleted && !props.isEditModeOn ? props.color : 'transparent'};
  border: 2px solid
    ${props => (props.isEditModeOn ? 'transparent' : props.color)};
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
    border-bottom: 1px solid ${theme.lightGray};
  }

  &::selection {
    background-color: ${({ $color }) => $color};
    color: ${theme.floralWhite};
  }
`;

const GripIcon = styled.i`
  color: ${({ color }) => color};
  font-size: ${theme.listSize}px;
`;

export default ToDoList;
