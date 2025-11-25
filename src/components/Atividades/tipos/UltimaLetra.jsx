import React, { useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const UltimaLetra = ({ exercicio, onVerificar }) => {
  const [resposta, setResposta] = useState("");
  if (!exercicio) return null;

  const palavra = (exercicio.palavra || "").toUpperCase();
  const instrucoes = [
    "Qual é a última letra desta palavra?",
    `Palavra apresentada: ${palavra}`,
  ];

  return (
    <div>
      <p className={styles.sub}>Qual é a última letra desta palavra?</p>
      <h3 className={styles.palavraReferencia}>{palavra}</h3>
      <TtsButton text={instrucoes} />
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
        <button className={styles.btnVerificar} onClick={() => onVerificar(resposta)}>
          ✓
        </button>
      </div>
    </div>
  );
};

export default UltimaLetra;
