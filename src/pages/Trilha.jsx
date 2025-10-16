import React, { useEffect, useState } from "react";
import CardTrilhas from "../components/CardTrilhas/CardTrilhas";
import styles from "../components/CardTrilhas/CardTrilhas.module.css";

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

// ==========================
// DADOS DAS HISTÓRIAS
// ==========================
const historiasData = {
  circo: {
    titulo: "Trilha de Atividades - Circo Mágico 🎪",
    descricao:
      "Avance pelos níveis do circo — complete as atividades e descubra o grande espetáculo final!",
    bgClass: "trilha-rosa",
    niveis: [
      { nome: "Show dos Palhaços", img: palhaco },
      { nome: "Malabaristas", img: malabarista },
      { nome: "Leões Adestrados", img: leao },
      { nome: "Trapezistas", img: trapezio },
      { nome: "O Grande Final", img: fogos },
    ],
  },

  astronautas: {
    titulo: "Trilha de Atividades - Aventura no Espaço 🚀",
    descricao:
      "Explore o universo, visite planetas e descubra os segredos das estrelas nesta jornada intergaláctica!",
    bgClass: "trilha-azul",
    niveis: [
      { nome: "Decolagem do Foguete", img: foguete },
      { nome: "Planeta Misterioso", img: planeta },
      { nome: "Estação Espacial", img: espacial },
      { nome: "Buraco Negro", img: buraco },
      { nome: "A Chegada em Casa", img: terra },
    ],
  },

  floresta: {
    titulo: "Trilha de Atividades - Mistérios da Floresta 🌳",
    descricao:
      "Caminhe pela natureza, descubra animais e segredos escondidos na floresta encantada!",
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
    titulo: "Trilha de Atividades - Mergulho no Oceano 🐠",
    descricao:
      "Mergulhe em um mundo submarino cheio de cores, recifes e criaturas incríveis!",
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

// ==========================
// COMPONENTE PRINCIPAL
// ==========================
const Trilha = () => {
  const [historia, setHistoria] = useState(null);
  const [progresso, setProgresso] = useState({ nivel: 1, feitos: [] });
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const historiaAtual = localStorage.getItem("historiaAtual");
    if (!historiaAtual || !historiasData[historiaAtual]) {
      window.location.href = "/"; // fallback se acessar direto
      return;
    }

    setHistoria(historiasData[historiaAtual]);
    const progressoSalvo =
      JSON.parse(localStorage.getItem(`progresso_${historiaAtual}`)) ||
      { nivel: 1, feitos: [] };
    setProgresso(progressoSalvo);
  }, []);

  function salvarProgresso(novo) {
    const historiaAtual = localStorage.getItem("historiaAtual");
    localStorage.setItem(`progresso_${historiaAtual}`, JSON.stringify(novo));
  }

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 1800);
  }

  function iniciarAtividade(numero) {
    const historiaAtual = localStorage.getItem("historiaAtual");
    localStorage.setItem(
      "atividadeAtual",
      JSON.stringify({ historia: historiaAtual, nivel: numero })
    );
    showToast(`Iniciando atividade ${numero} de ${historia.titulo}`);
    setTimeout(() => {
      window.location.href = "/atividades";
    }, 800);
  }

  if (!historia) return null;

  return (
    <main className={`${styles.trilhaContainer} ${styles[historia.bgClass]}`}>
      <h2>{historia.titulo}</h2>
      <p>{historia.descricao}</p>

      <div className={styles.niveis}>
        {historia.niveis.map((n, i) => {
          const numero = i + 1;
          const feito = progresso.feitos.includes(numero);
          const trancado = numero > progresso.nivel;
          return (
            <CardTrilhas
              key={i}
              img={n.img}
              nome={n.nome}
              numero={numero}
              feito={feito}
              trancado={trancado}
              onClick={() => {
                if (trancado)
                  return showToast("Complete o nível anterior primeiro!");
                iniciarAtividade(numero);
              }}
            />
          );
        })}
      </div>

      <button
        className={styles.voltar}
        onClick={() => (window.location.href = "/crianca")}
      >
        Voltar
      </button>

      {toastMsg && <div className={styles.toast}>{toastMsg}</div>}
    </main>
  );
};

export default Trilha;
