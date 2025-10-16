import React, { useState } from "react";
import styles from "./Cardplanos.module.css";
import individual from "../../assets/planos/individual.png";
import escola from "../../assets/planos/escola.png";
import escola2 from "../../assets/planos/escola2.png";
import familia from "../../assets/planos/familia.png";

const CardPlanos = ({ planos }) => {
  const [modalAberto, setModalAberto] = useState(null);

  // Mapeamento de ícones
  const icones = {
    individual: individual,
    escola: escola,
    escola2: escola2,
    familia: familia,
  };

  // Busca o plano que está aberto
  const planoSelecionado = planos
    .flatMap((categoria) => categoria.itens)
    .find((plano) => plano.modalId === modalAberto);

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
                <div className={styles["plano-card"]} key={plano.modalId}>
                  {/* Ícone antes do nome */}
                    {plano.tipo && (
                      <img
                        src={icones[plano.tipo]}
                        alt={`${plano.nome} ícone`}
                        className={styles.icone}
                      />
                    )}
                  <h3>
                    
                    {plano.nome}
                  </h3>
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

        {planoSelecionado && (
          <div
            className={styles.modalOverlay}
            onClick={() => setModalAberto(null)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setModalAberto(null)}>X</button>
              <h2>{planoSelecionado.nome}</h2>
              <p>{planoSelecionado.preco}</p>
              <ul>
                <li>Detalhes do {planoSelecionado.nome}...</li>
              </ul>
              <a href="/cadastro" className={styles.btn}>
                Adquirir!
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CardPlanos;
