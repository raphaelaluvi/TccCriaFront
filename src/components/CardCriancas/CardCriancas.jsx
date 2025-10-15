import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ importar useNavigate
import styles from "./CardCriancas.module.css";

export default function CardCriancas() {
  const [criancas, setCriancas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate(); // ✅ hook para navegação

  // Função para adicionar uma nova criança
  function handleCadastro(e) {
    e.preventDefault();
    const form = e.target;
    const novaCrianca = {
      cpf: form.cpf.value,
      nome: form.nome.value,
      data_nascimento: form.data_nascimento.value,
      tipo_escola: form.tipo_escola.value,
    };
    setCriancas([...criancas, novaCrianca]);
    form.reset();
    setModalAberto(false);
  }

  // Função para navegar para /crianca
  const handleCardClick = (crianca) => {
    navigate("/crianca"); // ✅ aqui você pode passar info se quiser: navigate("/crianca", { state: crianca })
  };

  return (
    <main className={styles.selecionarContainer}>
      <h2>Escolha a criança que irá aprender!</h2>

      {/* Lista de crianças */}
      {criancas.length > 0 ? (
        <div className={styles.criancasGrid}>
          {criancas.map((crianca, index) => (
            <div
              key={index}
              className={styles.criancaCard}
              onClick={() => handleCardClick(crianca)}
              style={{ cursor: "pointer" }} // deixa visualmente clicável
            >
              <div className={styles.criancaAvatar}></div>
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
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setModalAberto(false)}>
              &times;
            </span>
            <h2>Cadastrar Criança</h2>
            <form id="formCadastroCrianca" onSubmit={handleCadastro}>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                required
              />

              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                placeholder="Digite o nome"
                required
              />

              <label htmlFor="data_nascimento">Data de Nascimento</label>
              <input type="date" name="data_nascimento" required />

              <label htmlFor="tipo_escola">Tipo de Escola</label>
              <select name="tipo_escola" required>
                <option value="">Selecione</option>
                <option value="Pública">Pública</option>
                <option value="Privada">Privada</option>
              </select>

              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
