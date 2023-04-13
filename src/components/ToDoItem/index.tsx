import React from 'react';
import { Draggable, type DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '@constants/todo';
import {
  List,
  CheckboxWrapper,
  StyledCheckbox,
  GripIcon,
  Checkbox,
  StyledTextareaAutosize,
} from './style';

type ToDoListProps = {
  id: string;
  index: number;
  color: string;
  textValue: string;
  isCompleted: boolean;
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
  todos: ToDoType[];
  deletedId: string | null;
  isEditModeOn: boolean;
};

const ToDoItem = ({
  id,
  index,
  color,
  textValue,
  isCompleted,
  setTodos,
  todos,
  deletedId,
  isEditModeOn,
}: ToDoListProps) => {
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const findIndex = todos.findIndex((toDo) => toDo.id === id);
    const copyToDos = [...todos];

    if (findIndex !== -1) {
      copyToDos[findIndex] = {
        ...copyToDos[findIndex],
        isCompleted: event.target.checked,
      };

      setTodos(copyToDos);
    }
  };

  const saveTextValue = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const findIndex = todos.findIndex((toDo) => toDo.id === id);
    const copyToDos = [...todos];

    if (findIndex !== -1) {
      copyToDos[findIndex] = {
        ...copyToDos[findIndex],
        textValue: event.currentTarget.value,
      };

      setTodos(copyToDos);
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
    id: string
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

export default ToDoItem;
