import React from "react";
import styles from "./CardTurma.module.css";
import avatar from "../../assets/planos/individual.png";

function TurmaCard({ turma, onSelect }) {
  const descricao =
    turma?.descricao ||
    turma?.serie ||
    turma?.nivel ||
    turma?.turno ||
    "Clique para ver mais detalhes";

  const detalhes = [];
  if (typeof turma?.total_criancas === "number") {
    detalhes.push(`${turma.total_criancas} aluno(s)`);
  }
  if (Array.isArray(turma?.professores) && turma.professores.length) {
    detalhes.push(`${turma.professores.length} professor(es)`);
  }

  return (
    <div className={styles.criancaCard} onClick={() => onSelect?.(turma)}>
      <img src={avatar} className={styles.criancaAvatar} alt="Ícone da turma" />
      <div className={styles.info}>
        <h3 className={styles.nome}>{turma?.nome || "Turma"}</h3>
        <p className={styles.descricao}>{descricao}</p>
        {detalhes.length > 0 && (
          <p className={styles.meta}>{detalhes.join(" · ")}</p>
        )}
      </div>
    </div>
  );
}

export default function CardTurma({ turmas = [], onSelect }) {
  return (
    <main className={styles.selecionarContainer}>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>

      <h2 style={{marginBlock: '3rem'}} >Suas Turmas</h2>

      {turmas.length === 0 ? (
        <p style={{ marginTop: 40, color: "#666", textAlign: "center" }}>
          Nenhuma turma encontrada. Você será notificado quando uma turma for atribuída.
        </p>
      ) : (
        <div className={styles.criancasGrid}>
          {turmas.map((turma) => (
            <TurmaCard key={turma.id || turma._id} turma={turma} onSelect={onSelect} />
          ))}
        </div>
      )}
    </main>
  );
}
