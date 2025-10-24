import React, { useEffect, useState } from "react";
import styles from "./Dados.module.css";

const Dados = ({ tipo, dados, onEditar, onSalvar, onCancelar }) => {
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState(dados);

  useEffect(() => {
    if (!editando) setFormData(dados);
  }, [dados, editando]);

  const maskTelefone = (v) => {
    v = (v || '').replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    if (v.length > 2) return `(${v.slice(0,2)}) ${v.slice(2)}`;
    if (v.length > 0) return `(${v}`;
    return v;
  };

  const formatTelefone = (v) => {
    const d = (v || '').replace(/\D/g, '');
    if (d.length === 11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    if (d.length > 2) return `(${d.slice(0,2)}) ${d.slice(2)}`;
    if (d.length > 0) return `(${d}`;
    return '';
  };

  const formatDataBR = (v) => {
    if (!v) return '';
    // aceita 'YYYY-MM-DD' ou Date/string
    const s = String(v);
    let yyyy, mm, dd;
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      [yyyy, mm, dd] = s.split('-');
    } else {
      const d = new Date(s);
      if (isNaN(d)) return s;
      yyyy = String(d.getFullYear());
      mm = String(d.getMonth() + 1).padStart(2, '0');
      dd = String(d.getDate()).padStart(2, '0');
    }
    return `${dd}/${mm}/${yyyy}`;
  };

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
    onSalvar && onSalvar(formData, { finalizar: () => setEditando(false) });
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
              <span className={styles.value}>{formatDataBR(dados.dataNascimento)}</span>
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
              <span className={styles.value}>{formatTelefone(dados.telefone)}</span>
            </div>
            {dados.plano && (
              <div className={styles.perfilInfo}>
                <span className={styles.label}>Plano:</span>
                <span className={styles.value}>{dados.plano}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSalvar} className={styles.form}>
        <h3>Editar Informações</h3>

        {tipo === 'responsavel' ? (
          <>
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={formData.nome || ''}
                onChange={handleChange}
                readOnly={!editando}
              />
            </label>
            <label>
              E-mail:
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                readOnly={!editando}
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                name="telefone"
                value={formData.telefone || ''}
                onChange={handleChange}
                readOnly={!editando}
                placeholder="Somente números (11 dígitos)"
                inputMode="numeric"
                maxLength={15}
                onInput={(e) => { e.target.value = maskTelefone(e.target.value); }}
              />
            </label>
            <label>
              Senha atual:
              <input
                type="password"
                name="senha_atual"
                value={formData.senha_atual || ''}
                onChange={handleChange}
                readOnly={!editando}
                placeholder="Opcional"
              />
            </label>
            <label>
              Nova senha:
              <input
                type="password"
                name="senha_nova"
                value={formData.senha_nova || ''}
                onChange={handleChange}
                readOnly={!editando}
                placeholder="Opcional (mín. 6)"
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={formData.nome || ''}
                onChange={handleChange}
                readOnly={!editando}
              />
            </label>
            <label>
              Data de Nascimento:
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento || ''}
                onChange={handleChange}
                readOnly={!editando}
              />
            </label>
            <label>
              Tipo de Escola:
              <select
                name="tipoEscola"
                value={formData.tipoEscola || 'publica'}
                onChange={handleChange}
                disabled={!editando}
              >
                <option value="publica">Pública</option>
                <option value="privada">Privada</option>
              </select>
            </label>
          </>
        )}

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
