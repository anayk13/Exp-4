import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(name);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="main-title">React Selenium Testing Demo</h1>
        
        <div className="counter-section">
          <h2>Counter Demo</h2>
          <p id="counter-value">Count: {count}</p>
          <button id="increment-btn" onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <button id="decrement-btn" onClick={() => setCount(count - 1)}>
            Decrement
          </button>
          <button id="reset-btn" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>

        <div className="form-section">
          <h2>Form Demo</h2>
          <form onSubmit={handleSubmit}>
            <input
              id="name-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button id="submit-btn" type="submit">Submit</button>
          </form>
          {submittedName && (
            <p id="greeting-message">Hello, {submittedName}!</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
