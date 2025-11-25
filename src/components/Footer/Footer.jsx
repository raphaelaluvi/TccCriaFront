import styles from "./Footer.module.css";

// Ícones podem ser SVG ou imagens pequenas, aqui usamos Unicode/emoji ou você pode trocar por ícones reais
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/* Contato */}
        <div className={styles.section}>
          <h3>Contato</h3>
          <p>Rua Bélgica, 88, Jardim Alvorada, Ribeirão Pires - SP, CEP 09402-060</p>
          <p>Telefone: (11) 9999-9999</p>
          <p>Email: tcccriakids@gmail.com</p>
        </div>

        {/* Links importantes */}
        <div className={styles.section}>
          <h3>Links úteis</h3>
          <ul>
            <li><a href="/sobre">Sobre nós</a></li>
            <li><a href="/planos">Planos</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/privacidade">Política de Privacidade</a></li>
          </ul>
        </div>

      </div>

      {/* Direitos autorais */}
      <div className={styles.copyright}>
        © 2025 CriaKids. Todos os direitos reservados.
      </div>
    </footer>
  );
}
