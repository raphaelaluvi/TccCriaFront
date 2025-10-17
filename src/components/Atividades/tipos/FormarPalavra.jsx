import React, { useState } from "react";
import styles from "../Atividades.module.css";

const FormarPalavra = ({ exercicio, onVerificar }) => {
  const [resposta, setResposta] = useState("");
  const letras = [...exercicio.opcoes];
  const palavraCorreta = exercicio.resposta_correta;

  const handleLetra = (letra) => {
    if (resposta.length < palavraCorreta.length) {
      setResposta((prev) => prev + letra);
    }
  };

  const apagar = () => setResposta(resposta.slice(0, -1));
  const limpar = () => setResposta("");

  const verificar = () => {
    if (onVerificar) onVerificar(resposta);
    limpar();
  };

  return (
    <div className={styles.formarPalavra}>
      <p className={styles.descricao}>
        Forme a palavra usando as letras abaixo:
      </p>
      <h3 className={styles.palavraReferencia}>{palavraCorreta}</h3>

      <input
        type="text"
        readOnly
        value={resposta}
        className={styles.inputExercicio}
      />

      <div className={styles.teclado}>
        {letras.map((letra, i) => (
          <button
            key={i}
            className={styles.btnLetra}
            onClick={() => handleLetra(letra)}
          >
            {letra}
          </button>
        ))}
      </div>

      <div className={styles.botoesContainer}>
        <button onClick={apagar} className={`btn ${styles.btnApagar}`}>
          ⌫
        </button>
        <button onClick={limpar} className={`btn ${styles.btnLimpar}`}>
          Limpar
        </button>
        <button onClick={verificar} className={`btn ${styles.btnVerificar}`}>
          Verificar
        </button>
      </div>
    </div>
  );
};

export default FormarPalavra;
