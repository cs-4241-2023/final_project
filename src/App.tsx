import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardPage from "./pages/Dashboard"
import BuildPage from "./pages/Build"
import AuthPage from './pages/Auth';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/build' element={<BuildPage />} />
      </Routes>
    </Router>
  );
}

export default App
