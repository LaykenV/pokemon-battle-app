import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import BattlePage from './components/battlePage';
import HomePage from './components/homePage';


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/battle" element={<BattlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
