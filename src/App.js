// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'

// Import the API category from AWS Amplify
import { API } from 'aws-amplify'

import './App.css';

const App = () => {

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 })

  // Create a new function to allow users to update the input values
  const updateInputValues = (type, value) => {
    updateInput({ ...input, [type]: value }); 
  };

  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);

  // Define function to all API
  const fetchCoins = async () => {
    const { limit, start } = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
    updateCoins(data.coins);
  };

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">

      <input
          onChange={e => updateInputValues('limit', e.target.value)}
          placeholder="Enter a limit"
        />
      <input
        placeholder="Enter a starting value"
        onChange={e => updateInputValues('start', e.target.value)}
      />

      <button onClick={fetchCoins}>Fetch Coins</button>

      {
        coins.map((coins) => (
          <div key={coins.name}>
            <h2>{coins.name} - {coins.symbol}</h2>
            <h5>${coins.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App