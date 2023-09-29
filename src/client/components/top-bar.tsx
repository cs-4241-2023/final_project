import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOR_THEME } from '../color-theme';

const Bar = styled.div`
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

interface TopBarProps {
  title: string;
}

const TopBar: FC<TopBarProps> = ({ title }) => (
  <Bar>
    <link href='https://fonts.googleapis.com/css?family=Road Rage' rel='stylesheet'></link>
    <Title>{title}</Title>
  </Bar>
);

export default TopBar;
