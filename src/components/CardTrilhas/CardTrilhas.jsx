import React from "react";
import styles from "./CardTrilhas.module.css";

const CardTrilhas = ({ img, nome, numero, feito, trancado, andamento, onClick }) => {
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
      {!feito && andamento && <div className={`${styles.badge} ${styles.badgeAndamento}`}>Em andamento</div>}
      {trancado && <div className={`${styles.badge} ${styles.badgeBloqueado}`}>Bloqueado</div>}
    </div>
  );
};

export default CardTrilhas;
