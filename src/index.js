import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CalendarPage from './components/CalendarPage'
import DealPage from './components/DealPage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <div id='headerBox'>
    <h4>WhatsTheDeal</h4>
  </div>
  <BrowserRouter>
    <Routes>
      <Route path="/calendar" element={<CalendarPage />}></Route> 
      <Route path="/" element={<App />}></Route>
      <Route path = "/dealPage" element ={<DealPage/>}></Route>
    </Routes>
  </BrowserRouter>

  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
