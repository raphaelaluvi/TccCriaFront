import React, { useState } from "react";
import styles from "./Dados.module.css";

const Dados = ({ tipo, dados, onEditar, onSalvar, onCancelar }) => {
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState(dados);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditar = () => {
    setEditando(true);
    onEditar && onEditar();
  };

  const handleCancelar = () => {
    setEditando(false);
    setFormData(dados);
    onCancelar && onCancelar();
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    onSalvar && onSalvar(formData);
    setEditando(false);
  };

  return (
    <section className={styles.perfilContainer}>
      <h2>
        {tipo === "crianca" ? "Meu Perfil - Criança" : "Meu Perfil - Responsável"}
      </h2>

      <div className={styles.perfilInfoBloco}>
        {tipo === "crianca" ? (
          <>
            <div className={styles.perfilInfo}>
              <span className={styles.label}>Nome:</span>
              <span className={styles.value}>{dados.nome}</span>
            </div>
            <div className={styles.perfilInfo}>
              <span className={styles.label}>Data de Nascimento:</span>
              <span className={styles.value}>{dados.dataNascimento}</span>
            </div>
            <div className={styles.perfilInfo}>
              <span className={styles.label}>Tipo de Escola:</span>
              <span className={styles.value}>{dados.tipoEscola}</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.perfilInfo}>
              <span className={styles.label}>Nome:</span>
              <span className={styles.value}>{dados.nome}</span>
            </div>
            <div className={styles.perfilInfo}>
              <span className={styles.label}>E-mail:</span>
              <span className={styles.value}>{dados.email}</span>
            </div>
            <div className={styles.perfilInfo}>
              <span className={styles.label}>Telefone:</span>
              <span className={styles.value}>{dados.telefone}</span>
            </div>
            <div className={styles.perfilInfo}>
              <span className={styles.label}>Plano:</span>
              <span className={styles.value}>{dados.plano}</span>
            </div>
          </>
        )}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSalvar} className={styles.form}>
        <h3>Editar Informações</h3>

        {Object.keys(formData).map((key) => (
          <label key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            {key === "tipoEscola" ? (
              <select
                name="tipoEscola"
                value={formData.tipoEscola}
                onChange={handleChange}
                disabled={!editando}
              >
                <option value="pública">Pública</option>
                <option value="privada">Privada</option>
              </select>
            ) : (
              <input
                type={key.includes("senha") ? "password" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                readOnly={!editando}
              />
            )}
          </label>
        ))}

        <div className={styles.btns}>
          {!editando ? (
            <button type="button" className={styles.editar} onClick={handleEditar}>
              Editar
            </button>
          ) : (
            <>
              <button type="submit" className={styles.salvar}>
                Salvar
              </button>
              <button type="button" className={styles.cancelar} onClick={handleCancelar}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </section>
  );
};

export default Dados;
