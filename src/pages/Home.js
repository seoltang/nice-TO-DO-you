import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import styled from 'styled-components';
import ToDoList from '../components/ToDoList';
import DragLayerPreview from '../components/DragLayerPreview';
import theme from '../styles/theme';

const Home = () => {
  const [toDoData, setToDoData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('toDoList');
    if (data) {
      setToDoData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoData));
  }, [toDoData]);

  const colorValues = Object.values(theme.random);
  const randomColor =
    colorValues[Math.floor(Math.random() * colorValues.length)];

  const addNewToDo = () => {
    setToDoData(prev => [
      ...prev,
      {
        id: prev[prev.length - 1]?.id + 1 || 0,
        color: randomColor,
        textValue: '',
        isCompleted: false,
      },
    ]);
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Container>
        <ToDoListWrapper>
          {toDoData.length === 0
            ? null
            : toDoData.map(({ id, color, textValue, isCompleted }) => (
                <ToDoList
                  key={id}
                  id={id}
                  color={color}
                  textValue={textValue}
                  isCompleted={isCompleted}
                  setToDoData={setToDoData}
                  toDoData={toDoData}
                />
              ))}
          <DragLayerPreview
            toDoData={toDoData}
            randomColor={randomColor}
            addNewToDo={addNewToDo}
          />
        </ToDoListWrapper>
      </Container>
    </DndProvider>
  );
};

const Container = styled.div`
  position: relative;
  ${({ theme }) => theme.flexCustom('center', 'initial', 'column')}
  margin: 20px;
`;

const ToDoListWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.listSize * 1.2 + 60}px;
  width: 100%;
`;

export default Home;
