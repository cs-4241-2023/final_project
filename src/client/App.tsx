import { useState } from "react";

import reactLogo from "./assets/react.svg";
import TopBar from "./components/main-layout/main-layout";
import styled from "styled-components";
import MainLayout from "./components/main-layout/main-layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HabitPage from "./components/habit-page/habit-page";
import LoginPage from "./components/login-page/login-page";
import HomePage from "./components/home-page/home-page";
import { AuthType } from "./models/enums";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw; // Use the full viewport width
  height: 100vh; // Use the full viewport height
`;

function App() {

  const [username, setUsername] = useState<string>("[Unknown]");

  return (
    <AppContainer>

      <BrowserRouter>
        <Routes>
          <Route path="/habit/:habitID" element={<MainLayout username={username} content={<HabitPage />} />} />
          <Route path="/home" element={<MainLayout username={username} content={<HomePage setUsername={setUsername} />} />} />
          <Route path="/register" element={<LoginPage authType={AuthType.SIGNUP}/>} />
          <Route path="*" element={<LoginPage authType={AuthType.LOGIN}/>} />
        </Routes>
      </BrowserRouter>
      
    </AppContainer>
  );
}

export default App;
