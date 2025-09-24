import React, { useState } from "react";
import styles from "./Cardplanos.module.css";

const CardPlanos = ({ planos }) => {
  // Estado para controlar qual modal está aberto (null = nenhum)
  const [modalAberto, setModalAberto] = useState(null);

  return (
    <main>
      <section className={styles.planos}>
        <h1>
          Nossos <span>Planos</span>
        </h1>
        <p className={styles.descricao}>
          Escolha o plano que melhor se adapta às suas necessidades.
        </p>

        {planos.map((categoria, index) => (
          <div key={index}>
            <h2>
              Plano <span>{categoria.titulo}</span>
            </h2>
            <div className={styles["planos-container"]}>
              {categoria.itens.map((plano, idx) => (
                <div className={styles["plano-card"]} key={idx}>
                  <h3>{plano.nome}</h3>
                  <p className={styles.preco}>{plano.preco}</p>
                  <button
                    className={styles.btn}
                    onClick={() => setModalAberto(plano.modalId)}
                  >
                    Ver Mais
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {modalAberto && (
          <div
            className={styles.modalOverlay}
            onClick={() => setModalAberto(null)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setModalAberto(null)}>Fechar</button>
              <p>Conteúdo do modal com ID: {modalAberto}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CardPlanos;
