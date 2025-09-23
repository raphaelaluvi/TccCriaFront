import React from "react";

const Modais = ({ planos }) => {
  const fecharModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
  };

  return (
    <>
      {planos.map((categoria) =>
        categoria.itens.map((plano, idx) => (
          <div id={plano.modalId} className="modal" key={idx}>
            <div className="modal-conteudo">
              <span
                className="fechar"
                onClick={() => fecharModal(plano.modalId)}
              >
                &times;
              </span>
              <h2>{plano.nome}</h2>
              <ul>
                <li>Detalhes do plano...</li>
              </ul>
              <a href="cadastro.html" className="btn">
                Adquirir!
              </a>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Modais;