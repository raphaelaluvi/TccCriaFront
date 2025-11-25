import React, { useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const toUpper = (value) => (value == null ? "" : String(value).toUpperCase());

const FormarPalavra = ({ exercicio, onVerificar }) => {
  const opcoes = (exercicio?.opcoes || []).map(toUpper);
  const palavraCorreta = toUpper(exercicio?.resposta_correta || "");

  // Agora resposta é um array de instâncias:
  // [{ idx: number, letra: string }]
  const [resposta, setResposta] = useState([]);

  const handleLetra = (idx, letra) => {
    if (resposta.length < palavraCorreta.length) {
      setResposta((prev) => [...prev, { idx, letra }]);
    }
  };

  const apagar = () => {
    setResposta((prev) => prev.slice(0, -1));
  };

  const limpar = () => setResposta([]);

  const verificar = () => {
    const respostaString = resposta.map((r) => r.letra).join("");
    if (onVerificar) onVerificar(respostaString);
    limpar();
  };

  const respostaString = resposta.map((r) => r.letra).join("");

  return (
    <div className={styles.formarPalavra}>
      <p className={styles.descricao}>
        Forme a palavra usando as letras abaixo:
      </p>

      <h3 className={styles.palavraReferencia}>{palavraCorreta}</h3>

      <TtsButton
        text={[
          "Forme a palavra usando as letras abaixo",
          `A palavra correta tem ${palavraCorreta.length} letras`,
        ]}
      />

      <input
        type="text"
        readOnly
        value={respostaString}
        className={styles.inputExercicio}
      />

      <div className={styles.teclado}>
        {opcoes.map((letra, idx) => {
          const instanciaUsada = resposta.some((r) => r.idx === idx);
          return (
            <button
              key={idx}
              className={styles.btnLetra}
              disabled={instanciaUsada}
              onClick={() => handleLetra(idx, letra)}
            >
              {letra}
            </button>
          );
        })}
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
