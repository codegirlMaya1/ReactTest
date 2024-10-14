import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import CreateMeal from './pages/CreateMeal';
import Training from './pages/Training';
import Meal from './pages/Meal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Meal />} />
          <Route path="/create-meal" element={<CreateMeal />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



