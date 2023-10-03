import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { COLOR_THEME } from '../color-theme';

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

const Title = styled.h1`
  font-size: 60px;
  font-family: 'Road Rage';
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
      <link href='https://fonts.googleapis.com/css?family=Road Rage' rel='stylesheet'></link>
      <Title>DailyDive</Title>
    </TopBar>
    <ContentContainer>
      {content}
    </ContentContainer>
  </>
);

export default MainLayout;
