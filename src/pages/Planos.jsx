import React from "react";
import CardPlanos from "../components/CardPlanos";
import Modais from "../components/Modais";
import planosData from "../data/planosData";

export default function Planos() {
    return (
        <>
          <CardPlanos planos={planosData} />
          <Modais planos={planosData} />
        </>
      );
}
