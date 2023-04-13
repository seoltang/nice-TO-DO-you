import { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import {
  DragDropContext,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd';
import todoDb from '@utils/todoDb';
import ToDoItem from '@components/ToDoItem';
import EditButton from '@components/EditButton';
import AddToDoButton from '@components/AddToDoButton';
import DeleteToDo from '@components/DeleteToDo';
import CompletionConfetti from '@components/CompletionConfetti';
import UserButton from '@components/UserButton';
import theme from '@styles/theme';
import { PageContainer, FlexContainer, ToDoListWrapper, Nav } from './style';
import useAuthState from '@hooks/useAuthState';

const Main = () => {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [randomColor, setRandomColor] = useState('');
  const [isEditModeOn, setisEditModeOn] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const user = useAuthState();

  useEffect(() => {
    if (user.id) todoDb.listen(setTodos);
  }, [user.id]);

  useEffect(() => {
    const colorValues = Object.values(theme.color.random);
    setRandomColor(colorValues[Math.floor(Math.random() * colorValues.length)]);
  }, [todos.length]);

  const isAllCompleted =
    todos.length && todos.map((ele) => ele.isCompleted).every((ele) => ele);

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
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <PageContainer>
        <FlexContainer>
          <Nav>
            <EditButton setisEditModeOn={setisEditModeOn} />
            <UserButton imageURL={user.imageURL} />
          </Nav>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todo">
              {(provided) => (
                <ToDoListWrapper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {todos.length
                    ? todos.map(
                        ({ id, color, textValue, isCompleted }, index) => (
                          <ToDoItem
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
                        )
                      )
                    : null}
                  {provided.placeholder}
                </ToDoListWrapper>
              )}
            </Droppable>
          </DragDropContext>

          {isEditModeOn ? (
            <DeleteToDo todos={todos} setDeletedId={setDeletedId} />
          ) : (
            <AddToDoButton randomColor={randomColor} />
          )}
        </FlexContainer>
      </PageContainer>
      {isAllCompleted ? <CompletionConfetti /> : null}
    </DndProvider>
  );
};

export default Main;
