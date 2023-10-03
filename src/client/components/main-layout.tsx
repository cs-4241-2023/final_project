import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Title } from './css-components/title';
import { COLOR_THEME, FONT_THEME } from '../themes';

const TopBar = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: ${COLOR_THEME.TOPBAR};
color: white;
height: 80px;
width: 100%; // Ensure it spans the entire width of the viewport
box-shadow: 0px 3px 10px rgba(0,0,0,0.2);
z-index: 1000; // Ensure it stacks on top of other elements
`;


const ContentContainer = styled.div`
  flex-grow: 1; // Allow this component to grow and occupy the available space
  overflow-y: auto; // Add scroll if content overflows
  width: 100%;
  left: 0;
  background-color: ${COLOR_THEME.BACKGROUND};
`;

interface MainLayoutProps {
  content: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ content }) => (
  <>
    <TopBar>
      <Title>DailyDive</Title>
    </TopBar>
    <ContentContainer>
      {content}
    </ContentContainer>
  </>
);

export default MainLayout;
