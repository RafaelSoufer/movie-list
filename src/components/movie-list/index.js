import React, { useState } from 'react';
import './index.css';

function Movielist() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [result, setResult] = useState([]);
  const [clicked, setClicked] = useState(false);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const onClick = () => {
    result.length > 0 ? setClicked(false) : setClicked(true) 
    resolveData(selectedYear);
  };

  const resolveData = async (year) => {
    try {
      const response = await fetch(
        `https://jsonmock.hackerrank.com/api/moviesdata?Year=${year}`
      );
      const result = await response.json();
      setResult(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="number"
          placeholder="Enter Year eg 2015"
          data-testid="app-input"
          className="large"
          value={selectedYear}
          onChange={handleYearChange}
        />
        <button  className="" data-testid="submit-button" onClick={onClick}>
          Search
        </button>
      </section>
        <ul data-testid="movieList" className="mt-50 styled">
          {result.length >= 0 && result.map((movie) => (
            <li key={movie.imdbID} className="slide-up-fade-in py-10">{movie.Title}</li>
          ))}
        </ul>
      {result.length === 0 && clicked && <p className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</p> }
    </div>
  );
}

export default Movielist;