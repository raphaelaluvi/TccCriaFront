import React, { useState } from "react";
import styles from "../Atividades.module.css";

const UltimaLetra = ({ exercicio, onVerificar }) => {
  const [resposta, setResposta] = useState("");
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div>
      <p className={styles.sub}>Qual é a última letra desta palavra?</p>
      <h3 className={styles.palavra}>{exercicio.palavra}</h3>
      <input
        type="text"
        readOnly
        value={resposta}
        className={styles.inputExercicio}
      />

      <div className={styles.teclado}>
        {letras.map((l) => (
          <button
            key={l}
            className={styles.btnLetra}
            onClick={() => setResposta(l)}
          >
            {l}
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

export default UltimaLetra;
