import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import COELogin from './pages/COELoginpage/COELogin';
import COEDashboard from './pages/COEDash/COEDashboard';
import COEResults from './pages/COEResults/COEResults';


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<COELogin />} />
        <Route path='/dashboard' element={ <COEDashboard /> } />
        <Route path='/results' element={<COEResults /> } />
      </Routes>
    </Router>
  )
}

export default App
