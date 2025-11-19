import { useEffect, useState } from "react";
import styles from "./InfosSobre.module.css";

import luana from "../../assets/nos/luana.jpg";
import lucas from "../../assets/nos/lucas.jpg";
import bolivia from "../../assets/nos/bolivia.jpg";
import paulo from "../../assets/nos/paulo.jpg";
import rapha from "../../assets/nos/rapha.jpg";

const imagens = [luana, lucas, bolivia, paulo, rapha];

export default function InfoSobre() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Mantém a animação de índice para o destaque
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.infoSobre}>
      <div className={styles.galeriaContainer}>
        <div className={styles.galeriaGrid}>
          {imagens.map((img, i) => (
            <div 
              key={i} 
              className={styles.galeriaItem} // Removemos 'itemCentral', ele será tratado pelo CSS Grid
            >
              <img
                src={img}
                alt={`Integrante ${i + 1}`}
                className={`${styles.imagem} ${i === index ? styles.active : ""}`}
              />
            </div>
          ))}
        </div>
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
