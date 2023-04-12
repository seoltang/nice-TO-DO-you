import styled from 'styled-components';

export const StyledButton = styled.button`
  all: unset;
  align-self: flex-end;
  font-size: 20px;
  cursor: pointer;

  i {
    color: ${({ theme }) => theme.color.ink};
    vertical-align: text-top;
    line-height: 1.2;
  }
`;
