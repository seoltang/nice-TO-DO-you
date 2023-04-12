import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Draggable, type DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../utils/itemTypes';
import theme from '../styles/theme';
import type { ToDoType } from '../types/todo';

type ToDoListProps = {
  id: number;
  index: number;
  color: string;
  textValue: string;
  isCompleted: boolean;
  setToDos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
  toDos: ToDoType[];
  deletedId: number | null;
  isEditModeOn: boolean;
};

type ListProps = {
  isDragging: boolean;
};

const ToDoList = ({
  id,
  index,
  color,
  textValue,
  isCompleted,
  setToDos,
  toDos,
  deletedId,
  isEditModeOn,
}: ToDoListProps) => {
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const findIndex = toDos.findIndex((toDo) => toDo.id === id);
    const copyToDos = [...toDos];

    if (findIndex !== -1) {
      copyToDos[findIndex] = {
        ...copyToDos[findIndex],
        isCompleted: event.target.checked,
      };

      setToDos(copyToDos);
    }
  };

  const saveTextValue = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const findIndex = toDos.findIndex((toDo) => toDo.id === id);
    const copyToDos = [...toDos];

    if (findIndex !== -1) {
      copyToDos[findIndex] = {
        ...copyToDos[findIndex],
        textValue: event.currentTarget.value,
      };

      setToDos(copyToDos);
    }
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const preventDeleteAnimation = (
    style: React.CSSProperties | undefined,
    snapshot: DraggableStateSnapshot,
    id: number
  ) => {
    if (snapshot.isDropAnimating && id === deletedId) {
      const { moveTo } = snapshot.dropAnimation!;
      return {
        ...style,
        transform: `translate(${moveTo.x}px, ${moveTo.y}px)`,
        transitionDuration: '0.000001s',
        visibility: 'hidden',
      } as React.CSSProperties;
    }
    return style;
  };

  return Number.isInteger(index) ? (
    <Draggable
      draggableId={`todo-${id}`}
      index={index}
      isDragDisabled={!isEditModeOn}
    >
      {(provided, snapshot) => (
        <List
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
                <GripIcon color={color} className="fa-solid fa-grip-lines" />
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

type StyledCheckboxProps = {
  isCompleted: boolean;
  isEditModeOn: boolean;
};

type StyledTextareaAutosizeProps = {
  $isCompleted: boolean;
  $color: string;
};

const List = styled.li<ListProps>`
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

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  ${theme.flexCustom()}
  width: ${theme.listSize + 4}px;
  height: ${theme.listSize + 4}px;
  background-color: ${(props) =>
    props.isCompleted && !props.isEditModeOn ? props.color : 'transparent'};
  border: 2px solid
    ${(props) => (props.isEditModeOn ? 'transparent' : props.color)};
  border-radius: 50%;
`;

const StyledTextareaAutosize = styled(
  TextareaAutosize
)<StyledTextareaAutosizeProps>`
  all: unset;
  display: block;
  width: 100%;
  border-bottom: 1px solid transparent;
  color: ${(props) =>
    props.$isCompleted ? props.theme.color.lightGray : 'unset'};
  text-decoration: ${(props) => (props.$isCompleted ? 'line-through' : 'none')};
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  overflow: hidden;
  resize: none;

  &:focus {
    border-bottom: 1px solid ${theme.color.lightGray};
  }

  &::selection {
    background-color: ${({ $color }) => $color};
    color: ${theme.color.floralWhite};
  }
`;

const GripIcon = styled.i`
  color: ${({ color }) => color};
  font-size: ${theme.listSize}px;
`;

export default ToDoList;
