import { useState } from "react";

import reactLogo from "./assets/react.svg";
import TopBar from "./components/top-bar";
import styled from "styled-components";
import Content from "./components/content";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw; // Use the full viewport width
  height: 100vh; // Use the full viewport height
`;

function App() {

  return (
    <AppContainer>
      <TopBar title="DailyDive"/>
      <Content>tesasdfsdfdsfsdfsdfst</Content>
    </AppContainer>
  );
}

export default App;
