// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de haber instalado react-router-dom

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido al Casino Online</h1>
      <nav>
        <ul>
          <li><Link to="/tragamonedas">Jugar Tragamonedas</Link></li>
          <li><Link to="/ruleta">Jugar Ruleta</Link></li>
          <li><Link to="/DinoDash">jugar dino dash</Link></li>
          {/* Más enlaces a otros juegos  */}
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
