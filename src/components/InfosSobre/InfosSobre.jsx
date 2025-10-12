import { useEffect, useState } from "react";
import styles from "./InfosSobre.module.css";

import luana from "../../assets/luana.jpg";
import lucas from "../../assets/lucas.jpg";
import bolivia from "../../assets/bolivia.jpg";
import paulo from "../../assets/paulo.jpg";
import rapha from "../../assets/rapha.jpg";

const imagens = [luana, lucas, bolivia, paulo, rapha];

export default function InfoSobre() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.infoSobre}>
      <div className={styles.carrossel}>
        {imagens.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Integrante ${i + 1}`}
            className={`${styles.imagem} ${i === index ? styles.active : ""}`}
          />
        ))}
      </div>
      <div className={styles.texto}>
        <h2>Nossa História</h2>
        <p>
          Somos estudantes do 3º ano do Ensino Médio Integrado ao Técnico em
          Informática para Internet da Etec Professora Maria Cristina Medeiros,
          movidos pela ideia de que a tecnologia pode transformar a forma de
          aprender...
        </p>

        <h2>Nosso Propósito</h2>
        <p>
          Nosso propósito é contribuir com a educação de forma criativa e
          acessível, oferecendo uma ferramenta digital que apoie pais,
          professores e, principalmente, as crianças...
        </p>
      </div>
    </section>
  );
}
