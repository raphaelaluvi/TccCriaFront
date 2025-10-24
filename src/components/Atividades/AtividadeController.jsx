import React, { useEffect, useState } from "react";
import { responderExercicio } from "../../services/exercicios";
import { concluirAtividade, refazerAtividade, listarExerciciosDaAtividade } from "../../services/atividades";

// Importa os tipos de atividades
import CompletarAlfabeto from "./tipos/CompletarAlfabeto";
import CompletarPalavra from "./tipos/CompletarPalavra";
import CorrigirOrdemAlfabeto from "./tipos/CorrigirOrdemAlfabeto";
import DigitarPalavra from "./tipos/DigitarPalavra";
import FormarPalavra from "./tipos/FormarPalavra";
import PrimeiraLetra from "./tipos/PrimeiraLetra";
import UltimaLetra from "./tipos/UltimaLetra";
import QuantidadeLetras from "./tipos/QuantidadeLetras";

import styles from "./Atividades.module.css";

const AtividadeController = ({ atividadeId, exerciciosIniciais = [], onConcluir }) => {
  const [etapa, setEtapa] = useState("inicio"); // inicio | exercicio | fim
  const [exercicios, setExercicios] = useState(exerciciosIniciais);
  const [indice, setIndice] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [finalInfo, setFinalInfo] = useState(null);

  useEffect(() => {
    setExercicios(exerciciosIniciais);
  }, [exerciciosIniciais]);

  // Inicia o jogo
  const iniciar = () => {
    if (!exercicios || exercicios.length === 0) {
      setFeedback('Nenhum exercício disponível.');
      return;
    }
    setEtapa("exercicio");
    setIndice(0);
    setFeedback("");
  };

  // Avança para o próximo exercício
  const proximo = () => {
    if (indice + 1 < (exercicios?.length || 0)) {
      setIndice((prev) => prev + 1);
      setFeedback("");
    } else {
      setEtapa("fim");
    }
  };

  // Verifica a resposta
  const verificarResposta = async (resposta) => {
    if (enviando) return;
    const ex = exercicios?.[indice];
    if (!ex) {
      // Estado intermediário: evita erro de acesso indefinido
      setFeedback('Carregando exercício...');
      return;
    }
    try {
      setEnviando(true);
      const r = await responderExercicio(ex.id, resposta);
      const correta = !!r?.correta;
      const restantes = Math.max(0, r?.tentativas_restantes ?? 0);
      setFeedback(correta ? "✅ Resposta correta!" : `❌ Tente novamente! (${restantes} tentativas restantes)`);
      if (correta || restantes === 0) setTimeout(proximo, 900);
    } catch (e) {
      setFeedback('Erro ao enviar resposta');
    } finally {
      setEnviando(false);
    }
  };

  // Escolhe qual componente renderizar conforme o tipo
  const renderExercicio = () => {
    const ex = exercicios?.[indice];
    if (!ex) return <p>Carregando exercício...</p>;
    const props = { exercicio: ex, onVerificar: verificarResposta };

    switch (ex.tipo) {
      case "completar_alfabeto":
        return <CompletarAlfabeto {...props} />;
      case "completar_palavra":
        return <CompletarPalavra {...props} />;
      case "completar_letras":
        return <CompletarPalavra {...props} />;
      case "corrigir_ordem_alfabeto":
        return <CorrigirOrdemAlfabeto {...props} />;
      case "digitar_palavra":
        return <DigitarPalavra {...props} />;
      case "formar_palavra":
        return <FormarPalavra {...props} />;
      case "primeira_letra":
        return <PrimeiraLetra {...props} />;
      case "ultima_letra":
        return <UltimaLetra {...props} />;
      case "quantidade_letras":
        return <QuantidadeLetras {...props} />;
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
  <div className={styles.fimContainer}>
    <h3 className={styles.titulo}>🎉 Parabéns! Você concluiu todas!</h3>

    {finalInfo && (
      <p className={styles.sub}>Taxa de acerto: {finalInfo.taxa_acerto}%</p>
    )}

    {atividadeId && (
      <div className={styles.botoesFim}>
        <button
          className={styles.btn}
          onClick={async () => {
            try {
              const r = await concluirAtividade(atividadeId);
              setFinalInfo(r);
              if (onConcluir) onConcluir();
            } catch {}
          }}
        >
          Concluir atividade
        </button>

        <button
          className={styles.btn}
          onClick={async () => {
            try {
              await refazerAtividade(atividadeId);
              const data = await listarExerciciosDaAtividade(atividadeId);
              setExercicios(data.exercicios || []);
              setIndice(0);
              setFeedback("");
              setFinalInfo(null);
              setEtapa("exercicio");
            } catch {
              setFeedback("Erro ao refazer atividade");
            }
          }}
        >
          Refazer
        </button>
      </div>
    )}

    {!atividadeId && onConcluir && (
      <button className={styles.btn} onClick={onConcluir}>
        Voltar à trilha
      </button>
    )}

    <button className={styles.btn} onClick={() => setEtapa("inicio")}>
      Jogar novamente
    </button>
  </div>
)}
    </div>
  );
};

export default AtividadeController;
