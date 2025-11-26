import React, { useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const cliqueSom = new Audio("/sons/somClique.mp3");

const toUpper = (value) => {
  if (value == null) return "";
  return String(value).toUpperCase();
};

const CompletarPalavra = ({ exercicio, onVerificar }) => {
  // selecionadas: mapa slotIndex -> letraUpper escolhida
  const [selecionadas, setSelecionadas] = useState({});
  // usedOptionIndices: lista de indices das opcoes (instancias) que ja foram usadas/consumidas
  const [usedOptionIndices, setUsedOptionIndices] = useState([]);

  if (!exercicio) return null;

  // 'palavra' = posicoes (ex: ["a","_","c","_"])
  const palavra = [...(exercicio.posicoes || [])];

  // 'opcoes' = letras da palavra completa (mantem duplicatas e ordem)
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

      const isUsed = usedOptionIndices.includes(idx); // essa instancia ja foi usada?

      return (
        <button
          key={idx}
          className={styles.btnLetra}
          disabled={isUsed}
          onClick={() => {
            if (isUsed) return;
            // encontra o primeiro slot "_" que ainda nao foi preenchido
            const slotIndex = palavra.findIndex(
              (l, position) => l === "_" && !selecionadas[position]
            );
            if (slotIndex >= 0) {
              setSelecionadas((prev) => ({ ...prev, [slotIndex]: letraUpper }));
              setUsedOptionIndices((prev) => [...prev, idx]); // consome essa instancia
            };
            cliqueSom.play();
          }}
        >
          {letraUpper}
        </button>
      );
    });

  const limpar = () => {
    setSelecionadas({});
    setUsedOptionIndices([]);
  };

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
          Responder ✓
        </button>
      </div>
    </div>
  );
};

export default CompletarPalavra;
