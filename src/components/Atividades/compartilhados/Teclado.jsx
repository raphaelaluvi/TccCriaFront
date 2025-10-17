import React from "react";

/**
 * Componente genérico de teclado.
 * Recebe:
 * - keys: array de letras ou números
 * - onPress: função chamada ao clicar
 * - className: opcional
 */
const Teclado = ({ keys = [], onPress = () => {}, className = "" }) => {
  return (
    <div className={className}>
      {keys.map((k) => (
        <button
          key={k}
          aria-label={`tecla-${k}`}
          onClick={() => onPress(k)}
          style={{
            minWidth: 40,
            padding: 8,
            margin: 4,
            borderRadius: 8,
            background: "#81c784",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {k}
        </button>
      ))}
    </div>
  );
};

export default Teclado;
