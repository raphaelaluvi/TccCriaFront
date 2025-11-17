import React from "react";
import styles from "./CardTurma.module.css";
import avatar from "../../assets/planos/individual.png";

export default function CardTurma() {
  return (
    <main className={styles.selecionarContainer}>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>

      <h2>Suas Turmas</h2>

      <div className={styles.criancasGrid}>
        <div className={styles.criancaCard}>
          <img src={avatar} className={styles.criancaAvatar} />

          <div className={styles.info}>
            <h3 className={styles.nome}>1°C</h3>
            <p className={styles.descricao}>Primeiro ano do ensino fundamental I</p>
          </div>
        </div>

      </div>
    </main>

  );
}
