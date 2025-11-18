import React, { useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const toUpper = (value) => {
  if (value == null) return "";
  return String(value).toUpperCase();
};

const CompletarPalavra = ({ exercicio, onVerificar }) => {
  const [selecionadas, setSelecionadas] = useState({});

  if (!exercicio) return null;

  const palavra = [...(exercicio.posicoes || [])];
  const opcoes = palavra.includes("_")
    ? [...((exercicio.palavra || "").split(""))]
    : [];

  const renderSlots = () => (
    <div className={styles.gridAlfabeto}>
      {palavra.map((l, i) => {
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
      const jaSelecionada = Object.values(selecionadas).includes(letraUpper);
      return (
        <button
          key={idx}
          className={styles.btnLetra}
          disabled={jaSelecionada}
          onClick={() => {
            const slotIndex = palavra.findIndex(
              (l, position) => l === "_" && !selecionadas[position]
            );
            if (slotIndex >= 0) {
              setSelecionadas((prev) => ({ ...prev, [slotIndex]: letraUpper }));
            }
          }}
        >
          {letraUpper}
        </button>
      );
    });

  const limpar = () => setSelecionadas({});

  const verificar = () => {
    const resposta = palavra
      .map((l, i) => (l === "_" ? selecionadas[i] ?? "?" : l))
      .map((char) => (char === "?" ? "?" : toUpper(char)))
      .join("");
    if (onVerificar) onVerificar(resposta);
    limpar();
  };

  return (
    <div className={styles.completarAlfabeto}>
      <h2>✏️ Complete a Palavra!</h2>
      <p>Clique nas letras faltando para completar a palavra!</p>
      <TtsButton text={["Complete a palavra", "Clique nas letras faltando para completar a palavra"]} />

      {renderSlots()}
      <div className={styles.opcoesLetras}>{renderOpcoes()}</div>

      <div className={styles.botoesContainer}>
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

export default CompletarPalavra;
