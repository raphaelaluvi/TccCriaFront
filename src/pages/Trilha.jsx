import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CardTrilhas from "../components/CardTrilhas/CardTrilhas";
import styles from "../components/CardTrilhas/CardTrilhas.module.css";
import Modal from "../components/Modal/Modal";
import { proximaAtividade, refazerAtividade } from "../services/atividades";
import { getTrilhaNivel } from "../services/trilhas";

// CIRCO
import palhaco from "../assets/circo/palhaco.png";
import malabarista from "../assets/circo/malabarista.png";
import leao from "../assets/circo/leao.png";
import trapezio from "../assets/circo/trapezio.png";
import fogos from "../assets/circo/fogos.png";

// ASTRONAUTAS
import foguete from "../assets/universo/foguete.png";
import planeta from "../assets/universo/planeta.png";
import espacial from "../assets/universo/espacial.png";
import buraco from "../assets/universo/buraco.png";
import terra from "../assets/universo/terra.png";

// FLORESTA
import floresta from "../assets/floresta/floresta.png";
import cachoeira from "../assets/floresta/cachoeira.png";
import tigre from "../assets/floresta/tigre.png";
import arvore from "../assets/floresta/arvore.png";
import caminho from "../assets/floresta/caminho.png";

// OCEANO
import mergulho from "../assets/oceano/mergulho.png";
import peixes from "../assets/oceano/peixes.png";
import coral from "../assets/oceano/coral.png";
import navio from "../assets/oceano/navio.png";
import segredo from "../assets/oceano/segredo.png";

// Dados estáticos por história (títulos, imagens)
const historiasData = {
  circo: {
    titulo: "Trilha de Atividades - Circo Mágico",
    descricao: "Avance pelos níveis do circo — complete as atividades e descubra o grande espetáculo final!",
    bgClass: "trilha-rosa",
    niveis: [
      { nome: "Show dos Palhaços", img: palhaco },
      { nome: "Malabaristas", img: malabarista },
      { nome: "Leões Adestrados", img: leao },
      { nome: "Trapezistas", img: trapezio },
      { nome: "O Grande Final", img: fogos },
    ],
  },

  galaxia: {
    titulo: "Trilha de Atividades - Aventura no Espaço",
    descricao: "Explore o universo, visite planetas e descubra os segredos das estrelas nesta jornada!",
    bgClass: "trilha-azul",
    niveis: [
      { nome: "Decolagem do Foguete", img: foguete },
      { nome: "Planeta Misterioso", img: planeta },
      { nome: "Estação Espacial", img: espacial },
      { nome: "Buraco Negro", img: buraco },
      { nome: "A Chegada em Casa", img: terra },
    ],
  },

  "floresta-magica": {
    titulo: "Trilha de Atividades - Mistérios da Floresta",
    descricao: "Caminhe pela natureza, descubra animais e segredos escondidos na floresta encantada!",
    bgClass: "trilha-verde",
    niveis: [
      { nome: "Entrada na Floresta", img: floresta },
      { nome: "Cachoeira Mágica", img: cachoeira },
      { nome: "Encontro com os Animais", img: tigre },
      { nome: "Árvore Gigante", img: arvore },
      { nome: "Saída da Floresta", img: caminho },
    ],
  },

  oceano: {
    titulo: "Trilha de Atividades - Mergulho no Oceano",
    descricao: "Mergulhe em um mundo submarino cheio de cores, recifes e criaturas incríveis!",
    bgClass: "trilha-amarela",
    niveis: [
      { nome: "Mergulho Inicial", img: mergulho },
      { nome: "Peixes Coloridos", img: peixes },
      { nome: "Recife de Coral", img: coral },
      { nome: "Navio Afundado", img: navio },
      { nome: "Segredo do Oceano", img: segredo },
    ],
  },
};

