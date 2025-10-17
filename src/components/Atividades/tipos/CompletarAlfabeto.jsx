import React, { useState } from "react";
import styles from "../Atividades.module.css";

const CompletarAlfabeto = ({ exercicio, onVerificar }) => {
  const [selecionadas, setSelecionadas] = useState({});

  if (!exercicio) return null; // evita erro se exercicio ainda não carregou

  const alfabeto = [...exercicio.posicoes];
  const opcoes = [...exercicio.opcoes];

  const renderSlots = () => (
    <div className={styles.gridAlfabeto}>
      {alfabeto.map((l, i) => (
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

  const renderOpcoes = () =>
    opcoes.map((letra, idx) => (
      <button
        key={idx}
        className={styles.btnLetra}
        disabled={Object.values(selecionadas).includes(letra)}
        onClick={() => {
          const slotIndex = alfabeto.findIndex(
            (l, idx) => l === "_" && !selecionadas[idx]
          );
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
    const resposta = alfabeto
      .map((l, i) => (l === "_" ? selecionadas[i] ?? "?" : l))
      .join("");
    if (onVerificar) onVerificar(resposta);
    limpar();
  };

  return (
    <div className={styles.completarAlfabeto}>
      <h2>🅰️ Complete o Alfabeto!</h2>
      <p>Clique nas letras faltando para completar o alfabeto!</p>

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

export default CompletarAlfabeto;
