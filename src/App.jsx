import React from 'react';
import './App.css';
import Navegacion from './Navegacion'; 
import Tragamonedas from './Tragamonedas'; 
import Ruleta from './Ruleta';
import DinoDash from './DinoDash';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido al Casino Online</h1>
      </header>
      <Navegacion />
      <Tragamonedas />
      <Ruleta />
      <DinoDash />
    </div>
  );
}

export default App;
