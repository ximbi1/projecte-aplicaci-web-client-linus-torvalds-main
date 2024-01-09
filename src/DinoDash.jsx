// DinoDash.jsx
import React, { useState, useEffect } from 'react';
import './Dino.css'; 

const DinoDash = () => {
  const [apuesta, setApuesta] = useState(0);
  const [multiplicador, setMultiplicador] = useState(1.0);
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [resultado, setResultado] = useState('');
  const [contador, setContador] = useState(0); // Contador para terminación aleatoria

  useEffect(() => {
    let intervalo;
    if (juegoActivo) {
      intervalo = setInterval(() => {
        setMultiplicador(prev => prev + 0.1);
        setContador(prev => prev + 1);
        if (contador > limiteAleatorio()) {
          finalizarJuego();
        }
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [juegoActivo, contador]);

  const iniciarJuego = () => {
    setApuesta(10); // O permitir al jugador establecer su apuesta
    setMultiplicador(1.0);
    setJuegoActivo(true);
    setResultado('');
    setContador(0);
  };

  const retirarse = () => {
    setJuegoActivo(false);
    const ganancia = apuesta * multiplicador;
    setResultado(`Te retiraste con una ganancia de ${ganancia.toFixed(2)} créditos!`);
    // Aquí acreditaremos las ganancias al jugador
  };

  const finalizarJuego = () => {
    setJuegoActivo(false);
    setResultado('¡El meteorito ha impactado! Juego terminado.');
  };

  const limiteAleatorio = () => {
    // Retorna un valor aleatorio que determina cuándo termina el juego
    return Math.floor(Math.random() * 20) + 10; // Ejemplo: entre 10 y 30 segundos
  };

  return (
    <div>
      <h2>Dino Dash</h2>
      <button onClick={iniciarJuego} disabled={juegoActivo}>Iniciar Juego</button>
      <button onClick={retirarse} disabled={!juegoActivo}>Retirarse</button>
      <div>Multiplicador Actual: {multiplicador.toFixed(2)}x</div>
      <div>{resultado}</div>
      {/* Aquí podremos añadir un campo para que el jugador ingrese su apuesta */}
    </div>
  );
}

export default DinoDash;
