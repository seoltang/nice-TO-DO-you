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

export default ToDoList;
