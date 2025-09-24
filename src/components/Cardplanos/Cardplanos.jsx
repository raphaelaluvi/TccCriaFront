import React from "react";

const CardPlanos = ({ planos }) => {
  return (
    <main>
      <section className="planos">
        <h1>
          Nossos <span>Planos</span>
        </h1>
        <p className="descricao">
          Escolha o plano que melhor se adapta às suas necessidades.
        </p>


        {planos.map((categoria, index) => (
          <div key={index}>
            <h2>
              Plano <span>{categoria.titulo}</span>
            </h2>
            <div className="planos-container">
              {categoria.itens.map((plano, idx) => (
                <div className="plano-card" key={idx}>
                  <h3>{plano.nome}</h3>
                  <p className="preco">{plano.preco}</p>
                  <button
                    className="btn"
                    onClick={() => mostrarModal(plano.modalId)}
                  >
                    Ver Mais
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

// Funções para exibir e fechar modais
const mostrarModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "block";
};

export default CardPlanos;