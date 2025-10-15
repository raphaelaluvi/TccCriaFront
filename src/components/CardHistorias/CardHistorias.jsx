import React from "react";
import styles from "./CardHistorias.module.css";

const CardHistorias = ({
  img,
  tituloPequeno,
  tituloGrande,
  bgColor,
  borderColor,
  textColor,
  onClick,
}) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: bgColor,
        borderLeft: `6px solid ${borderColor}`,
      }}
      onClick={onClick}
    >
      <img src={img} alt={tituloGrande} />
      <div className={styles.texto}>
        <p>{tituloPequeno}</p>
        <h2 style={{ color: textColor }}>{tituloGrande}</h2>
      </div>
    </div>
  );
};

export default CardHistorias;
