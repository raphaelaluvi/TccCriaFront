import React from "react";
import CardPlanos from "../components/Cardplanos/Cardplanos";

const planosData = [
  {
    titulo: "Básico",
    itens: [
      { nome: "Plano Individual", preco: "R$8,99/mês", modalId: "plano1", tipo: "individual" },
      { nome: "Plano Família", preco: "R$12,00/mês", modalId: "plano2", tipo: "familia" },
      { nome: "Plano Escola 1", preco: "R$15,00/mês", modalId: "plano3", tipo: "escola" },
      { nome: "Plano Escola 2", preco: "R$18,00/mês", modalId: "plano4", tipo: "escola2" },
    ],
  },
  {
    titulo: "Completo",
    itens: [
      { nome: "Plano Individual Completo", preco: "R$11,50/mês", modalId: "plano5", tipo: "individual" },
      { nome: "Plano Família Completo", preco: "R$15,70/mês", modalId: "plano6", tipo: "familia" },
      { nome: "Plano Escola 1 Completo", preco: "R$16,00/mês", modalId: "plano7", tipo: "escola" },
      { nome: "Plano Escola 2 Completo", preco: "R$19,10/mês", modalId: "plano8", tipo: "escola2" },
    ],
  },
];

const Planos = () => {
  return <CardPlanos planos={planosData} />;
};

export default Planos;