const Trilha = () => {
  const navigate = useNavigate();
  const { id, historia: historiaSlug } = useParams();
  const location = useLocation();
  const [historia, setHistoria] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [trilhaData, setTrilhaData] = useState(null); // dados do nível atual
  const [confirmar, setConfirmar] = useState(null); // { numero, cta }

  useEffect(() => {
    if (!historiaSlug || !historiasData[historiaSlug]) {
      navigate(`/crianca/${id}`);
      return;
    }
    setHistoria(historiasData[historiaSlug]);
  }, [historiaSlug, id, navigate]);

  useEffect(() => {
    let ativo = true;
    async function carregar() {
      const nivelMap = { circo: 1, "floresta-magica": 2, galaxia: 3, oceano: 4 };
      const nivel = nivelMap[historiaSlug] || 1;
      try {
        const data = await getTrilhaNivel(id, nivel);
        if (!ativo) return;
        setTrilhaData(data);
      } catch (e) {
        if (!ativo) return;
        setTrilhaData({ nivel, atividades: [], cta: { tipo: "iniciar" }, resumo: { total: 0, concluidas: 0, em_andamento: 0, desbloqueadas: 0 } });
      }
    }
    carregar();
    return () => { ativo = false };
  }, [id, historiaSlug, location.state?.refresh]);

  const iniciarOuContinuar = async (numero, cta) => {
    try {
      if (cta?.tipo === "continuar" && cta.atividade_id) {
        navigate(`/atividades?atividadeId=${cta.atividade_id}`, { state: { returnTo: `/trilha/${id}/${historiaSlug}` } });
        return;
      }
      const nivelMap = { circo: 1, "floresta-magica": 2, galaxia: 3, oceano: 4 };
      const nivel = nivelMap[historiaSlug] || 1;
      const res = await proximaAtividade({ crianca_id: id, nivel, historia: historiaSlug });
      const atividadeId = res.data?.atividade?.id || res.data?.atividade_id;
      const exercicios = res.data?.exercicios;
      if (atividadeId) {
        navigate(`/atividades?atividadeId=${atividadeId}`, { state: { exercicios, returnTo: `/trilha/${id}/${historiaSlug}` } });
      }
    } catch (e) {
      const status = e?.response?.status;
      const detail = e?.response?.data?.detail;
      if (status === 409 && detail?.atividade_pendente?.id) {
        const atividadeId = detail.atividade_pendente.id;
        const exercicios = detail.exercicios;
        navigate(`/atividades?atividadeId=${atividadeId}`, { state: { exercicios, returnTo: `/trilha/${id}/${historiaSlug}` } });
      } else {
        setToastMsg(detail?.mensagem || "Não foi possível iniciar/continuar");
        setTimeout(() => setToastMsg(""), 1800);
      }
    }
  };

  if (!historia) return null;

  const atividades = trilhaData?.atividades || [];
  const ctaTrilha = trilhaData?.cta || { tipo: "iniciar" };

  return (
    <main className={`${styles.trilhaContainer} ${styles[historia.bgClass]}`}>
      <h2>{historia.titulo}</h2>
      <p>{historia.descricao}</p>

      <div className={styles.niveis}>
        {historia.niveis.map((n, i) => {
          const numero = i + 1;
          const atividade = atividades[i];
          let feito = false, trancado = true, andamento = false;
          let cta = { tipo: "iniciar" };
          if (atividade) {
            feito = atividade.status === "concluida";
            andamento = atividade.status === "em_andamento";
            trancado = !atividade.desbloqueada;
            if (andamento) cta = { tipo: "continuar", atividade_id: atividade.id };
            else if (!feito) cta = { tipo: "iniciar" };
            else cta = { tipo: "refazer", atividade_id: atividade.id };
          } else if (i === atividades.length) {
            // Próximo slot usa CTA do backend
            cta = ctaTrilha;
            trancado = cta.tipo === "iniciar" ? false : cta.tipo !== "continuar";
          }
          return (
            <CardTrilhas
              key={i}
              img={n.img}
              nome={n.nome}
              numero={numero}
              feito={feito}
              trancado={trancado}
              andamento={andamento}
              onClick={() => {
                if (trancado) { setToastMsg("Complete o nível anterior primeiro!"); setTimeout(() => setToastMsg(""), 1800); return; }
                setConfirmar({ numero, cta });
              }}
            />
          );
        })}
      </div>

      <button className={styles.voltar} onClick={() => navigate(`/crianca/${id}`)}>
        Voltar
      </button>

      {toastMsg && <div className={styles.toast}>{toastMsg}</div>}
      {confirmar && (
        <Modal
          title={confirmar.cta?.tipo === "continuar" ? "Continuar atividade?" : confirmar.cta?.tipo === "refazer" ? "Refazer atividade?" : "Iniciar atividade?"}
          primaryText={confirmar.cta?.tipo === "continuar" ? "Continuar" : confirmar.cta?.tipo === "refazer" ? "Refazer" : "Iniciar"}
          onPrimary={async () => {
            const { numero, cta } = confirmar; setConfirmar(null);
            if (cta?.tipo === "refazer" && cta.atividade_id) {
              try {
                await refazerAtividade(cta.atividade_id);
        navigate(`/atividades?atividadeId=${cta.atividade_id}`, { state: { returnTo: `/trilha/${id}/${historiaSlug}` } });
              } catch { setToastMsg("Erro ao refazer"); setTimeout(() => setToastMsg(""), 1800); }
            } else {
              await iniciarOuContinuar(numero, cta);
            }
          }}
          onClose={() => setConfirmar(null)}
        >
          <p>{confirmar.cta?.tipo === "continuar" ? "Você irá retomar a atividade em andamento." : confirmar.cta?.tipo === "refazer" ? "Será reiniciada esta atividade com novos exercícios." : "Será aberta/criada a próxima atividade desta trilha."}</p>
        </Modal>
      )}
    </main>
  );
};

export default Trilha;
