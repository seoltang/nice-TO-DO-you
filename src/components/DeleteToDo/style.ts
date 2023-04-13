import styled from 'styled-components';

type TrashCanProps = {
  isOver: boolean;
  draggingId: string;
  getTrashCanColor: (
    isOver: boolean,
    id: string
  ) => {
    backgroundColor: string;
    fontColor: string;
  };
};

export const Container = styled.div`
  position: fixed;
  bottom: 48px;
  left: 50%;
  ${({ theme }) => theme.flexCustom()}
  transform: translateX(-50%);
`;

export const TrashCan = styled.div<TrashCanProps>`
  ${({ theme }) => theme.flexCustom()}
  width: 72px;
  height: 72px;
  background-color: ${({ isOver, draggingId, getTrashCanColor }) =>
    getTrashCanColor(isOver, draggingId).backgroundColor};
  color: ${({ isOver, draggingId, getTrashCanColor }) =>
    getTrashCanColor(isOver, draggingId).fontColor};
  border: 2px solid
    ${({ isOver, draggingId, getTrashCanColor }) =>
      getTrashCanColor(isOver, draggingId).fontColor};
  border-radius: 50%;
  font-size: ${({ theme }) => theme.listSize + 8}px;
  transform: ${({ isOver }) => (isOver ? 'scale(1.25)' : 'none')};
`;
