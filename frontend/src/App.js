// import React from 'react'
// import Login from './non_auth_pages/Login'
// import Register from './non_auth_pages/Register'
// import Home from './auth_pages/Home'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Login />}> </Route>
//         <Route path='/login' element={<Login />}> </Route>
//         <Route path='/register' element={<Register />}> </Route>
//         <Route path='/home' element={<Home />}> </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './non_auth_pages/Login';
import Register from './non_auth_pages/Register';
import Home from './auth_pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={<Home />} // Render Home only if logged in
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
