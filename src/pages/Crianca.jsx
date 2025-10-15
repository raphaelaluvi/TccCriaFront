import React from "react";
import HistoriaCard from "../components/CardHistorias/CardHistorias";
import styles from "../components/CardHistorias/CardHistorias.module.css";

import circoImg from "../assets/circo.png";
import esquiloImg from "../assets/esquilo.png";
import galaxiaImg from "../assets/galaxia.png";
import cartuchosImg from "../assets/cartuchos.png";

const Crianca = () => {
  const abrirTrilha = (historia) => {
    localStorage.setItem("historiaAtual", historia);
    window.location.href = `trilha-${historia}.html`;
  };

  const historias = [
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
        {historias.map((h, index) => (
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
