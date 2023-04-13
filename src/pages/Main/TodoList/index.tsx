import { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import { TodoListWrapper } from './style';
import todoDb from '@utils/todoDb';

type TodoListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
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
    (list: TodoType[], startIndex: number, endIndex: number | undefined) => {
      if (!endIndex) return list;

      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    },
    []
  );

  const onDragEnd = (result: DropResult) => {
    if (deletedId === result.draggableId) {
      setTodos((prev) => [...prev].filter((ele) => ele.id !== deletedId));
      return;
    }

    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    setTodos(updateTodos);

    function updateTodos(todos: TodoType[]) {
      const reorderedTodos = reorder(
        todos,
        result.source.index,
        result.destination?.index
      );

      todoDb.update(reorderedTodos);
      return reorderedTodos;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo">
        {(provided) => (
          <TodoListWrapper ref={provided.innerRef} {...provided.droppableProps}>
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
          </TodoListWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
