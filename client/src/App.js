import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function App() {
    const [message, setMessage] = useState('');
    useEffect(() => {
      // Fetch data from the Express server
      axios.get('http://localhost:5000/')
        .then(response => setMessage(response.data))
        .catch(error => console.error('errore: ' + error));
    }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
