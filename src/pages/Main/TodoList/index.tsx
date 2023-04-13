import { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import { ToDoListWrapper } from './style';

type TodoListProps = {
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
  deletedId: string | null;
  isEditModeOn: boolean;
};

const TodoList = ({
  todos,
  setTodos,
  deletedId,
  isEditModeOn,
}: TodoListProps) => {
  const reorder = useCallback(
    (list: ToDoType[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    },
    []
  );

  const onDragEnd = (result: DropResult) => {
    if (deletedId === result.draggableId) {
      setTodos((prevtoDos) =>
        [...prevtoDos].filter((ele) => ele.id !== deletedId)
      );
      return;
    }

    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    setTodos((prevtoDos) =>
      reorder(prevtoDos, result.source.index, result.destination!.index)
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo">
        {(provided) => (
          <ToDoListWrapper ref={provided.innerRef} {...provided.droppableProps}>
            {todos.length
              ? todos.map(({ id, color, textValue, isCompleted }, index) => (
                  <TodoItem
                    key={id}
                    id={id}
                    index={index}
                    color={color}
                    textValue={textValue}
                    isCompleted={isCompleted}
                    todos={todos}
                    setTodos={setTodos}
                    deletedId={deletedId}
                    isEditModeOn={isEditModeOn}
                  />
                ))
              : null}
            {provided.placeholder}
          </ToDoListWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
