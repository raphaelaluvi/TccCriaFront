import React, { useEffect, useState } from "react";

// Importa os tipos de atividades
import CompletarAlfabeto from "./tipos/CompletarAlfabeto";
import CompletarPalavra from "./tipos/CompletarPalavra";
import CorrigirOrdemAlfabeto from "./tipos/CorrigirOrdemAlfabeto";
import DigitarPalavra from "./tipos/DigitarPalavra";
import FormarPalavra from "./tipos/FormarPalavra";

import styles from "./Atividades.module.css";

const AtividadeController = () => {
  const [etapa, setEtapa] = useState("inicio"); // inicio | exercicio | fim
  const [exercicios, setExercicios] = useState([]);
  const [indice, setIndice] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Simula o carregamento dos exercícios (depois pode vir da API)
  useEffect(() => {
    setExercicios([
      {
        id: "e1",
        tipo: "completar_alfabeto",
        posicoes: ["A", "B", "_", "D", "E"],
        opcoes: ["C", "F", "G"],
        resposta_correta: "ABCDE",
      },
      {
        id: "e2",
        tipo: "completar_palavra",
        palavra: "CASA",
        posicoes: ["C", "_", "S", "A"],
        resposta_correta: "CASA",
      },
      {
        id: "e3",
        tipo: "corrigir_ordem_alfabeto",
        posicoes: ["A", "C", "B", "D", "E"],
        resposta_correta: "ABCDE",
      },
      {
        id: "e4",
        tipo: "digitar_palavra",
        palavra: "BOLA",
        resposta_correta: "BOLA",
      },
      {
        id: "e5",
        tipo: "formar_palavra",
        resposta_correta: "MESA",
        opcoes: ["S", "E", "A", "M"],
      },
    ]);
  }, []);

  // Inicia o jogo
  const iniciar = () => {
    setEtapa("exercicio");
    setIndice(0);
    setFeedback("");
  };

  // Avança para o próximo exercício
  const proximo = () => {
    if (indice + 1 < exercicios.length) {
      setIndice(indice + 1);
      setFeedback("");
    } else {
      setEtapa("fim");
    }
  };

  // Verifica a resposta
  const verificarResposta = (resposta) => {
    const ex = exercicios[indice];
    let correta = false;

    if (ex.tipo === "completar_alfabeto") {
      correta = resposta === ex.resposta_correta;
    }
    if (ex.tipo === "completar_palavra") {
      correta = resposta === ex.resposta_correta;
    }
    if (ex.tipo === "corrigir_ordem_alfabeto") {
      correta = resposta === ex.resposta_correta;
    }
    if (ex.tipo === "digitar_palavra") {
      correta = resposta === ex.resposta_correta;
    }
    if (ex.tipo === "formar_palavra") {
      correta = resposta === ex.resposta_correta;
    }

    setFeedback(correta ? "✅ Resposta correta!" : "❌ Tente novamente!");

    if (correta) setTimeout(proximo, 900);
  };

  // Escolhe qual componente renderizar conforme o tipo
  const renderExercicio = () => {
    const ex = exercicios[indice];
    const props = { exercicio: ex, onVerificar: verificarResposta };

    switch (ex.tipo) {
      case "completar_alfabeto":
        return <CompletarAlfabeto {...props} />;
      case "completar_palavra":
        return <CompletarPalavra {...props} />;
      case "corrigir_ordem_alfabeto":
        return <CorrigirOrdemAlfabeto {...props} />;
      case "digitar_palavra":
        return <DigitarPalavra {...props} />;
      case "formar_palavra":
        return <FormarPalavra {...props} />;
      default:
        return <p>Tipo de atividade não encontrado.</p>;
    }
  };

  // Renderização principal
  return (
    <div className={styles.container}>
      {etapa === "inicio" && (
        <>
          <h2 className={styles.titulo}>🎮 Jogo de Atividades</h2>
          <p className={styles.sub}>Clique no botão abaixo para começar!</p>
          <button className={styles.btn} onClick={iniciar}>
            Iniciar
          </button>
        </>
      )}

      {etapa === "exercicio" && (
        <>
          {renderExercicio()}
          <p className={styles.feedback}>{feedback}</p>
        </>
      )}

      {etapa === "fim" && (
        <>
          <h3 className={styles.titulo}>🎉 Parabéns! Você concluiu todas!</h3>
          <button className={styles.btn} onClick={() => setEtapa("inicio")}>
            Jogar novamente
          </button>
        </>
      )}
    </div>
  );
};

export default AtividadeController;
