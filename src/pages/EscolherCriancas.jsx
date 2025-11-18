import React, { useEffect, useState } from "react";
import CardCriancas from "../components/CardCriancas/CardCriancas";
import Header from "../components/Header/Header";
import { logout, getUser, getDashboardRoute } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { listarCriancasDoResponsavel, cadastrarCrianca } from "../services/criancas";
import Modal from "../components/Modal/Modal";

export default function EscolherCrianca() {
  const [criancas, setCriancas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [confirmarSair, setConfirmarSair] = useState(false);
  const navigate = useNavigate();
  const links = [
    { label: 'Perfil', to: '/perfilresponsavel' },
    { label: 'Suas crianças', to: '/escolhercriancas' },
    { label: 'Sair', onClick: () => setConfirmarSair(true) }
  ];

  useEffect(() => {
    const u = getUser();
    if (!u?.id) { navigate('/login'); return; }
    if (u?.tipo && u.tipo !== 'responsavel') {
      navigate(getDashboardRoute(u.tipo));
      return;
    }
    (async () => {
      try {
        const lista = await listarCriancasDoResponsavel(u.id);
        setCriancas(lista);
      } catch (e) {
        console.error(e);
      } finally {
        setCarregando(false);
      }
    })();
  }, [navigate]);

  const handleCadastrar = async (payload) => {
    try {
      const u = getUser();
      const dados = await cadastrarCrianca({ ...payload, responsavel_id: u.id });
      setCriancas(prev => ([...prev, dados]));
    } catch (e) {
      const d = e?.response?.data;
      alert(d?.detail || d?.mensagem || 'Erro ao cadastrar criança');
    }
  };

  return (
    <div>
      <Header links={links} />
      <main>
        {carregando ? <p>Carregando...</p> : (
          <CardCriancas items={criancas} onCadastrar={handleCadastrar} />
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
}
