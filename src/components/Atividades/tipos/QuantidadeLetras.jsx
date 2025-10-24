import React, { useState } from "react";
import styles from "../Atividades.module.css";

const QuantidadeLetras = ({ exercicio, onVerificar }) => {
  const [resposta, setResposta] = useState("");
  const numeros = "0123456789".split("");

  return (
    <div>
      <p className={styles.sub}>Quantas letras tem esta palavra?</p>
      <h3 className={styles.palavra}>{exercicio.palavra}</h3>
      <input
        type="text"
        readOnly
        value={resposta}
        className={styles.inputExercicio}
      />

      <div className={styles.teclado}>
        {numeros.map((n) => (
          <button
            key={n}
            className={styles.btnLetra}
            onClick={() => setResposta(n)}
          >
            {n}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <button className={styles.btn} onClick={() => onVerificar(resposta)}>
          Verificar
        </button>
      </div>
    </div>
  );
};

export default QuantidadeLetras;
