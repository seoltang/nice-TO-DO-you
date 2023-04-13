import React from 'react';
import { Draggable, type DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDrag } from 'react-dnd';
import todoDb from '@utils/todoDb';
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

const TodoItem = ({
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
    const findIndex = todos.findIndex((todo) => todo.id === id);
    const updatedToDos = [...todos];

    if (findIndex !== -1) {
      updatedToDos[findIndex] = {
        ...updatedToDos[findIndex],
        isCompleted: event.target.checked,
      };

      setTodos(updatedToDos);
      todoDb.update(updatedToDos);
    }
  };

  const onInputTextarea = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const findIndex = todos.findIndex((todo) => todo.id === id);
    const updatedToDos = [...todos];

    if (findIndex !== -1) {
      updatedToDos[findIndex] = {
        ...updatedToDos[findIndex],
        textValue: event.currentTarget.value,
      };

      setTodos(updatedToDos);
      todoDb.update(updatedToDos);
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

  return (
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
            onInput={onInputTextarea}
            value={textValue}
            $isCompleted={isCompleted}
            $color={color}
          />
        </List>
      )}
    </Draggable>
  );
};

export default TodoItem;
