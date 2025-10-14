import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/mini-logo.png";

export default function Header() {

  const [menuAtivo, setMenuAtivo] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.logoLink}>
          <img src={logo} alt="CriaKids Logo" className={styles.logoImg} />
        </NavLink>
      </div>

      <div className={styles["menu-toggle"]} onClick={() => setMenuAtivo(!menuAtivo)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav>
        <ul className={menuAtivo ? styles.active : ""}>
          <li>
            <NavLink to="/" className={styles.menu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/planos" className={styles.menu}>
              Planos
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" className={styles.menu}>
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink to="/contato" className={styles.menu}>
              Contatos
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.menu}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/cadastro" className={styles.menu}>
              Cadastro
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
