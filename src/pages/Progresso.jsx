import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import ProgressoDados from "../components/ProgressoDados/ProgressoDados";
import Alert from "../components/Alert/Alert";
import { getProgressoGeral, getDiagnostico } from "../services/progresso";
import styles from "../components/ProgressoDados/ProgressoDados.module.css";

const Progresso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmarSair, setConfirmarSair] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState(null);
  const [tab, setTab] = useState("geral");
  const [diagLoading, setDiagLoading] = useState(false);
  const [diagErro, setDiagErro] = useState("");
  const [diagDados, setDiagDados] = useState(null);

  const links = [
    { label: "Suas histórias", to: `/crianca/${id}` },
    { label: "Progresso", to: `/progresso/${id}` },
    { label: "Perfil", to: `/perfilcrianca/${id}` },
    { label: "Sair", onClick: () => setConfirmarSair(true) },
  ];

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const resp = await getProgressoGeral(id);
        if (!ativo) return;
        if (resp == null) {
          setDados({
            atividades_concluidas: 0,
            total_exercicios: 0,
            acertos: 0,
            taxa_acerto: 0,
            desempenho_por_tipo: {},
          });
          setErro("Nenhuma atividade concluída para essa criança.");
        } else {
          setDados(resp);
        }
      } catch (e) {
        const d = e?.response?.data;
        setErro(d?.detail || d?.mensagem || "Erro ao carregar progresso");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      ativo = false;
    };
  }, [id]);

  useEffect(() => {
    if (tab !== "diagnostico") return;
    let ativo = true;
    if (!diagDados) {
      setDiagLoading(true);
      setDiagErro("");
      (async () => {
        try {
          const resp = await getDiagnostico(id);
          if (!ativo) return;
          setDiagDados(resp);
        } catch (e) {
          const d = e?.response?.data;
          setDiagErro(d?.detail || d?.mensagem || "Sem diagnóstico disponível");
        } finally {
          setDiagLoading(false);
        }
      })();
    }
    return () => {
      ativo = false;
    };
  }, [tab, id]);

  return (
    <div>
      <Header links={links} />
      <div className={styles.container}>

        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>

        {/* TABS + título alinhado */}
        <div className={styles.headerRow}>
          <div className={styles.tabsBox}>
            <button
              onClick={() => setTab("geral")}
              className={`${styles.tabButton} ${tab === "geral" ? styles.active : ""
                }`}
            >
              Geral
            </button>

            <button
              onClick={() => setTab("diagnostico")}
              className={`${styles.tabButton} ${tab === "diagnostico" ? styles.active : ""
                }`}
            >
              Diagnóstico
            </button>
          </div>
        </div>

        {tab === "geral" && erro && <Alert type="info">{erro}</Alert>}
        {tab === "diagnostico" && diagErro && <Alert type="info">{diagErro}</Alert>}
        {tab === "diagnostico" && diagLoading && <p>Carregando...</p>}
      </div>

      {tab === "geral" && (
        <>
          {loading ? (
            <div className={styles.container}>
              <p>Carregando...</p>
            </div>
          ) : (
            <ProgressoDados data={dados} />
          )}
        </>
      )}

      {tab === "diagnostico" && !diagLoading && diagDados && (
        <div className={styles.container}>
          <h2 className={styles.pageTitle}>Diagnóstico</h2>
          <h4> <strong>
            Taxa geral: {diagDados.taxa_acerto}% · Exercícios: {diagDados.total_exercicios}
          </strong>
          </h4>
          <div className={styles.statsGridDiagnostico}>
            {Array.isArray(diagDados.mensagem_blocos) &&
              diagDados.mensagem_blocos.map((bloco, i) => (
                <div
                  key={i}
                  className={styles.statCardDiagnostico}
                >
                  <p> <strong>{bloco.titulo}</strong></p>
                  {(bloco.linhas || []).map((l, idx) => (
                    <p key={idx} style={{ margin: "6px 0", color: "#333" }}>
                      {l}
                    </p>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}

      {confirmarSair && (
        <Modal
          title="Sair do perfil da criança?"
          primaryText="Sair"
          onPrimary={() => {
            setConfirmarSair(false);
            navigate("/escolhercriancas");
          }}
          onClose={() => setConfirmarSair(false)}
        >
          <p>Você tem certeza que deseja sair?</p>
        </Modal>
      )}
    </div>
  );
};

export default Progresso;
