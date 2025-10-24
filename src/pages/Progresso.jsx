import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import ProgressoDados from "../components/ProgressoDados/ProgressoDados";
import Alert from "../components/Alert/Alert";
import { getProgressoGeral, getDiagnostico } from "../services/progresso";
import progStyles from "../components/ProgressoDados/ProgressoDados.module.css";

const Progresso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmarSair, setConfirmarSair] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState(null);
  const [tab, setTab] = useState('geral');
  const [diagLoading, setDiagLoading] = useState(false);
  const [diagErro, setDiagErro] = useState("");
  const [diagDados, setDiagDados] = useState(null);

  const links = [
    { label: 'Suas histórias', to: `/crianca/${id}` },
    { label: 'Progresso', to: `/progresso/${id}` },
    { label: 'Perfil', to: `/perfilcrianca/${id}` },
    { label: 'Sair', onClick: () => setConfirmarSair(true) }
  ];

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const resp = await getProgressoGeral(id);
        if (!ativo) return;
        if (resp == null) {
          setDados({ atividades_concluidas: 0, total_exercicios: 0, acertos: 0, taxa_acerto: 0, desempenho_por_tipo: {} });
          setErro("Nenhuma atividade concluída para essa criança.");
        } else {
          setDados(resp);
        }
      } catch (e) {
        const d = e?.response?.data;
        setErro(d?.detail || d?.mensagem || 'Erro ao carregar progresso');
      } finally {
        setLoading(false);
      }
    })();
    return () => { ativo = false; };
  }, [id]);

  useEffect(() => {
    if (tab !== 'diagnostico') return;
    let ativo = true;
    // Evita refetch constante: só busca se ainda não tem dados
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
          setDiagErro(d?.detail || d?.mensagem || 'Sem diagnóstico disponível');
        } finally {
          setDiagLoading(false);
        }
      })();
    }
    return () => { ativo = false; };
  }, [tab, id]);

  return (
    <div>
      <Header links={links} />
      <main className={progStyles.main}>
        <div className={progStyles.container}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '12px 0' }}>
            <button onClick={() => setTab('geral')} style={{ padding: '8px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: tab === 'geral' ? '#8E24AA' : '#eee', color: tab === 'geral' ? '#fff' : '#333' }}>Geral</button>
            <button onClick={() => setTab('diagnostico')} style={{ padding: '8px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: tab === 'diagnostico' ? '#8E24AA' : '#eee', color: tab === 'diagnostico' ? '#fff' : '#333' }}>Diagnóstico</button>
          </div>
          {tab === 'geral' && erro && <Alert type="info">{erro}</Alert>}
          {tab === 'diagnostico' && diagErro && <Alert type="info">{diagErro}</Alert>}
          {tab === 'diagnostico' && diagLoading && <p>Carregando...</p>}
        </div>

        {tab === 'geral' && (
          <>
            {loading ? <div className={progStyles.container}><p>Carregando...</p></div> : <ProgressoDados data={dados} />}
          </>
        )}

        {tab === 'diagnostico' && !diagLoading && diagDados && (
          <div className={progStyles.container}>
            <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>Diagnóstico</h2>
            <p style={{ textAlign: 'center', color: '#555' }}>Taxa geral: {diagDados.taxa_acerto}% · Exercícios: {diagDados.total_exercicios}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
              {Array.isArray(diagDados.mensagem_blocos) && diagDados.mensagem_blocos.map((bloco, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', padding: 16 }}>
                  <h4 style={{ marginTop: 0, color: '#8E24AA' }}>{bloco.titulo}</h4>
                  {(bloco.linhas || []).map((l, idx) => (
                    <p key={idx} style={{ margin: '6px 0', color: '#333' }}>{l}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      {confirmarSair && (
        <Modal
          title="Sair do perfil da criança?"
          primaryText="Sair"
          onPrimary={() => { setConfirmarSair(false); navigate('/escolhercriancas'); }}
          onClose={() => setConfirmarSair(false)}
        >
          <p>Você tem certeza que deseja sair?</p>
        </Modal>
      )}
    </div>
  );
};

export default Progresso;


