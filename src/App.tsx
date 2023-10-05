import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardPage from "./pages/Dashboard"
import CreatePage from "./pages/Create"
import AuthPage from './pages/Auth';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </Router>
  );
}

export default App
