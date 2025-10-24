import React from "react";
import CardPlanos from "../components/Cardplanos/Cardplanos";

const planosData = [
  {
    titulo: "Básico",
    itens: [
      {
        nome: "Plano Individual",
        preco: "R$8,99/mês",
        modalId: "plano1",
        tipo: "individual",
        detalhes: [
          "Uma criança.",
          "Vida Ilimitada.",
          "Progresso da criança NÃO DETALHADO",
          "Refazer Exercícios Errados (Apenas uma tentativa)",
          "Sem anúncio",
        ],
      },
      {
        nome: "Plano Família",
        preco: "R$12,00/mês",
        modalId: "plano2",
        tipo: "familia",
        detalhes: [
          "Duas a cinco crianças.",
          "Vida Ilimitada.",
          "Progresso da criança NÃO DETALHADO",
          "Refazer Exercícios Errados (Apenas uma tentativa)",
          "Sem anúncio",
        ],
      },
      {
        nome: "Plano Escola 1",
        preco: "R$15,00/mês",
        modalId: "plano3",
        tipo: "escola",
        detalhes: [
          "100 crianças.",
          "Vida Ilimitada.",
          "Progresso da criança NÃO DETALHADO",
          "Refazer Exercícios Errados (Apenas uma tentativa)",
          "Sem anúncio",
        ],
      },
      {
        nome: "Plano Escola 2",
        preco: "R$18,00/mês",
        modalId: "plano4",
        tipo: "escola2",
        detalhes: [
          "200 crianças.",
          "Vida Ilimitada.",
          "Progresso da criança NÃO DETALHADO",
          "Refazer Exercícios Errados (Apenas uma tentativa)",
          "Sem anúncio",
        ],
      },
    ],
  },
  {
    titulo: "Completo",
    itens: [
      {
        nome: "Plano Individual Completo",
        preco: "R$11,50/mês",
        modalId: "plano5",
        tipo: "individual",
        detalhes: [
          "Uma criança.",
          "Vida Ilimitada.",
          "Progresso da criança DETALHADO",
          "Refazer Exercícios Errados (Três tentativas)",
          "Sem anúncio",
        ],
      },
      {
        nome: "Plano Família Completo",
        preco: "R$15,70/mês",
        modalId: "plano6",
        tipo: "familia",
        detalhes: [
          "Duas a cinco crianças.",
          "Vida Ilimitada.",
          "Progresso da criança DETALHADO",
          "Refazer Exercícios Errados (Três tentativas)",
          "Sem anúncio",
        ],
      },
      {
        nome: "Plano Escola 1 Completo",
        preco: "R$16,00/mês",
        modalId: "plano7",
        tipo: "escola",
        detalhes: [
          "100 crianças.",
          "Vida Ilimitada.",
          "Progresso da criança DETALHADO",
          "Refazer Exercícios Errados (Três tentativas)",
          "Sem anúncio",
        ],
      },
      {
        nome: "Plano Escola 2 Completo",
        preco: "R$19,10/mês",
        modalId: "plano8",
        tipo: "escola2",
        detalhes: [
          "200 crianças.",
          "Vida Ilimitada.",
          "Progresso da criança DETALHADO",
          "Refazer Exercícios Errados (Três tentativas)",
          "Sem anúncio",
        ],
      },
    ],
  },
];


const Planos = () => {
  return <CardPlanos planos={planosData} />;
};

export default Planos;