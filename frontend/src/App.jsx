import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login/login'
import Signup from './pages/SignUp/SignUp'
import UpdateModal from './components/UpdateModal'

import VerifyMail from './pages/VerifyMail'
import { TodoProvider } from './components/context/TodoContext'


function App() {
 

  return (
    <>
    <TodoProvider>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
          <Route path="/update/:id" element={<UpdateModal />} /> 
          <Route path="/user/verify/:token" element={<VerifyMail />} />
        {/* <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
    </TodoProvider>
     
    </>
  )
}

export default App
