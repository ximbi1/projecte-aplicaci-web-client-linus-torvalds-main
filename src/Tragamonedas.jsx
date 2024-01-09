import React, { useState } from 'react';
import './Tragamonedas.css'; 

const Tragamonedas = () => {
  const [ruedas, setRuedas] = useState([
    ["🍋", "🍋", "🍋"],
    ["🍋", "🍋", "🍋"],
    ["🍋", "🍋", "🍋"]
  ]);
  const [creditos, setCreditos] = useState(100);
  const apuesta = 10;

  const girarTragamonedas = () => {
    if (creditos < apuesta) {
      alert("No tienes suficientes créditos para girar.");
      return;
    }

    const simbolos = ["🍋", "🔔", "🍒", "🍉", "🍇", "⭐"];
    const nuevasRuedas = ruedas.map(fila => 
      fila.map(() => simbolos[Math.floor(Math.random() * simbolos.length)])
    );
    setRuedas(nuevasRuedas);
    setCreditos(creditos => creditos - apuesta);

    // Comprobar líneas de pago
    comprobarLineasDePago(nuevasRuedas);
  }

  const comprobarLineasDePago = (nuevasRuedas) => {
    // Comprobar líneas de pago horizontales
    nuevasRuedas.forEach(fila => comprobarLinea(fila));

    // Comprobar líneas de pago verticales
    for (let i = 0; i < nuevasRuedas[0].length; i++) {
      const columna = nuevasRuedas.map(fila => fila[i]);
      comprobarLinea(columna);
    }

    // Comprobar líneas de pago diagonales
    const diagonal1 = nuevasRuedas.map((fila, index) => fila[index]);
    const diagonal2 = nuevasRuedas.map((fila, index) => fila[fila.length - 1 - index]);
    comprobarLinea(diagonal1);
    comprobarLinea(diagonal2);
  }

  const comprobarLinea = (linea) => {
    if (linea.every(simbolo => simbolo === linea[0])) {
      setCreditos(creditos => creditos + 30); // Ganancia fija de 30 créditos por línea
      alert("¡Ganaste 30 créditos en una línea!");
    }
  }

  return (
    <div>
      <h2>Tragamonedas</h2>
      <div className="tragamonedas-container">
        {ruedas.map((fila, filaIndex) => (
          <div key={filaIndex} className="tragamonedas-fila">
            {fila.map((simbolo, simboloIndex) => (
              <span key={simboloIndex} className="tragamonedas-simbolo">{simbolo}</span>
            ))}
          </div>
        ))}
      </div>
      <p>Créditos: {creditos}</p>
      <button onClick={girarTragamonedas} className="tragamonedas-boton">Girar (Costo: {apuesta} créditos)</button>
    </div>
  );
}

export default Tragamonedas;
