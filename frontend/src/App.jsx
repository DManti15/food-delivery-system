import { useState } from 'react'
import './App.css'
import Home from './Home'
import Guest from './Guest'
import AdminLogin from './AdminLogin'
import AdminHome from './AdminHome'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> }></Route>
        <Route path="guest" element={ <Guest/> }></Route>
        <Route path="admin" element={ <AdminLogin/> }></Route>
        <Route path="admin-home" element={ <AdminHome/> }></Route>
      </Routes>
    </div>
  )
}

export default App
