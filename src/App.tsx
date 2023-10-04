import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from "./pages/Splash"

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SplashPage />} />
      </Routes>
    </Router>
  );
}

export default App
