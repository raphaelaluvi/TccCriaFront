import React, { useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const numeros = "0123456789".split("");

const QuantidadeLetras = ({ exercicio, onVerificar }) => {
  const [resposta, setResposta] = useState("");
  if (!exercicio) return null;

  const palavra = (exercicio.palavra || "").toUpperCase();
  const instrucoes = [
    "Quantas letras tem esta palavra?",
    `Palavra apresentada: ${palavra}`,
  ];

  return (
    <div>
      <p className={styles.sub}>Quantas letras tem esta palavra?</p>
      <h3 className={styles.palavraReferencia}>{palavra}</h3>
      <TtsButton text={instrucoes} />
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
        <button className={styles.btnVerificar} onClick={() => onVerificar(resposta)}>
          Verificar
        </button>
      </div>
    </div>
  );
};

export default QuantidadeLetras;
