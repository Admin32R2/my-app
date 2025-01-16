import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [word, setWord] = useState('');           // State to store the input word
  const [upperWord, setUpperWord] = useState('');  // State to store the result (uppercase word)
  
  // Handle word input
  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  // Handle form submission (send word to Django API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to Django API
      const response = await axios.post('http://127.0.0.1:8000/api/convert/', { word });
      
      // Set the response to the state (uppercase word)
      setUpperWord(response.data.upper_word);
    } catch (error) {
      console.error('Error converting word:', error);
    }
  };

  return (
    <div>
      <h1>Convert Word to Uppercase</h1>
      
      {/* Input form */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={word} 
          onChange={handleWordChange} 
          placeholder="Enter a word" 
        />
        <button type="submit">Convert</button>
      </form>
      
      {/* Display result */}
      {upperWord && <h2>Uppercase Word: {upperWord}</h2>}
    </div>
  );
};

export default App;
