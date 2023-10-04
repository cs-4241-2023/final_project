import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/Login"
import DashboardPage from "./pages/Dashboard"
import BuildPage from "./pages/Build"

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/build' element={<BuildPage />} />
      </Routes>
    </Router>
  );
}

export default App
