import React from 'react';

import Home from './Home';
import About from './About';
import Sponsor from './Sponsor';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sponsor" element={<Sponsor />} />
      </Routes>
    </Router>
  );
}

export default App;
