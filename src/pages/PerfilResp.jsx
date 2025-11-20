import React, { useEffect, useState } from "react";
import Dados from "../components/Dados/Dados";
import Header from "../components/Header/Header";
import Alert from "../components/Alert/Alert";
import Modal from "../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { getUser, logout, me } from "../services/auth";
import { listarCriancasDoResponsavel } from "../services/criancas";
import { atualizarResponsavel } from "../services/responsaveis";

const PerfilResp = () => {
  const [resp, setResp] = useState({ nome: '', email: '', telefone: '' });
  const [criancas, setCriancas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmarSair, setConfirmarSair] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const links = [
    { label: 'Perfil', to: '/perfilresponsavel' },
    { label: 'Suas crianças', to: '/escolhercriancas' },
    { label: 'Sair', onClick: () => setConfirmarSair(true) }
  ];

  useEffect(() => {
    const u = getUser();
    if (!u?.id) { navigate('/login'); return; }
    (async () => {
      try {
        const dados = await me();
        if (dados) setResp({ nome: dados.nome || '', email: dados.email || '', telefone: dados.telefone || '' });
        const lista = await listarCriancasDoResponsavel(u.id);
        setCriancas(lista);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleSalvar = async (formData, { finalizar }) => {
    try {
      const u = getUser();
      const next = { ...formData };
      const telefoneDigits = (next.telefone || '').replace(/\D/g, '');

      // Monta payload apenas com campos alterados
      const payload = {};
      if (next.nome && next.nome.trim() !== (resp.nome || '')) payload.nome = next.nome.trim();
      if (next.email && next.email.trim() !== (resp.email || '')) payload.email = next.email.trim();
      if (telefoneDigits && telefoneDigits !== (resp.telefone || '')) payload.telefone = telefoneDigits;

      // Valida troca de senha
      const temSenhaAtual = !!(next.senha_atual && next.senha_atual.length);
      const temSenhaNova = !!(next.senha_nova && next.senha_nova.length);
      if (temSenhaAtual || temSenhaNova) {
        if (!(temSenhaAtual && temSenhaNova)) {
          setMsg('Para alterar a senha, preencha senha atual e nova.');
          return;
        }
        if (next.senha_nova.length < 6) {
          setMsg('A nova senha deve ter ao menos 6 caracteres.');
          return;
        }
        if (next.senha_atual === next.senha_nova) {
          setMsg('A nova senha deve ser diferente da atual.');
          return;
        }
        payload.senha_atual = next.senha_atual;
        payload.senha_nova = next.senha_nova;
      }

      if (Object.keys(payload).length === 0) {
        setMsg('Nada para atualizar.');
        return;
      }
      const dadosAtualizados = await atualizarResponsavel(u.id, payload);
      setResp({ nome: dadosAtualizados.nome, email: dadosAtualizados.email, telefone: dadosAtualizados.telefone });
      const userLS = getUser();
      localStorage.setItem('user', JSON.stringify({ ...userLS, nome: dadosAtualizados.nome, email: dadosAtualizados.email, telefone: dadosAtualizados.telefone }));
      setMsg('Dados atualizados com sucesso!');
      finalizar && finalizar();
      setTimeout(() => setMsg(''), 2000);
    } catch (e) {
      const d = e?.response?.data;
      setMsg(d?.detail || d?.mensagem || 'Erro ao atualizar');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const dadosParaEdicao = { ...resp, senha_atual: '', senha_nova: '' };

  return (
    <div>
      <Header links={links} />
      <main style={{ paddingBottom: 80 }}>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {msg && <Alert type={msg.startsWith('Erro') ? 'error' : 'success'}>{msg}</Alert>}
            <Dados tipo="responsavel" dados={dadosParaEdicao} onSalvar={handleSalvar} onEditar={() => setMsg('')} onCancelar={() => setMsg('')} />

            <section style={{ maxWidth: 600, margin: '20px auto' }}>
              <h3>Crianças cadastradas</h3>
              {criancas?.length ? (
                criancas.map((c) => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    <span>{c.nome}</span>
                    <button onClick={() => navigate(`/perfilcrianca/${c.id}`)} style={{ padding: '6px 10px', borderRadius: 8, border: 'none', background: '#8E24AA', color: '#fff', cursor: 'pointer' }}>Ver perfil</button>
                  </div>
                ))
              ) : (
                <p>Nenhuma criança cadastrada.</p>
              )}
            </section>

          </>
        )}
      </main>
      {confirmarSair && (
        <Modal
          title="Sair da conta?"
          primaryText="Sair"
          onPrimary={() => { setConfirmarSair(false); logout(); navigate('/login'); }}
          onClose={() => setConfirmarSair(false)}
        >
          <p>Você tem certeza que deseja sair?</p>
        </Modal>
      )}
    </div>
  );
};

export default PerfilResp;
