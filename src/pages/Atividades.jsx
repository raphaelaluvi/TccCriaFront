import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AtividadeController from "../components/Atividades/AtividadeController";
import { listarExerciciosDaAtividade } from "../services/atividades";

const Atividades = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const atividadeId = params.get('atividadeId');
  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(!!atividadeId);
  const preset = location.state?.exercicios;
  const returnTo = location.state?.returnTo;

  useEffect(() => {
    let ativo = true;
    (async () => {
      if (!atividadeId) return;
      try {
        if (preset) {
          setExercicios(preset);
          return;
        }
        const data = await listarExerciciosDaAtividade(atividadeId);
        if (!ativo) return;
        setExercicios(data.exercicios || []);
      } finally {
        setLoading(false);
      }
    })();
    return () => { ativo = false };
  }, [atividadeId, preset]);

  if (!atividadeId) return <main style={{ padding: 20 }}><p>Nenhuma atividade selecionada.</p></main>;

  return (
    <main style={{ padding: "20px" }}>
      {loading ? <p>Carregando...</p> : (
        <AtividadeController
          atividadeId={atividadeId}
          exerciciosIniciais={exercicios}
          onConcluir={() => {
            if (returnTo) navigate(returnTo, { state: { refresh: Date.now() } });
            else navigate(-1);
          }}
        />
      )}
    </main>
  );
};

export default Atividades;
