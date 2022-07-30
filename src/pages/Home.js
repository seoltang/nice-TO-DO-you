import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ToDoList from '../components/ToDoList';
import AddToDoButton from '../components/AddToDoButton';
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
      },
    ]);
  };

  return (
    <Container>
      <ToDoListWrapper>
        {toDoData.length === 0
          ? null
          : toDoData.map(({ id, color, textValue }) => (
              <ToDoList
                key={id}
                id={id}
                color={color}
                textValue={textValue}
                setToDoData={setToDoData}
                toDoData={toDoData}
              />
            ))}
        <AddToDoButton randomColor={randomColor} addNewToDo={addNewToDo} />
      </ToDoListWrapper>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.flexCustom('center', 'initial', 'column')}
  margin: 20px;
`;

const ToDoListWrapper = styled.div`
  width: 100%;
`;

export default Home;
