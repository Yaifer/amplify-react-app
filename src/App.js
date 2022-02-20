// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'

// Import the API category from AWS Amplify
import { API } from 'aws-amplify'

import './App.css';

const App = () => {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);

  // Define function to all API
  const fetchCoins = async () => {
    const data = await API.get('cryptoapi', '/coins');
    console.log(data);
    updateCoins(data.coins)
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, []);

  return (
    <div className="App">
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