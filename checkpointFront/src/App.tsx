import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Game from './components/Game';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
