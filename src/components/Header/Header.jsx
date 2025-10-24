import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/mini-logo.png";
const defaultPublicLinks = [
  { label: 'Home', to: '/' },
  { label: 'Planos', to: '/planos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contatos', to: '/contato' },
  { label: 'Login', to: '/login' },
  { label: 'Cadastro', to: '/cadastro' },
];

export default function Header({ links: propLinks }) {

  const [menuAtivo, setMenuAtivo] = useState(false);
  const links = useMemo(() => propLinks ?? defaultPublicLinks, [propLinks]);

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
          {links.map((item, idx) => (
            <li key={idx}>
              {item.to ? (
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `${styles.menu} ${isActive ? styles.menuActive : ''}`}
                  onClick={() => setMenuAtivo(false)}
                >
                  {item.label}
                </NavLink>
              ) : (
                <button className={`${styles.menu} ${styles.menuButton}`} onClick={item.onClick}>
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
