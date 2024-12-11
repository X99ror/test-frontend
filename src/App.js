
import './App.css';
import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);




  return (
    <div className="App">
      <RefreshHandler class="refresh" setIsAuthenticated={ setIsAuthenticated }/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
