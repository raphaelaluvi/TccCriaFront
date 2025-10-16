import React from "react";
import Dados from "../components/Dados/Dados";

const PerfilCrianca = () => {
  const crianca = JSON.parse(localStorage.getItem("crianca")) || {
    nome: "Maria Souza",
    dataNascimento: "2017-06-12",
    tipoEscola: "pública",
  };

  return (
    <main>
      <Dados tipo="crianca" dados={crianca} />
    </main>
  );
};

export default PerfilCrianca;
