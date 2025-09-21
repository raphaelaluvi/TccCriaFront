import styles from "./Header.module.css";
import logo from "../../assets/mini-logo.png";

export default function Header() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/home">
          <img src={logo} alt="CriaKids Logo" className={styles.logoImg} />
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="/home" className={styles.active}>Home</a></li>
          <li><a href="/sobre">Sobre Nós</a></li>
          <li><a href="/planos">Planos</a></li>
          <li><a href="/contato">Contatos</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/cadastro">Cadastro</a></li>
        </ul>
      </nav>
    </header>
  );
}