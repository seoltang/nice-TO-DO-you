import React from 'react';
import { Draggable, type DropResult } from 'react-beautiful-dnd';
import { useDrag } from 'react-dnd';
import todoDb from '@utils/todoDb';
import preventDeleteAnimation from '@utils/preventDeleteAnimation';
import { DND_ITEM_TYPE } from '@constants/todo';
import {
  List,
  CheckboxWrapper,
  StyledCheckbox,
  GripIcon,
  Checkbox,
  StyledTextareaAutosize,
} from './style';

type TodoListProps = {
  id: string;
  index: number;
  color: string;
  textValue: string;
  isCompleted: boolean;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  deletedId: string;
  setDeletedId: React.Dispatch<React.SetStateAction<string>>;
  todos: TodoType[];
  isEditModeOn: boolean;
};

const TodoItem = ({
  id,
  index,
  color,
  textValue,
  isCompleted,
  setTodos,
  deletedId,
  setDeletedId,
  todos,
  isEditModeOn,
}: TodoListProps) => {
  const handleCheckbox = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const isCompleted = target.checked;

    updateTodos(todos);

    function updateTodos(todos: TodoType[]) {
      const findIndex = todos.findIndex((todo) => todo.id === id);
      const updatedTodos = [...todos];

      if (findIndex !== -1) {
        updatedTodos[findIndex] = {
          ...updatedTodos[findIndex],
          isCompleted,
        };

        todoDb.update(updatedTodos);
      }

      return updatedTodos;
    }
  };

  const onInputTextarea = ({
    currentTarget,
  }: React.FormEvent<HTMLTextAreaElement>) => {
    const textValue = currentTarget.value;

    updateTodos(todos);
    setTodos(updateTodos);

    function updateTodos(todos: TodoType[]) {
      const findIndex = todos.findIndex((todo) => todo.id === id);
      const updatedTodos = [...todos];

      if (findIndex !== -1) {
        updatedTodos[findIndex] = {
          ...updatedTodos[findIndex],
          textValue,
        };

        todoDb.update(updatedTodos);
      }

      return updatedTodos;
    }
  };

  const [_, dragRef] = useDrag(() => ({
    type: DND_ITEM_TYPE.todo,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>() as {
        isDeleted: boolean;
      } | null;

      if (item.id && dropResult?.isDeleted) {
        setDeletedId(id);
      }
    },
  }));

  const isDeleted = id === deletedId;

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!isEditModeOn}>
      {(provided, snapshot) => (
        <List
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={preventDeleteAnimation(
            provided.draggableProps.style,
            snapshot,
            isDeleted
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
