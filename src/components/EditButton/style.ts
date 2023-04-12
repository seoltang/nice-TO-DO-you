import styled from 'styled-components';

export const StyledButton = styled.button`
  all: unset;
  align-self: flex-end;
  cursor: pointer;

  i {
    color: ${({ theme }) => theme.color.ink};
  }
`;
