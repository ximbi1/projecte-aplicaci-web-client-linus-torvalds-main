// Ruleta.jsx
import React, { useState } from 'react';
import './Ruleta.css'; 

const Ruleta = () => {
  const [posicionRueda, setPosicionRueda] = useState(0);
  const [tipoApuesta, setTipoApuesta] = useState('numero'); // 'numero', 'color', 'paridad', 'rango'
  const [apuesta, setApuesta] = useState(0);
  const [valorApuesta, setValorApuesta] = useState('');
  const [creditos, setCreditos] = useState(100);
  const [resultado, setResultado] = useState('');

  const girarRuleta = () => {
    if (creditos < apuesta) {
      alert("No tienes suficientes créditos para apostar.");
      return;
    }

    const nuevaPosicion = Math.floor(Math.random() * 36); // Simplificación, la ruleta real tiene 37 o 38 posiciones
    setPosicionRueda(nuevaPosicion);
    setCreditos(creditos - apuesta);

    calcularGanancias(nuevaPosicion);
  };

  const calcularGanancias = (numeroRuleta) => {
    switch (tipoApuesta) {
      case 'numero':
        // Apuesta a un número específico
        if (numeroRuleta.toString() === valorApuesta) {
          const ganancia = apuesta * 35; // Pago típico en la ruleta para apuesta a número
          setCreditos(creditos => creditos + ganancia);
          setResultado(`¡Ganaste! La ganancia es ${ganancia} créditos.`);
        } else {
          setResultado('No hubo coincidencia. Inténtalo de nuevo.');
        }
        break;
  
      case 'color':
        // Apuesta a color (rojo o negro)
        const esRojo = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(numeroRuleta);
        const apuestaCorrecta = (valorApuesta === 'rojo' && esRojo) || (valorApuesta === 'negro' && !esRojo);
        if (apuestaCorrecta) {
          const ganancia = apuesta * 2; // Pago típico para apuestas a color
          setCreditos(creditos => creditos + ganancia);
          setResultado(`¡Ganaste! La ganancia es ${ganancia} créditos.`);
        } else {
          setResultado('No hubo coincidencia. Inténtalo de nuevo.');
        }
        break;
  
      case 'paridad':
        // Apuesta a par o impar
        const esPar = numeroRuleta % 2 === 0;
        if ((valorApuesta === 'par' && esPar) || (valorApuesta === 'impar' && !esPar)) {
          const ganancia = apuesta * 2; // Pago típico para apuestas par/impar
          setCreditos(creditos => creditos + ganancia);
          setResultado(`¡Ganaste! La ganancia es ${ganancia} créditos.`);
        } else {
          setResultado('No hubo coincidencia. Inténtalo de nuevo.');
        }
        break;
  
      case 'rango':
        // Apuesta a un rango de números, por ejemplo, 1-12, 13-24, 25-36
        // Asumiendo que valorApuesta sea algo como '1-12'
        const [min, max] = valorApuesta.split('-').map(Number);
        if (numeroRuleta >= min && numeroRuleta <= max) {
          const ganancia = apuesta * 3; // Pago para apuestas de rango
          setCreditos(creditos => creditos + ganancia);
          setResultado(`¡Ganaste! La ganancia es ${ganancia} créditos.`);
        } else {
          setResultado('No hubo coincidencia. Inténtalo de nuevo.');
        }
        break;
  
      default:
        setResultado('Tipo de apuesta no reconocido.');
    }
  };
  

  return (
    <div className="ruleta-container">
      <h2>Ruleta</h2>
      <div className="ruleta-rueda">Posición actual de la rueda: {posicionRueda}</div>
      <div>
        Tipo de Apuesta:
        <select value={tipoApuesta} onChange={(e) => setTipoApuesta(e.target.value)}>
          <option value="numero">Número</option>
          <option value="color">Color</option>
          <option value="paridad">Par/Impar</option>
          <option value="rango">Rango</option>
        </select>
      </div>
      <div>
        Valor de la Apuesta:
        <input type="text" value={valorApuesta} onChange={(e) => setValorApuesta(e.target.value)} />
      </div>
      <div>
        Cantidad Apostada:
        <input type="number" value={apuesta} onChange={(e) => setApuesta(Number(e.target.value))} />
      </div>
      <div>Tus créditos: {creditos}</div>
      <button onClick={girarRuleta}>Girar Ruleta</button>
      <div>{resultado}</div>
    </div>
  );
}

export default Ruleta;
