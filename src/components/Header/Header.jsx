import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/mini-logo.png";

export default function Header() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img src={logo} alt="CriaKids Logo" className={styles.logoImg} />
        </NavLink>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" className={({ isActive }) => isActive ? styles.active : ""}>
              Sobre Nós
            </NavLink>
            
          </li>
          <li>
            <NavLink to="/planos" className={({ isActive }) => isActive ? styles.active : ""}>
              Planos
            </NavLink>
          </li>
          <li>
            <NavLink to="/contato" className={({ isActive }) => isActive ? styles.active : ""}>
              Contatos
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ""}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/cadastro" className={({ isActive }) => isActive ? styles.active : ""}>
              Cadastro
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
