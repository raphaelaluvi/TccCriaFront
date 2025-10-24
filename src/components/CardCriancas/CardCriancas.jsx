import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./CardCriancas.module.css";
import avatar from "../../assets/avatar.png";
import formStyles from "../FormEntrar/FormEntrar.module.css";

export default function CardCriancas({ items = [], onCadastrar }) {
  const [criancas, setCriancas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  const maskCPF = (v) => {
    v = (v || "").replace(/\D/g, "").slice(0, 11);
    if (v.length > 9) return `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6,9)}-${v.slice(9)}`;
    if (v.length > 6) return `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6)}`;
    if (v.length > 3) return `${v.slice(0,3)}.${v.slice(3)}`;
    return v;
  };

  // Função para adicionar uma nova criança
  function handleCadastro(e) {
    e.preventDefault();
    const form = e.target;
    const novaCrianca = {
      cpf: (form.cpf.value || '').replace(/\D/g, ''),
      nome: form.nome.value,
      data_nascimento: form.data_nascimento.value,
      tipo_escola: form.tipo_escola.value,
    };
    if (onCadastrar) {
      onCadastrar(novaCrianca);
    } else {
      setCriancas((prev) => [...prev, novaCrianca]);
    }
    form.reset();
    setModalAberto(false);
  }

  // Função para navegar para /crianca
  const handleCardClick = (crianca) => {
    if (crianca?.id) navigate(`/crianca/${crianca.id}`);
  };

  const lista = (items && items.length) ? items : criancas;

  return (
    <main className={styles.selecionarContainer}>
      <h2>Escolha a criança que irá aprender!</h2>

      {/* Lista de crianças */}
      {lista.length > 0 ? (
        <div className={styles.criancasGrid}>
          {lista.map((crianca, index) => (
            <div
              key={index}
              className={styles.criancaCard}
              onClick={() => handleCardClick(crianca)}
              style={{ cursor: "pointer" }} // deixa visualmente clicável
            >
              <img src={avatar} alt={`Avatar de ${crianca.nome}`} className={styles.criancaAvatar} />
              <h3>{crianca.nome}</h3>
            </div>
          ))}
          {/* Card de adicionar criança */}
          <div
            className={`${styles.criancaCard} ${styles.adicionarCard}`}
            onClick={() => setModalAberto(true)}
          >
            <div className={styles.adicionarIcone}>
              <span>+</span>
            </div>
            <p>Adicionar Criança</p>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p>Você ainda não cadastrou nenhuma criança.</p>
          <button className={styles.btnCadastrar} onClick={() => setModalAberto(true)}>
            Cadastrar Criança
          </button>
        </div>
      )}

      {/* Modal */}
      {modalAberto && (
        <div className={styles.modal} style={{ display: "block" }}>
          <div className={formStyles.formulario} style={{ position: 'relative' }}>
            <button
              aria-label="Fechar"
              onClick={() => setModalAberto(false)}
              style={{ position: 'absolute', top: 10, right: 12, background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer' }}
            >
              &times;
            </button>
            <h2>Cadastrar Criança</h2>
            <form id="formCadastroCrianca" onSubmit={handleCadastro}>
              <div>
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  required
                  maxLength={14}
                  inputMode="numeric"
                  onInput={(e) => { e.target.value = maskCPF(e.target.value); }}
                />
              </div>
              <div>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite o nome"
                  required
                />
              </div>
              <div>
                <label htmlFor="data_nascimento">Data de Nascimento</label>
                <input type="date" id="data_nascimento" name="data_nascimento" required />
              </div>
              <div>
                <label htmlFor="tipo_escola">Tipo de Escola</label>
                <select id="tipo_escola" name="tipo_escola" required>
                  <option value="">Selecione</option>
                  <option value="publica">Pública</option>
                  <option value="privada">Privada</option>
                </select>
              </div>
              <button type="submit" className={formStyles.btn}>Cadastrar</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
