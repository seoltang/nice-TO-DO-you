import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ToDoList from '../components/ToDoList';
import EditButton from '../components/EditButton';
import AddToDoButton from '../components/AddToDoButton';
import DeleteToDo from '../components/DeleteToDo';
import CompletionConfetti from '../components/CompletionConfetti';
import theme from '../styles/theme';

const Home = () => {
  const [toDoData, setToDoData] = useState([]);
  const [randomColor, setRandomColor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('toDoList');
    if (data) {
      setToDoData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoData));
  }, [toDoData]);

  useEffect(() => {
    const colorValues = Object.values(theme.random);
    setRandomColor(colorValues[Math.floor(Math.random() * colorValues.length)]);
  }, [toDoData.length]);

  const isAllCompleted = toDoData
    .map(ele => ele?.isCompleted)
    .every(ele => ele);

  const reorder = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }, []);

  const onDragEnd = result => {
    if (deletedId === +result.draggableId) {
      setToDoData(prevToDoData =>
        [...prevToDoData].filter(ele => ele.id !== deletedId)
      );
      return;
    }

    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    setToDoData(prevToDoData =>
      reorder(prevToDoData, result.source.index, result.destination.index)
    );
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Container>
        <EditButton setIsEditMode={setIsEditMode} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo">
            {provided => (
              <ToDoListWrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {toDoData.length === 0
                  ? null
                  : toDoData.map(
                      ({ id, color, textValue, isCompleted }, index) => (
                        <ToDoList
                          key={id}
                          id={id}
                          index={index}
                          color={color}
                          textValue={textValue}
                          isCompleted={isCompleted}
                          setToDoData={setToDoData}
                          toDoData={toDoData}
                          deletedId={deletedId}
                          isEditMode={isEditMode}
                        />
                      )
                    )}
                {provided.placeholder}
              </ToDoListWrapper>
            )}
          </Droppable>
        </DragDropContext>
        {isEditMode ? (
          <DeleteToDo
            toDoData={toDoData}
            setToDoData={setToDoData}
            setDeletedId={setDeletedId}
          />
        ) : (
          <AddToDoButton randomColor={randomColor} setToDoData={setToDoData} />
        )}
      </Container>
      {isAllCompleted ? <CompletionConfetti /> : null}
    </DndProvider>
  );
};

const Container = styled.div`
  position: relative;
  ${({ theme }) => theme.flexCustom('center', 'initial', 'column')}
  padding: 20px;
  padding-bottom: ${({ theme }) => theme.listSize * 1.2 + 80}px;
`;

const ToDoListWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Home;
