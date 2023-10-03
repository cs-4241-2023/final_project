import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import { COLOR_THEME } from '../color-theme';
import HomePage from './home-page/home-page';
import HabitPage from './habit-page/habit-page';

const Container = styled.div`
  flex-grow: 1; // Allow this component to grow and occupy the available space
  overflow-y: auto; // Add scroll if content overflows
  width: 100%;
  left: 0;
  background-color: ${COLOR_THEME.BACKGROUND};
`;


const Content: FC = () => (
  <Container>
    <BrowserRouter>
      <Routes>
        <Route path="/habit/:profile" element={<HabitPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </Container>
);

export default Content;
