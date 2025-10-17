import React, { useEffect, useState } from "react";
import styles from "./ProgressoDados.module.css";

const ProgressoDados = () => {
  const [progresso, setProgresso] = useState({
    atividades_concluidas: 0,
    total_exercicios: 0,
    acertos: 0,
    taxa_acerto: 0,
    desempenho_por_tipo: {},
  });

  // --- Simulação temporária de dados (mock) ---
  useEffect(() => {
    // TODO: integrar com backend futuramente
    // Exemplo de endpoint: `${URL_API}/progresso/progresso_geral/${crianca.id}`
    const mockData = {
      atividades_concluidas: 8,
      total_exercicios: 20,
      acertos: 15,
      taxa_acerto: 75,
      desempenho_por_tipo: {
        leitura: { taxa_acerto: 80 },
        escrita: { taxa_acerto: 70 },
        matemática: { taxa_acerto: 65 },
      },
    };
    setProgresso(mockData);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.titulo}>📊 Progresso da Criança</h2>

        <div className={styles.row}>
          {/* Coluna estatísticas gerais */}
          <div className={styles.col}>
            <h4>📋 Estatísticas Gerais</h4>
            <div className={styles.statCard}>
              <p>Atividades concluídas</p>
              <h3>{progresso.atividades_concluidas}</h3>
            </div>
            <div className={styles.statCard}>
              <p>Total de Exercícios</p>
              <h3>{progresso.total_exercicios}</h3>
            </div>
            <div className={styles.statCard}>
              <p>Acertos</p>
              <h3>{progresso.acertos}</h3>
            </div>
            <div className={styles.statCard}>
              <p>Taxa de Acerto</p>
              <h3>{progresso.taxa_acerto}%</h3>
            </div>
          </div>

          {/* Coluna desempenho por tipo */}
          <div className={styles.col}>
            <h4>🎯 Desempenho por tipo</h4>
            <div className={styles.statCard}>
              {Object.keys(progresso.desempenho_por_tipo).length > 0 ? (
                Object.entries(progresso.desempenho_por_tipo).map(([tipo, dados]) => {
                  const taxa = dados.taxa_acerto ?? 0;
                  const nomeTipo =
                    tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, " ");

                  return (
                    <div key={tipo}>
                      <p>
                        <strong>{nomeTipo}</strong>
                      </p>
                      <div className={styles.progress}>
                        <div
                          className={styles.progressBar}
                          style={{ width: `${taxa}%` }}
                        >
                          {taxa.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Nenhum dado disponível.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgressoDados;
