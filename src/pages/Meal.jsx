import React from 'react';

const Meal = () => {
  const meal = JSON.parse(localStorage.getItem('meal')) || ['Sample Meal 1', 'Sample Meal 2'];

  return (
    <div className="container">
      <h1>Meal Page</h1>
      <div className="meal-container">
        <ul>
          {meal.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="meal-created">New Meal Created</p>
      </div>
    </div>
  );
};

export default Meal;
