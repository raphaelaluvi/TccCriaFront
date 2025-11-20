import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import Alert from "../components/Alert/Alert";
import Dados from "../components/Dados/Dados";
import { logout, getUser } from "../services/auth";
import { buscarCrianca, atualizarCrianca } from "../services/criancas";
import styles from "../components/ProgressoDados/ProgressoDados.module.css";

const PerfilCrianca = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crianca, setCrianca] = useState({ nome: '', dataNascimento: '', tipoEscola: 'publica' });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('info');
  const [confirmarSair, setConfirmarSair] = useState(false);

  const links = [
    { label: 'Suas histórias', to: `/crianca/${id}` },
    { label: 'Progresso', to: `/progresso/${id}` },
    { label: 'Perfil', to: `/perfilcrianca/${id}` },
    { label: 'Sair', onClick: () => setConfirmarSair(true) }
  ];

  useEffect(() => {
    const u = getUser();
    if (!u?.id) { navigate('/login'); return; }
    (async () => {
      try {
        const d = await buscarCrianca(id);
        setCrianca({
          nome: d.nome || '',
          dataNascimento: d.data_nascimento || '',
          tipoEscola: d.tipo_escola || 'publica',
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleSalvar = async (formData, { finalizar } = {}) => {
    try {
      // Monta payload completo (alguns schemas exigem campos presentes)
      const nome = (formData.nome ?? crianca.nome ?? '').trim();
      let dataIso = String(formData.dataNascimento ?? crianca.dataNascimento ?? '');
      if (dataIso && !/^\d{4}-\d{2}-\d{2}$/.test(dataIso)) {
        const d = new Date(dataIso);
        if (!isNaN(d)) dataIso = d.toISOString().slice(0, 10);
      }
      const tipoNorm = (formData.tipoEscola ?? crianca.tipoEscola ?? 'publica')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      if (!nome || !dataIso || !tipoNorm) {
        alert('Preencha nome, data de nascimento e tipo de escola.');
        return;
      }

      const payload = {
        nome,
        data_nascimento: dataIso,
        tipo_escola: tipoNorm,
      };

      // Se nada mudou, evita chamada
      if (
        nome === (crianca.nome || '') &&
        dataIso === (crianca.dataNascimento || '') &&
        tipoNorm === (crianca.tipoEscola || '')
      ) {
        setMsgType('info');
        setMsg('Nada para atualizar.');
        return;
      }
      // console.log('PUT /criancas/', id, payload);
      const dadosAtual = await atualizarCrianca(id, payload);
      setCrianca({
        nome: dadosAtual.nome || '',
        dataNascimento: dadosAtual.data_nascimento || '',
        tipoEscola: dadosAtual.tipo_escola || 'publica',
      });
      setMsgType('success');
      setMsg('Dados atualizados com sucesso!');
      if (finalizar) finalizar();
    } catch (e) {
      const d = e?.response?.data;
      console.error('Erro atualizar criança:', d || e);
      setMsgType('error');
      setMsg(d?.detail || d?.mensagem || 'Erro ao atualizar criança');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  return (
    <div>
      <Header links={links} />
      <main style={{ paddingBottom: 80 }}>

        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>

        {loading ? <p>Carregando...</p> : (
          <>
            {msg && <Alert type={msgType}>{msg}</Alert>}
            <Dados tipo="crianca" dados={crianca} onSalvar={handleSalvar} onEditar={() => setMsg('')} onCancelar={() => setMsg('')} />
          </>
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

export default PerfilCrianca;


