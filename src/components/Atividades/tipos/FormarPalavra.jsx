import React, { useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const toUpper = (value) => {
  if (value == null) return "";
  return String(value).toUpperCase();
};

const FormarPalavra = ({ exercicio, onVerificar }) => {
  const letras = (exercicio?.opcoes || []).map(toUpper);
  const palavraCorreta = toUpper(exercicio?.resposta_correta || "");
  const [resposta, setResposta] = useState("");

  const totalPorLetra = letras.reduce((acc, l) => {
    acc[l] = (acc[l] || 0) + 1;
    return acc;
  }, {});

  const usadosPorLetra = resposta.split("").reduce((acc, l) => {
    acc[l] = (acc[l] || 0) + 1;
    return acc;
  }, {});

  const handleLetra = (letra) => {
    const letraUpper = toUpper(letra);
    if (resposta.length < palavraCorreta.length) {
      setResposta((prev) => prev + letraUpper);
    }
  };

  const apagar = () => setResposta((prev) => prev.slice(0, -1));
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
      <TtsButton text={["Forme a palavra usando as letras abaixo", `A palavra correta tem ${palavraCorreta.length} letras`]} />

      <input
        type="text"
        readOnly
        value={resposta}
        className={styles.inputExercicio}
      />

      <div className={styles.teclado}>
        {letras.map((letra, i) => (
          <button
            key={`${letra}-${i}`}
            className={styles.btnLetra}
            disabled={(usadosPorLetra[letra] || 0) >= (totalPorLetra[letra] || 0)}
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
