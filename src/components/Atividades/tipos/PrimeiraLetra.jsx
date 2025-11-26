import React, { useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const cliqueSom = new Audio("/sons/somClique.mp3");

const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const PrimeiraLetra = ({ exercicio, onVerificar }) => {
  const [resposta, setResposta] = useState("");
  if (!exercicio) return null;

  const palavra = (exercicio.palavra || "").toUpperCase();
  const instrucoes = [
    "Qual é a primeira letra desta palavra?",
    `Palavra apresentada: ${palavra}`,
  ];

  return (
    <div>
      <p className={styles.sub}>Qual é a primeira letra desta palavra?</p>
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
            onClick={() => { 
              setResposta(l);
              cliqueSom.play();}}
          >
            {l}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.btnVerificar}
          onClick={() => {
            onVerificar(resposta)
          }}>
          Responder ✓
        </button>
      </div>
    </div>
  );
};

export default PrimeiraLetra;
