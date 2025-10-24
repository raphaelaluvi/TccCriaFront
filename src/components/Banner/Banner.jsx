import styles from "./Banner.module.css";
import banner from "../../assets/logoSemfundo.png";

export default function Banner() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h3>Bem-vindo ao Criakids!</h3>
        <h1>Aprenda e se divirta!</h1>
        <p>
          Inscreva-se e conheça como aprender de forma lúdica pode transformar o aprendizado do seu filho.
        </p>
        <a href="/cadastro" className={styles.btn}>Cadastre-se!</a>
      </div>

      <div className={styles.heroImage}>
        <img src={banner} alt="Logo Criakids" />
        <div className={styles.floatingExtra}></div>
      </div>
    </section>
  );
}

