import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import Alert from "../components/Alert/Alert";
import { getDashboardRoute, getUser, logout } from "../services/auth";
import { buscarTurma, listarCriancasDaTurma } from "../services/turmas";
import { getProgressoTurma, getDiagnostico, getDiagnosticoLLM } from "../services/progresso";
import styles from "../components/ProgressoDados/ProgressoDados.module.css";

const defaultStats = {
  atividades_concluidas: 0,
  total_exercicios: 0,
  acertos: 0,
  taxa_acerto: 0,
};

export default function Turma() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmarSair, setConfirmarSair] = useState(false);
  const [turma, setTurma] = useState(null);
  const [criancas, setCriancas] = useState([]);
  const [statsPorCrianca, setStatsPorCrianca] = useState({});
  const [resumoTurma, setResumoTurma] = useState(null);
  const [resumoErro, setResumoErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [diagModal, setDiagModal] = useState({
    aberta: false,
    tipo: "heuristico",
    loading: false,
    erro: "",
    dados: null,
    crianca: null,
  });

  const validarAcesso = useCallback(() => {
    const atual = getUser();
    if (!atual?.id) {
      navigate("/login");
      return false;
    }
    if (atual?.tipo && atual.tipo !== "professor") {
      navigate(getDashboardRoute(atual.tipo));
      return false;
    }
    return true;
  }, [navigate]);

  const carregarDados = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setErro("");
    setResumoErro("");
    try {
      const [turmaData, criancasData] = await Promise.all([
        buscarTurma(id),
        listarCriancasDaTurma(id).catch(() => []),
      ]);
      setTurma(turmaData);
      setCriancas(Array.isArray(criancasData) ? criancasData : []);
    } catch (e) {
      const d = e?.response?.data;
      setErro(d?.detail || d?.mensagem || "Não foi possível carregar os dados da turma.");
    } finally {
      setLoading(false);
    }

    try {
      const progresso = await getProgressoTurma(id);
      if (progresso) {
        setResumoTurma(progresso.resumo);
        const mapa = {};
        (progresso.criancas || []).forEach((item) => {
          mapa[item.crianca_id] = {
            atividades_concluidas: item.atividades_concluidas,
            total_exercicios: item.total_exercicios,
            acertos: item.acertos,
            taxa_acerto: item.taxa_acerto,
          };
        });
        setStatsPorCrianca(mapa);
      } else {
        setResumoTurma(null);
        setStatsPorCrianca({});
      }
    } catch (e) {
      const d = e?.response?.data;
      setResumoErro(d?.detail || d?.mensagem || "Sem dados de progresso para esta turma.");
      setResumoTurma(null);
      setStatsPorCrianca({});
    }
  }, [id]);

  useEffect(() => {
    if (validarAcesso()) {
      carregarDados();
    }
  }, [validarAcesso, carregarDados]);

  const links = useMemo(() => ([
    { label: "Suas turmas", to: "/escolherturma" },
    { label: "Sair", onClick: () => setConfirmarSair(true) },
  ]), []);

  const abrirDiagnostico = (crianca, tipo) => {
    if (!crianca?.id && !crianca?.crianca_id) return;
    const idCrianca = crianca.id || crianca.crianca_id;
    setDiagModal({
      aberta: true,
      tipo,
      loading: true,
      erro: "",
      dados: null,
      crianca,
    });
    const fetcher = tipo === "llm" ? getDiagnosticoLLM : getDiagnostico;
    fetcher(idCrianca)
      .then((dados) => {
        setDiagModal((prev) => ({ ...prev, dados, loading: false }));
      })
      .catch((e) => {
        const d = e?.response?.data;
        setDiagModal((prev) => ({
          ...prev,
          loading: false,
          erro: d?.detail || d?.mensagem || "Não foi possível gerar o diagnóstico.",
        }));
      });
  };

  const fecharDiagnostico = () => {
    setDiagModal({
      aberta: false,
      tipo: "heuristico",
      loading: false,
      erro: "",
      dados: null,
      crianca: null,
    });
  };

  const renderResumo = () => {
    if (resumoTurma) {
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {[
            { label: "Atividades concluídas", value: resumoTurma.atividades_concluidas },
            { label: "Total de exercícios", value: resumoTurma.total_exercicios },
            { label: "Acertos", value: resumoTurma.acertos },
            { label: "Taxa média", value: `${resumoTurma.taxa_acerto_media || 0}%` },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                flex: "1 1 200px",
                background: "#fdf1ff",
                padding: 16,
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ margin: 0, color: "#8E24AA", fontWeight: 600 }}>{item.label}</p>
              <span style={{ fontSize: 22, fontWeight: 700 }}>{item.value}</span>
            </div>
          ))}
        </div>
      );
    }
    if (resumoErro) {
      return <Alert type="info">{resumoErro}</Alert>;
    }
    return null;
  };

  const renderDiagModal = () => (
    <Modal
      title={
        diagModal.tipo === "llm"
          ? "Diagnóstico com IA"
          : "Diagnóstico heurístico"
      }
      primaryText="Fechar"
      onPrimary={fecharDiagnostico}
      onClose={fecharDiagnostico}
    >
      {diagModal.crianca && (
        <p style={{ fontWeight: 600, marginBottom: 12 }}>
          {diagModal.crianca.nome || diagModal.crianca?.crianca_nome || "Criança"}
        </p>
      )}
      {diagModal.loading && <p>Gerando diagnóstico...</p>}
      {!diagModal.loading && diagModal.erro && (
        <p style={{ color: "#d32f2f" }}>{diagModal.erro}</p>
      )}
      {!diagModal.loading && !diagModal.erro && diagModal.dados && (
        <>
          {diagModal.tipo === "llm" ? (
            <div style={{ textAlign: "left", whiteSpace: "pre-line" }}>
              <p style={{ color: "#444" }}>{diagModal.dados.resumo_llm || "Sem conteúdo retornado."}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              <p style={{ margin: 0, color: "#555" }}>
                Taxa: {diagModal.dados.taxa_acerto}% · Exercícios: {diagModal.dados.total_exercicios}
              </p>
              <div style={{ display: "grid", gap: 12 }}>
                {(diagModal.dados.mensagem_blocos || []).map((bloco, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#fff",
                      borderRadius: 10,
                      padding: 12,
                      border: "1px solid #f5d9ff",
                    }}
                  >
                    <h4 style={{ margin: "0 0 6px", color: "#8E24AA" }}>{bloco.titulo}</h4>
                    {(bloco.linhas || []).map((linha, i) => (
                      <p key={i} style={{ margin: 0, color: "#555" }}>{linha}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );

  return (
    <div>
      <Header links={links} />
      <main style={{ maxWidth: 1100, margin: "30px auto 60px", padding: "0 24px" }}>

        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>

        <button
          onClick={() => navigate("/escolherturma")}
          style={{
            background: "transparent",
            border: "none",
            color: "#8E24AA",
            cursor: "pointer",
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          ← Voltar para turmas
        </button>

        {loading ? (
          <p>Carregando informações da turma...</p>
        ) : erro ? (
          <Alert type="error">{erro}</Alert>
        ) : (
          <>
            <section style={{ marginBottom: 24 }}>
              <h2 style={{ color: "#8E24AA", marginBottom: 8 }}>{turma?.nome || "Turma"}</h2>
              <p style={{ margin: "4px 0", color: "#555" }}>
                {turma?.descricao || turma?.serie || turma?.nivel || "Sem descrição"}
              </p>
              {turma?.turno && <p style={{ margin: "4px 0", color: "#555" }}>Turno: {turma.turno}</p>}
            </section>

            <section style={{ marginBottom: 32 }}>
              <h3 style={{ marginBottom: 12 }}>Resumo da turma</h3>
              {renderResumo()}
            </section>

            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <h3 style={{ margin: 0 }}>Crianças</h3>
                <span style={{ color: "#777" }}>{criancas.length} criança(s)</span>
              </div>
              {criancas.length === 0 ? (
                <Alert type="info">Nenhuma criança vinculada a esta turma ainda.</Alert>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                    <thead>
                      <tr style={{ textAlign: "left", color: "#777", fontSize: 14 }}>
                        <th style={{ padding: "8px 4px" }}>Nome</th>
                        <th style={{ padding: "8px 4px" }}>Atividades</th>
                        <th style={{ padding: "8px 4px" }}>Exercícios</th>
                        <th style={{ padding: "8px 4px" }}>Acertos</th>
                        <th style={{ padding: "8px 4px" }}>Taxa</th>
                        <th style={{ padding: "8px 4px" }}>Diagnóstico</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criancas.map((crianca) => {
                        const stats = statsPorCrianca[crianca.id] || defaultStats;
                        return (
                          <tr key={crianca.id} style={{ borderTop: "1px solid #eee" }}>
                            <td style={{ padding: "10px 4px" }}>{crianca.nome}</td>
                            <td style={{ padding: "10px 4px" }}>{stats.atividades_concluidas}</td>
                            <td style={{ padding: "10px 4px" }}>{stats.total_exercicios}</td>
                            <td style={{ padding: "10px 4px" }}>{stats.acertos}</td>
                            <td style={{ padding: "10px 4px" }}>{stats.taxa_acerto}%</td>
                            <td style={{ padding: "10px 4px" }}>
                              <button
                                onClick={() => abrirDiagnostico(crianca, "heuristico")}
                                style={{
                                  border: "none",
                                  background: "#8E24AA",
                                  color: "#fff",
                                  borderRadius: 8,
                                  padding: "6px 10px",
                                  cursor: "pointer",
                                  marginRight: 6,
                                }}
                              >
                                Heurístico
                              </button>
                              <button
                                onClick={() => abrirDiagnostico(crianca, "llm")}
                                style={{
                                  border: "none",
                                  background: "#E91E63",
                                  color: "#fff",
                                  borderRadius: 8,
                                  padding: "6px 10px",
                                  cursor: "pointer",
                                }}
                              >
                                IA
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {diagModal.aberta && renderDiagModal()}

      {confirmarSair && (
        <Modal
          title="Sair da conta?"
          primaryText="Sair"
          onPrimary={() => { setConfirmarSair(false); logout(); navigate("/login"); }}
          onClose={() => setConfirmarSair(false)}
        >
          <p>Tem certeza que deseja sair?</p>
        </Modal>
      )}
    </div>
  );
}
