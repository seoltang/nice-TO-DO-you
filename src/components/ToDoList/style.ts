import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

type ListProps = {
  isDragging: boolean;
};

type StyledCheckboxProps = {
  isCompleted: boolean;
  isEditModeOn: boolean;
};

type StyledTextareaAutosizeProps = {
  $isCompleted: boolean;
  $color: string;
};

export const List = styled.li<ListProps>`
  ${({ theme }) => theme.flexCustom('row', 'flex-start')}
  margin-bottom: 12px;
  list-style: none;
`;

export const Checkbox = styled.input`
  display: none;
`;

export const CheckboxWrapper = styled.div`
  padding-top: 1px;
  padding-right: 8px;
`;

export const StyledCheckbox = styled.div<StyledCheckboxProps>`
  ${({ theme }) => theme.flexCustom()}
  width: ${({ theme }) => theme.listSize + 4}px;
  height: ${({ theme }) => theme.listSize + 4}px;
  background-color: ${(props) =>
    props.isCompleted && !props.isEditModeOn ? props.color : 'transparent'};
  border: 2px solid
    ${(props) => (props.isEditModeOn ? 'transparent' : props.color)};
  border-radius: 50%;
  cursor: pointer;
`;

export const StyledTextareaAutosize = styled(
  TextareaAutosize
)<StyledTextareaAutosizeProps>`
  all: unset;
  display: block;
  width: 100%;
  border-bottom: 1px solid transparent;
  color: ${(props) =>
    props.$isCompleted
      ? props.theme.color.gray[300]
      : props.theme.color.gray[900]};
  text-decoration: ${(props) => (props.$isCompleted ? 'line-through' : 'none')};
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  overflow: hidden;
  resize: none;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  }

  &::selection {
    background-color: ${({ $color }) => $color};
    color: ${({ theme }) => theme.color.floralWhite};
  }
`;

export const GripIcon = styled.i`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.listSize}px;
`;
