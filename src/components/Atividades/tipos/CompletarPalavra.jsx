import React, { useState } from "react";
import styles from "../Atividades.module.css";

const CompletarPalavra = ({ exercicio, verificarResposta }) => {
  const palavra = [...exercicio.posicoes];
  const [selecionadas, setSelecionadas] = useState({});

  const renderSlots = () =>
    palavra.map((l, i) => (
      <div
        key={i}
        className={`${styles.slotLetra} ${selecionadas[i] ? styles.slotSelecionado : ""}`}
      >
        {selecionadas[i] ?? (l === "_" ? "?" : l)}
      </div>
    ));

  const handleTecla = letra => {
    const idx = palavra.findIndex((l, i) => l === "_" && !selecionadas[i]);
    if (idx >= 0) setSelecionadas(prev => ({ ...prev, [idx]: letra }));
  };

  const limpar = () => setSelecionadas({});

  return (
    <div className={styles.completarPalavra}>
      <p className={styles.descricao}>Complete a palavra com as letras que faltam:</p>
      <h3 className={styles.palavraReferencia}>{exercicio.palavra}</h3>

      <div className={styles.slotsContainer}>{renderSlots()}</div>

      <div className={styles.teclado}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letra, idx) => (
          <button key={idx} onClick={() => handleTecla(letra)} className={styles.btnLetra}>
            {letra}
          </button>
        ))}
      </div>

      <div className={styles.botoesContainer}>
        <button onClick={limpar} className={`btn ${styles.btnLimpar}`}>
          Limpar
        </button>
        <button
          onClick={() => {
            verificarResposta();
            limpar();
          }}
          className={`btn ${styles.btnVerificar}`}
        >
          Verificar Resposta
        </button>
      </div>
    </div>
  );
};

export default CompletarPalavra;
