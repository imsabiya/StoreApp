import React from 'react';
import {Routes, Route, NavLink, Navigate} from 'react-router-dom';
import "./App.css";
import Home from './components/Home'

function App() {
  return (
    <div className="App container mx-auto">
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
