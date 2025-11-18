import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import HistoriaCard from "../components/CardHistorias/CardHistorias";
import styles from "../components/CardHistorias/CardHistorias.module.css";
import Modal from "../components/Modal/Modal";

import circoImg from "../assets/circo/circo.png";
import esquiloImg from "../assets/floresta/esquilo.png";
import galaxiaImg from "../assets/universo/galaxia.png";
import cartuchosImg from "../assets/oceano/concha.png";
import { proximaAtividade } from "../services/atividades";

const Crianca = () => {
  const navigate = useNavigate();
  const [confirmarSair, setConfirmarSair] = useState(false);
  const { id } = useParams();

  const links = [
    { label: 'Suas histórias', to: `/crianca/${id}` },
    { label: 'Progresso', to: `/progresso/${id}` },
    { label: 'Perfil', to: `/perfilcrianca/${id}` },
    { label: 'Sair', onClick: () => setConfirmarSair(true) }
  ];

  const mapHistoria = (slug) => {
    // mapeia nomes da UI para os esperados pelo backend
    if (slug === 'floresta') return 'floresta-magica';
    if (slug === 'astronautas') return 'galaxia';
    return slug; // circo, oceano
  };

  const abrirTrilha = (historia) => {
    const h = mapHistoria(historia);
    navigate(`/trilha/${id}/${h}`);
  };

  const historiasData = [
    {
      img: circoImg,
      tituloPequeno: "ENCANTE-SE COM O SHOW DO",
      tituloGrande: "Circo Mágico",
      bgColor: "#ffc7e2",
      borderColor: "#ff4fa3",
      textColor: "#ff4fa3",
      historia: "circo",
    },
    {
      img: esquiloImg,
      tituloPequeno: "DESVENDE OS SEGREDOS DA",
      tituloGrande: "Floresta Encantada",
      bgColor: "#c2ecc3",
      borderColor: "#4caf50",
      textColor: "#4caf50",
      historia: "floresta",
    },
    {
      img: galaxiaImg,
      tituloPequeno: "VIAJE PELAS ESTRELAS COM OS",
      tituloGrande: "Astronautas",
      bgColor: "#f8dc9b",
      borderColor: "#ffb300",
      textColor: "#ffb300",
      historia: "astronautas",
    },
    {
      img: cartuchosImg,
      tituloPequeno: "MERGULHE NO OCEANO",
      tituloGrande: "Misterioso",
      bgColor: "#a6f2fc",
      borderColor: "#00bcd4",
      textColor: "#00bcd4",
      historia: "oceano",
    },
  ];

  return (
    <div>
      <Header links={links} />
      <main className={styles.container}>
        <div className={styles.cardsContainer}>
          {historiasData.map((h, index) => (
            <HistoriaCard
              key={index}
              img={h.img}
              tituloPequeno={h.tituloPequeno}
              tituloGrande={h.tituloGrande}
              bgColor={h.bgColor}
              borderColor={h.borderColor}
              textColor={h.textColor}
              onClick={() => abrirTrilha(h.historia)}
            />
          ))}
        </div>
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

export default Crianca;
