import { useEffect, useState } from "react";
import styles from "./CarrosselSobre.module.css";
import luana from "../../assets/luana.jpg";
import lucas from "../../assets/lucas.jpg";
import bolivia from "../../assets/bolivia.jpg";
import paulo from "../../assets/paulo.jpg";
import rapha from "../../assets/rapha.jpg";

const imagens = [luana, lucas, bolivia, paulo, rapha];

export default function Carrossel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}
