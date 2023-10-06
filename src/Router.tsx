import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DashboardPage from "./pages/Dashboard"
import CreatePage from "./pages/Create"
import AuthPage from './pages/Auth';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router
