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
    <>
      <div className={`${styles.bolha} ${styles.bolha1}`} />
      <div className={`${styles.bolha} ${styles.bolha2}`} />
      <div className={`${styles.bolha} ${styles.bolha3}`} />
      <div className={`${styles.bolha} ${styles.bolha4}`} />
      <div className={`${styles.bolha} ${styles.bolha5}`} />
      <div className={`${styles.bolha} ${styles.bolha6}`} />
      <div className={`${styles.bolha} ${styles.bolha7}`} />
      <div className={`${styles.bolha} ${styles.bolha8}`} />
      <div className={`${styles.bolha} ${styles.bolha9}`} />
      <div className={`${styles.bolha} ${styles.bolha10}`} />
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
    </>
    
  );
};

export default CardHistorias;
