import React from "react";

const Botao = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Botao;
