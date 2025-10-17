import React, { useState } from "react";
import styles from "../Atividades.module.css";

const CorrigirOrdemAlfabeto = ({ exercicio, onVerificar }) => {
  const [letras, setLetras] = useState([...exercicio.posicoes]);
  const [selecionada, setSelecionada] = useState(null);

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
    setLetras([...exercicio.posicoes]);
  };

  const verificar = () => {
    if (onVerificar) onVerificar(letras.join(""));
  };

  return (
    <div className={styles.corrigirOrdem}>
      <h2>🔁 Corrija a ordem do alfabeto!</h2>
      <p>Troque as letras de posição até o alfabeto ficar correto</p>

      <div className={styles.gridAlfabeto}>
        {letras.map((letra, i) => (
          <button
            key={i}
            className={`${styles.btnCircular} ${
              selecionada === i ? styles.selecionado : ""
            }`}
            onClick={() => trocar(i)}
          >
            {letra}
          </button>
        ))}
      </div>

      <div className={styles.botoesContainer}>
        <button onClick={verificar} className={`btn ${styles.btnVerificar}`}>
          Verificar
        </button>
        <button onClick={reset} className={`btn ${styles.btnLimpar}`}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default CorrigirOrdemAlfabeto;
