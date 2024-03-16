import React, { useState } from 'react';

const AgePredictionComponent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [error, setError] = useState('');
  const [lastSubmittedName, setLastSubmittedName] = useState('');

  const fetchAgePrediction = async (currentName) => {
    setLoading(true);
    setError('');

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(`https://api.agify.io/?name=${currentName}`, { signal });
      const data = await response.json();

      if (!signal.aborted) {
        setAge(data.age);
        setLastSubmittedName(currentName);
      }
    } catch (error) {
      console.error('Error fetching age prediction:', error);
      setAge(null);
      setError('Произошла ошибка при получении возраста');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
  
    clearTimeout(typingTimeout);
  
    setTypingTimeout(setTimeout(() => {
      if (inputName.trim() !== '') {
        if (inputName !== lastSubmittedName) {
          handleSubmit();
        }
      } else {
        setError('Это поле не может быть пустым');
        setAge(null);
      }
    }, 3000));
  };

  const handleSubmit = () => {
    if (name.trim() === '') {
      setError('Это поле не может быть пустым');
      setAge(null);
    } else if (/^[a-zA-Z]+$/.test(name)) {
        fetchAgePrediction(name);
    } else {
        setError('Имя должно содержать только буквы английского алфавита');
        setAge(null);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input 
          className="name-input" 
          type="text" 
          placeholder="Введите свое имя" 
          value={name} 
          onChange={handleInputChange} 
        />
        <button className="submit-button" type="submit">Отправить</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="age-info">Загрузка...</p> : age && <p className="age-info">Возраст: {age}</p>}
    </div>
  );
};

export default AgePredictionComponent;
