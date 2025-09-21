import styles from "./InfoPlano.module.css";

import familiaIcon from "../../assets/icon-familia.png";
import escolaIcon from "../../assets/icon-escola.png";
import criancasImg from "../../assets/img-criancaslivros.jpeg";

// Componente Card reutilizável
function Card({ title, icon, color, link }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.icon}>
        <img className={styles.icone} src={icon} alt={title} />
      </div>
      <h3>{title}</h3>
      <a href={link}>Veja Mais →</a>
    </div>
  );
}

export default function InfoPlano() {
  return (
    <div>
      {/* Seção Planos */}
      <section className={styles.programs}>
        <h2>
          Descubra Nossos <span>Planos Mensais</span>
        </h2>
        <div className={styles.cards}>
          <Card
            title="Plano Básico"
            icon={familiaIcon}
            color="pink"
            link="/planos"
          />
          <Card
            title="Plano Completo"
            icon={escolaIcon}
            color="purple"
            link="/planos"
          />
        </div>
      </section>

      {/* Seção Why Education */}
      <section className={styles.why}>
        <div className={styles["why-text"]}>
          <h2>
            Por que a <span>Alfabetização?</span>
          </h2>
          <p>
            A alfabetização é muito mais do que aprender a juntar letras e formar palavras.
            <br />
            É a porta de entrada para o conhecimento, a autonomia e a imaginação.
            <br />
            Quando a criança é alfabetizada:
          </p>

          <ul>
            <li>Desenvolve o raciocínio e a capacidade de resolver problemas.</li>
            <li>Amplia a comunicação e aprende a expressar sentimentos e ideias.</li>
            <li>Explora a criatividade, criando suas próprias histórias.</li>
            <li>Ganha confiança para interagir em casa, na escola e no mundo.</li>
            <li>Constrói bases sólidas para todos os aprendizados futuros.</li>
          </ul>

          <p>
            Investir na alfabetização desde cedo é oferecer ao seu filho uma ferramenta de transformação para a vida inteira.
          </p>
          <a href="/sobre" className={styles.btn}>
            Leia Mais
          </a>
        </div>
        <div className={styles["why-img"]}>
          <img src={criancasImg} alt="Crianças felizes" />
        </div>
      </section>
    </div>
  );
}