import styles from "./Banner.module.css";
import banner from "../../assets/Banner-Criakids.png";

export default function Banner() {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${banner})` }}>
      <div className={styles.heroText}>
        <h1>Aprenda e se divirta!</h1>
        <p>Inscreva-se e conheça como aprender de forma lúdica pode transformar o aprendizado do seu filho.</p>
        <a href="/cadastro" className={styles.btn}>Cadastre-se!</a>
      </div>

      <svg className={styles.wave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
        <path fill="#fff" fillOpacity="1"
          d="M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,101.3C672,85,768,75,864,74.7C960,75,1056,85,1152,106.7C1248,128,1344,160,1392,176L1440,192L1440,0L0,0Z">
        </path>
      </svg>
    </section>
  );
}
