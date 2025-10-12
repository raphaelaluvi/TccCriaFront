import styles from './InfoContato.module.css';

export default function InfoContato() {
  return (
     <section className={styles.contato}>
      <h2>Entre em <span>Contato</span></h2>
      <div className={styles.contatoContainer}>

        {/* Informações de Contato */}
        <div className={styles.contatoInfo}>
          <h3>Nossos canais</h3>

          <div className={styles.infoItem}>
            <span className={styles.icon}>📧</span>
            <p><strong>Email:</strong><br /> tcccriakids@gmail.com</p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.icon}>📱</span>
            <p><strong>Telefone:</strong><br /> (11) 99999-9999</p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.icon}  >📍</span>
            <p><strong>Endereço:</strong><br /> Rua Bélgica, 88, Jardim Alvorada, Ribeirão Pires - SP, CEP 09402-060</p>
          </div>
        </div>


        {/* Formulário */}
        <form className={styles.contatoForm}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Digite seu nome" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" placeholder="Digite sua mensagem" required></textarea>
          </div>
          <button type="submit" className={styles.btn}>Enviar</button>
        </form>
      </div>

      {/* Mapa */}
      <div className={styles.mapa}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.215175623278!2d-46.414082099999995!3d-23.7040088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce6cf6b9a660b5%3A0xb470d63bf1a2159e!2sEtec%20de%20Ribeir%C3%A3o%20Pires!5e0!3m2!1spt-BR!2sbr!4v1757255115702!5m2!1spt-BR!2sbr"
          width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </section>
  );
}