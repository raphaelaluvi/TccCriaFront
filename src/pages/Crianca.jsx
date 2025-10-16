import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ tem que vir antes de usar o hook
import HistoriaCard from "../components/CardHistorias/CardHistorias";
import styles from "../components/CardHistorias/CardHistorias.module.css";

import circoImg from "../assets/circo/circo.png";
import esquiloImg from "../assets/floresta/esquilo.png";
import galaxiaImg from "../assets/universo/galaxia.png";
import cartuchosImg from "../assets/oceano/concha.png";

const Crianca = () => {
  const navigate = useNavigate(); // ✅ agora o hook vai funcionar

  const abrirTrilha = (historia) => {
    localStorage.setItem("historiaAtual", historia);
    navigate("/trilha"); // ✅ muda de página sem recarregar
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
      tituloGrande: "Floresta Mágica",
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
      tituloGrande: "Encantado",
      bgColor: "#a6f2fc",
      borderColor: "#00bcd4",
      textColor: "#00bcd4",
      historia: "oceano",
    },
  ];

  return (
    <main className={styles.container}>
      <h2 className={styles.titulo}>Suas histórias</h2>
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
  );
};

export default Crianca;
