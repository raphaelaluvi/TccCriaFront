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

  if (!atividadeId) return (
    <main className="atividadesPage"
      style={{
        minHeight: "100vh",
        padding: "24px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fdf6ff",
      }}
    >
      <p>Nenhuma atividade selecionada.</p>
    </main>
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px 8px !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(270deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb)",
        animation: "gradientAnim 15s ease infinite",
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
      </div>
    </main>
  );
};

export default Atividades;
