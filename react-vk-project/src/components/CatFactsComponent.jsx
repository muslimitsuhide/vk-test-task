import React, { useState, useEffect, useRef } from 'react';
import "../index.css";

const CatFactComponent = () => {
  const [fact, setFact] = useState('');
  const textareaRef = useRef(null);

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error('Error fetching cat fact:', error);
    }
  };

  useEffect(() => {
    if (fact && textareaRef.current) {
      const firstSpaceIndex = fact.indexOf(' ');
      textareaRef.current.setSelectionRange(firstSpaceIndex + 1, firstSpaceIndex + 1);
      textareaRef.current.focus();
    }
  }, [fact]);

  const handleButtonClick = () => {
    fetchCatFact();
  };

  return (
    <div className='fact-div'>
      <textarea
        ref={textareaRef}
        className='fact-input'
        placeholder='Нажмите на кнопку, чтобы получить факт о кошках'
        value={fact}
      />
      <button className='submit-button' onClick={handleButtonClick}>Получить факт</button>
    </div>
  );
};

export default CatFactComponent;
