import React, { useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const cliqueSom = new Audio("/sons/somClique.mp3");

const toUpper = (value) => {
  if (value == null) return "";
  return String(value).toUpperCase();
};

const CompletarAlfabeto = ({ exercicio, onVerificar }) => {
  const [selecionadas, setSelecionadas] = useState({});

  if (!exercicio) return null;

  const alfabeto = [...(exercicio.posicoes || [])];
  const opcoes = [...(exercicio.opcoes || [])];

  const renderSlots = () => (
    <div className={styles.gridAlfabeto}>
      {alfabeto.map((l, i) => {
        const raw = selecionadas[i] ?? (l === "_" ? "?" : l);
        const display = raw === "?" ? "?" : toUpper(raw);
        return (
          <div
            key={i}
            className={`${styles.slotLetra} ${
              selecionadas[i] ? styles.slotSelecionado : ""
            }`}
          >
            {display}
          </div>
        );
      })}
    </div>
  );

  const renderOpcoes = () =>
    opcoes.map((letra, idx) => {
      const letraUpper = toUpper(letra);
      const jaUsada = Object.values(selecionadas).includes(letraUpper);
      return (
        <button
          key={idx}
          className={styles.btnLetra}
          disabled={jaUsada}
          onClick={() => {
            const slotIndex = alfabeto.findIndex(
              (l, position) => l === "_" && !selecionadas[position]
            );
            if (slotIndex >= 0) {
              setSelecionadas((prev) => ({ ...prev, [slotIndex]: letraUpper }));
            };
            cliqueSom.play();
          }}
        >
          {letraUpper}
        </button>
      );
    });

  const limpar = () => setSelecionadas({});

  const verificar = () => {
    const resposta = alfabeto
      .map((l, i) => (l === "_" ? selecionadas[i] ?? "?" : l))
      .map((char) => (char === "?" ? "?" : toUpper(char)))
      .join("");
    if (onVerificar) onVerificar(resposta);
    limpar();
  };

  return (
    <div className={styles.completarAlfabeto}>
      <h2>🅰️ Complete o Alfabeto!</h2>
      <p>Clique nas letras faltando para completar o alfabeto!</p>
      <TtsButton text={["Complete o alfabeto", "Clique nas letras faltando para completar o alfabeto"]} />

      {renderSlots()}
      <div className={styles.opcoesLetras}>{renderOpcoes()}</div>

      <div className={styles.botoesContainer}>
        <button onClick={limpar} className={`btn ${styles.btnLimpar}`}>
          Limpar
        </button>
        <button onClick={verificar} className={`btn ${styles.btnVerificar}`}>
          Responder ✓
        </button>
      </div>
    </div>
  );
};

export default CompletarAlfabeto;
