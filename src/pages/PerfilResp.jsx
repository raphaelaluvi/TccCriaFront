import React from "react";
import Dados from "../components/Dados/Dados";

const PerfilResp = () => {
  const responsavel = JSON.parse(localStorage.getItem("responsavel")) || {
    nome: "João da Silva",
    email: "joao@email.com",
    telefone: "11987654321",
    plano: "Premium",
  };

  return (
    <main>
      <Dados tipo="responsavel" dados={responsavel} />
    </main>
  );
};

export default PerfilResp;
