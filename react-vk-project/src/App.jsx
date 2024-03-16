import React from 'react';
import CatFactComponent from './components/CatFactsComponent';
import AgePredictionComponent from './components/AgePredictionComponent';

const App = () => {
  return (
    <div className='main'>
      <h1 className='main-label'>Welcome to VK Cat App!</h1>
      <CatFactComponent />
      <AgePredictionComponent />
    </div>
  );
};

export default App;
