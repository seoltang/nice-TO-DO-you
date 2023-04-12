import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import {
  DragDropContext,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import ToDoList from '../../components/ToDoList';
import EditButton from '../../components/EditButton';
import AddToDoButton from '../../components/AddToDoButton';
import DeleteToDo from '../../components/DeleteToDo';
import CompletionConfetti from '../../components/CompletionConfetti';
import { TODO_KEY_NAME } from '../../config';
import theme from '../../styles/theme';
import type { ToDoType } from '../../types/todo';
import { PageContainer, FlexContainer, ToDoListWrapper } from './style';

const Home = () => {
  const [toDos, setToDos] = useState<ToDoType[]>([]);
  const [randomColor, setRandomColor] = useState('');
  const [isEditModeOn, setisEditModeOn] = useState(false);
  const [deletedId, setDeletedId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) return;

      navigate('/login');
    });

    const savedToDos = localStorage.getItem(TODO_KEY_NAME);
    if (savedToDos) {
      setToDos(JSON.parse(savedToDos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_KEY_NAME, JSON.stringify(toDos));
  }, [toDos]);

  useEffect(() => {
    const colorValues = Object.values(theme.color.random);
    setRandomColor(colorValues[Math.floor(Math.random() * colorValues.length)]);
  }, [toDos.length]);

  const isAllCompleted =
    toDos.length && toDos.map((ele) => ele.isCompleted).every((ele) => ele);

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
    if (deletedId === +result.draggableId) {
      setToDos((prevtoDos) =>
        [...prevtoDos].filter((ele) => ele.id !== deletedId)
      );
      return;
    }

    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    setToDos((prevtoDos) =>
      reorder(prevtoDos, result.source.index, result.destination!.index)
    );
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <PageContainer>
        <FlexContainer>
          <EditButton setisEditModeOn={setisEditModeOn} />

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todo">
              {(provided) => (
                <ToDoListWrapper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {toDos.length
                    ? toDos.map(
                        ({ id, color, textValue, isCompleted }, index) => (
                          <ToDoList
                            key={id}
                            id={id}
                            index={index}
                            color={color}
                            textValue={textValue}
                            isCompleted={isCompleted}
                            setToDos={setToDos}
                            toDos={toDos}
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
            <DeleteToDo toDos={toDos} setDeletedId={setDeletedId} />
          ) : (
            <AddToDoButton randomColor={randomColor} setToDos={setToDos} />
          )}
        </FlexContainer>
      </PageContainer>
      {isAllCompleted ? <CompletionConfetti /> : null}
    </DndProvider>
  );
};

export default Home;
