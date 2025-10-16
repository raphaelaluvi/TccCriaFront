import React from "react";
import styles from "./CardTrilhas.module.css";

const CardTrilhas = ({ img, nome, numero, feito, trancado, onClick }) => {
  return (
    <div
      className={`${styles.nivel} 
        ${feito ? styles.feito : ""} 
        ${trancado ? styles.trancado : ""}`}
      onClick={onClick}
    >
      <img src={img} alt={nome} />
      <span>
        {numero}. {nome}
      </span>
      {feito && <div className={styles.badge}>Feito</div>}
    </div>
  );
};

export default CardTrilhas;
