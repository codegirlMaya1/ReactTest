import React, { useState } from 'react';
import axios from 'axios';

const CreateMeal = () => {
  const [queries, setQueries] = useState(['', '', '']);
  const [calories, setCalories] = useState([null, null, null]);
  const [error, setError] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  const apiUrl = 'https://api.calorieninjas.com/v1/nutrition?query=';
  const apiKey = 'NySt6YE2ytkKbu1pTRXo5w==pJ5uxJzQbJIXvVqI';

  const fetchData = async () => {
    try {
      const responses = await Promise.all(
        queries.map(query =>
          axios.get(apiUrl + query, {
            headers: { 'X-Api-Key': apiKey }
          })
        )
      );
      const caloriesData = responses.map(response => response.data.items[0].calories);
      setCalories(caloriesData);
      const total = caloriesData.reduce((acc, curr) => acc + curr, 0);
      setTotalCalories(total);
      if (total > 1500) {
        setError('Calorie count is too high. Test failed.');
      } else {
        setError(null);
        localStorage.setItem('meal', JSON.stringify(queries));
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container">
      {queries.map((query, index) => (
        <input
          key={index}
          type="text"
          value={query}
          onChange={(e) => {
            const newQueries = [...queries];
            newQueries[index] = e.target.value;
            setQueries(newQueries);
          }}
          placeholder={`Enter food item ${index + 1}`}
        />
      ))}
      <button className="btn btn-primary" onClick={fetchData}>Submit</button>
      {calories.map((cal, index) => cal && <p key={index}>Calories in {queries[index]}: {cal}</p>)}
      {totalCalories > 0 && <p>Total Calories: {totalCalories}</p>}
      {error && <p>{error}</p>}
      {!error && totalCalories <= 1500 && <p>New Meal Created</p>}
    </div>
  );
};

export default CreateMeal;
