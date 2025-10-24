import React, { useState } from "react";
import styles from "../Atividades.module.css";

const DigitarPalavra = ({ exercicio, onVerificar }) => {
  const [resposta, setResposta] = useState("");

  if (!exercicio) return null;

  const verificar = () => {
    if (onVerificar) onVerificar(resposta);
    setResposta("");
  };

  return (
    <div className={styles.digitarPalavra}>
      <p className={styles.descricao}>Digite a palavra completa:</p>
      <h3 className={styles.palavraReferencia}>{exercicio.palavra}</h3>

      <input
        type="text"
        className={styles.inputExercicio}
        value={resposta}
        readOnly
      />

      <div className={styles.teclado}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letra, i) => (
          <button
            key={i}
            className={styles.btnLetra}
            onClick={() => setResposta(prev => prev + letra)}
          >
            {letra}
          </button>
        ))}
      </div>

      <div className={styles.botoesContainer}>
        <button onClick={() => setResposta("")} className={`btn ${styles.btnLimpar}`}>
          Limpar
        </button>
        <button onClick={verificar} className={`btn ${styles.btnVerificar}`}>
          Verificar
        </button>
        
      </div>
    </div>
  );
};

export default DigitarPalavra;
