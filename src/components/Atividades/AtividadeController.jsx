import React, { useEffect, useRef, useState } from "react";
import { responderExercicio } from "../../services/exercicios";
import imgFases from "../../assets/imgFases.png";
import mascoteHappy from "../../assets/certo.png";
import mascoteSad from "../../assets/errado.png";

import {
  concluirAtividade,
  refazerAtividade,
  listarExerciciosDaAtividade,
} from "../../services/atividades";

import CompletarAlfabeto from "./tipos/CompletarAlfabeto";
import CompletarPalavra from "./tipos/CompletarPalavra";
import CorrigirOrdemAlfabeto from "./tipos/CorrigirOrdemAlfabeto";
import DigitarPalavra from "./tipos/DigitarPalavra";
import FormarPalavra from "./tipos/FormarPalavra";
import PrimeiraLetra from "./tipos/PrimeiraLetra";
import UltimaLetra from "./tipos/UltimaLetra";
import QuantidadeLetras from "./tipos/QuantidadeLetras";

import styles from "./Atividades.module.css";

const FEEDBACK_DURATION = 1500; // ms 

const tocarSom = (tipo) => {
  const audio = new Audio(
    tipo === "sucesso" ? "/sons/somAcerto.mp3" : "/sons/somErro.mp3"
  );
  audio.play();
};

const AtividadeController = ({
  atividadeId,
  exerciciosIniciais = [],
  onConcluir,
}) => {
  const [etapa, setEtapa] = useState("inicio"); // inicio | exercicio | fim
  const [exercicios, setExercicios] = useState(exerciciosIniciais);
  const [indice, setIndice] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [finalInfo, setFinalInfo] = useState(null);
  const [feedbackTentativas, setFeedbackTentativas] = useState(null);

  // NOVOS estados para feedback visual "mascote"
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false);
  const [feedbackTipo, setFeedbackTipo] = useState(null); // "sucesso" | "erro"
  const feedbackTimeoutRef = useRef(null);

  useEffect(() => {
    if (etapa === "fim") {
      const audio = new Audio("/sons/somConclusao.mp3");
      audio.play();
    }
  }, [etapa]);

  useEffect(() => {
    setExercicios(exerciciosIniciais);
  }, [exerciciosIniciais]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
    };
  }, []);

  const iniciar = () => {
    if (!exercicios || exercicios.length === 0) {
      setFeedback("Nenhum exercício disponível.");
      return;
    }
    setEtapa("exercicio");
    setIndice(0);
    setFeedback("");
  };

  const proximo = () => {
    if (indice + 1 < (exercicios?.length || 0)) {
      setIndice((prev) => prev + 1);
      setFeedback("");
    } else {
      setEtapa("fim");
    }
  };

  const mostrarFeedbackVisual = (tipo, duracao = FEEDBACK_DURATION) => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
    setMostrandoFeedback(true);
    setFeedbackTipo(tipo);

    feedbackTimeoutRef.current = setTimeout(() => {
      setMostrandoFeedback(false);
      setFeedbackTipo(null);
      feedbackTimeoutRef.current = null;
    }, duracao);
  };

  const verificarResposta = async (resposta) => {
    if (enviando || mostrandoFeedback) return;

    const ex = exercicios?.[indice];
    if (!ex) {
      setFeedback("Carregando exercício...");
      return;
    }

    const respostaNormalizada =
      typeof resposta === "string" ? resposta.toLowerCase() : resposta;

    try {
      setEnviando(true);
      const r = await responderExercicio(ex.id, respostaNormalizada);
      const correta = !!r?.correta;
      const restantes = Math.max(0, r?.tentativas_restantes ?? 0);

      setFeedbackTentativas(restantes);
      tocarSom(correta ? "sucesso" : "erro");

      setFeedback(
        correta
          ? "✅ Resposta correta!"
          : restantes > 0
            ? `❌ Tente novamente! (${restantes} tentativas restantes)`
            : "❌ Acabaram as tentativas!"
      );

      mostrarFeedbackVisual(correta ? "sucesso" : "erro", FEEDBACK_DURATION);

      if (correta || restantes === 0) {
        setTimeout(() => {
          proximo();
        }, FEEDBACK_DURATION);
      }
    } catch (e) {
      setFeedback("Erro ao enviar resposta");
    } finally {
      setEnviando(false);
    }
  };

  const renderExercicio = () => {
    const ex = exercicios?.[indice];
    if (!ex) return <p>Carregando exercício...</p>;
    const props = { exercicio: ex, onVerificar: verificarResposta };

    switch (ex.tipo) {
      case "completar_alfabeto":
        return <CompletarAlfabeto {...props} />;
      case "completar_palavra":
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

  return (
    <div className={styles.wrapper}>
      {/* CAMADA DE BOLHAS ANIMADAS */}
      <div className={styles.bolhaLayer}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`${styles.bolha} ${styles[`bolha${i+1}`]}`}></div>
        ))}
      </div>

      <div className={styles.container}>
        {etapa === "inicio" && (
          <>
            <h2 className={styles.titulo}>🎮 Vamos jogar e aprender!</h2>
            <img src={imgFases} alt="Mascote" />
            <p className={styles.sub}>Clique no botão abaixo para começar!</p>
            <button className={styles.btn} onClick={iniciar}>
              Iniciar
            </button>
          </>
        )}

        {etapa === "exercicio" && (
          <>
            {mostrandoFeedback ? (
              <div className={styles.feedbackMascote}>
                <img
                  src={feedbackTipo === "sucesso" ? mascoteHappy : mascoteSad}
                  alt={feedbackTipo === "sucesso" ? "Mascote feliz" : "Mascote triste"}
                  className={styles.imgFeedback}
                />
                <div className={styles.textoFeedback}>
                  {feedbackTipo === "sucesso" && "Muito bem! 👏"}
                  {feedbackTipo === "erro" && feedbackTentativas > 0 && "Quase lá — tente novamente 😊"}
                  {feedbackTipo === "erro" && feedbackTentativas === 0 && "Acabaram as tentativas 😢"}
                </div>
              </div>
            ) : (
              <>
                {renderExercicio()}
                <p className={styles.feedback}>{feedback}</p>
              </>
            )}
          </>
        )}

        {etapa === "fim" && (
          <div className={styles.fimContainer}>
            <h3 className={styles.titulo}>🎉 Parabéns! Você concluiu todos os exercícios!</h3>
            <img src={imgFases} alt="Mascote" />

            {finalInfo && (
              <p className={styles.sub}>
                Taxa de acerto: {finalInfo.taxa_acerto}%
              </p>
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
                    } catch {
                      setFeedback("Erro ao concluir atividade");
                    }
                  }}
                >
                  Finalizar atividade
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
              <button
                className={styles.btn}
                onClick={() => {
                  onConcluir();
                }}
              >
                Voltar à trilha
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AtividadeController;
