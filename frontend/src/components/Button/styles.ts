import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin: 24px 0;
  background: #ff9000;
  border: 0;
  height: 56px;
  padding: 0 16px;
  border-radius: 10px;
  color: #312e38;
  font-weight: 500;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
