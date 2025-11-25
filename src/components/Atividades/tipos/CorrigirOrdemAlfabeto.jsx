import React, { useEffect, useMemo, useState } from "react";
import styles from "../Atividades.module.css";
import TtsButton from "../TtsButton";

const toUpper = (value) => {
  if (value == null) return "";
  return String(value).toUpperCase();
};

const CorrigirOrdemAlfabeto = ({ exercicio, onVerificar }) => {
  const letrasOriginais = useMemo(
    () => (exercicio?.posicoes || []).map(toUpper),
    [exercicio]
  );
  const [letras, setLetras] = useState(letrasOriginais);
  const [selecionada, setSelecionada] = useState(null);

  useEffect(() => {
    setLetras(letrasOriginais);
    setSelecionada(null);
  }, [letrasOriginais]);

  const trocar = (index) => {
    if (selecionada === null) {
      setSelecionada(index);
    } else if (selecionada === index) {
      setSelecionada(null);
    } else {
      const nova = [...letras];
      [nova[selecionada], nova[index]] = [nova[index], nova[selecionada]];
      setLetras(nova);
      setSelecionada(null);
    }
  };

  const reset = () => {
    setSelecionada(null);
    setLetras(letrasOriginais);
  };

  const verificar = () => {
    if (onVerificar) onVerificar(letras.map(toUpper).join(""));
  };

  return (
    <div className={styles.corrigirOrdem}>
      <h2>🔁 Corrija a ordem do alfabeto!</h2>
      <p>Troque as letras de posição até o alfabeto ficar correto.</p>
      <TtsButton text={["Corrija a ordem do alfabeto", "Troque as letras de posição até o alfabeto ficar correto"]} />

      <div className={styles.gridAlfabeto}>
        {letras.map((letra, i) => (
          <button
            key={i}
            className={`${styles.btnCircular} ${
              selecionada === i ? styles.selecionado : ""
            }`}
            onClick={() => trocar(i)}
          >
            {toUpper(letra)}
          </button>
        ))}
      </div>

      <div className={styles.botoesContainer}>
        <button onClick={reset} className={`btn ${styles.btnLimpar}`}>
          Limpar
        </button>
        <button onClick={verificar} className={`btn ${styles.btnVerificar}`}>
          ✓
        </button>
      </div>
    </div>
  );
};

export default CorrigirOrdemAlfabeto;
