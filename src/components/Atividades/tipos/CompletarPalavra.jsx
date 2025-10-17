import React, { useState } from "react";
import styles from "../Atividades.module.css";

const CompletarPalavra = ({ exercicio, onVerificar }) => {
  const [selecionadas, setSelecionadas] = useState({});

  if (!exercicio) return null;

  const palavra = [...exercicio.posicoes];
  const opcoes = palavra.includes("_") ? [...exercicio.palavra.split("")] : [];

  // Renderiza os slots da palavra
  const renderSlots = () => (
    <div className={styles.gridAlfabeto}>
      {palavra.map((l, i) => (
        <div
          key={i}
          className={`${styles.slotLetra} ${
            selecionadas[i] ? styles.slotSelecionado : ""
          }`}
        >
          {selecionadas[i] ?? (l === "_" ? "?" : l)}
        </div>
      ))}
    </div>
  );

  // Renderiza as opções de letras
  const renderOpcoes = () =>
    opcoes.map((letra, idx) => (
      <button
        key={idx}
        className={styles.btnLetra}
        disabled={Object.values(selecionadas).includes(letra)}
        onClick={() => {
          const slotIndex = palavra.findIndex((l, idx) => l === "_" && !selecionadas[idx]);
          if (slotIndex >= 0) {
            setSelecionadas((prev) => ({ ...prev, [slotIndex]: letra }));
          }
        }}
      >
        {letra}
      </button>
    ));

  const limpar = () => setSelecionadas({});

  const verificar = () => {
    const resposta = palavra
      .map((l, i) => (l === "_" ? selecionadas[i] ?? "?" : l))
      .join("");
    if (onVerificar) onVerificar(resposta);
    limpar();
  };

  return (
    <div className={styles.completarAlfabeto}>
      <h2>✏️ Complete a Palavra!</h2>
      <p>Clique nas letras faltando para completar a palavra!</p>

      {renderSlots()}
      <div className={styles.opcoesLetras}>{renderOpcoes()}</div>

      <div className={styles.botoesContainer}>
        <button onClick={limpar} className={`btn ${styles.btnLimpar}`}>
          Limpar tudo
        </button>
        <button onClick={verificar} className={`btn ${styles.btnVerificar}`}>
          Verificar resposta
        </button>
      </div>
    </div>
  );
};

export default CompletarPalavra;
