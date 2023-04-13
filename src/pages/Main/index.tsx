import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import todoDb from '@utils/todoDb';
import EditButton from '@components/EditButton';
import AddTodoButton from '@components/AddTodoButton';
import DeleteTodo from '@components/DeleteTodo';
import CompletionConfetti from '@components/CompletionConfetti';
import UserButton from '@components/UserButton';
import TodoList from './TodoList';
import theme from '@styles/theme';
import { PageContainer, FlexContainer, Nav } from './style';
import useAuthState from '@hooks/useAuthState';

const Main = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
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

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <PageContainer>
        <FlexContainer>
          <Nav>
            <EditButton setisEditModeOn={setisEditModeOn} />
            <UserButton imageURL={user.imageURL} />
          </Nav>

          <TodoList
            todos={todos}
            setTodos={setTodos}
            deletedId={deletedId}
            isEditModeOn={isEditModeOn}
          />

          {isEditModeOn ? (
            <DeleteTodo todos={todos} setDeletedId={setDeletedId} />
          ) : (
            <AddTodoButton randomColor={randomColor} />
          )}
        </FlexContainer>
      </PageContainer>
      {isAllCompleted ? <CompletionConfetti /> : null}
    </DndProvider>
  );
};

export default Main;
