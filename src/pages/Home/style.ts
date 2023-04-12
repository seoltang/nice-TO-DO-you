import styled from 'styled-components';

export const PageContainer = styled.div`
  position: relative;
  ${({ theme }) => theme.flexCustom('center', 'flex-start', 'column')}

  @media ${({ theme }) => theme.desktop} {
    background-color: ${({ theme }) => theme.color.lemonCream};
  }
`;

export const FlexContainer = styled.div`
  ${({ theme }) => theme.flexCustom('center', 'initial', 'column')}
  padding: 20px;
  padding-bottom: ${({ theme }) => theme.listSize * 1.2 + 80}px;
  width: 100%;

  @media ${({ theme }) => theme.desktop} {
    max-width: 1024px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.floralWhite};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
`;

export const ToDoListWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
