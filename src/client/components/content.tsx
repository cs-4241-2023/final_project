import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOR_THEME } from '../color-theme';

const Container = styled.div`
  flex-grow: 1; // Allow this component to grow and occupy the available space
  overflow-y: auto; // Add scroll if content overflows
  width: 100%;
  left: 0;
  background-color: ${COLOR_THEME.BACKGROUND};
`;

interface ContentProps {
  children?: React.ReactNode;
}

const Content: FC<ContentProps> = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default Content;
