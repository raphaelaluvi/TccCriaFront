import styles from "./Infoplano.module.css";

import familiaIcon from "../../assets/planos/familia.png";
import escolaIcon from "../../assets/planos/escola.png";
import acordIcon from "../../assets/planos/acordo.png";
import imgFases from "../../assets/imgFases.png";

const fasesAlfabetizacao = [
  { 
    title: '1. Pré-Silábica', 
    description: 'A criança ainda não estabelece relação entre a escrita e a fala. A escrita pode aparecer como rabiscos ou desenhos.' 
  },
  { 
    title: '2. Silábica', 
    description: 'A criança atribui um valor sonoro a cada sílaba, mesmo que aleatório. Escrita tem o mesmo número de letras da pronúncia.' 
  },
  { 
    title: '3. Silábico-Alfabética', 
    description: 'Combinação de sons silábicos e alfabéticos. Algumas partes da palavra por sílaba, e outras, por sonoridade.' 
  },
  { 
    title: '4. Alfabética', 
    description: 'A criança compreende que a escrita representa os sons. Consegue escrever palavras de forma clara.' 
  },
];

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

function LinhaDoTempo() {
  return (
    <div className={styles["linhadotempo-wrapper"]}>
      {fasesAlfabetizacao.map((fase, index) => (
        <div key={index} className={styles["linhadotempo-item-alfa"]}>
          {/* O ponto é a chave visual */}
          <div className={styles["linhadotempo-dot-alfa"]}></div>
          
          <div className={styles["linhadotempo-content-alfa"]}>
            <h3 className={styles["linhadotempo-title-alfa"]}>{fase.title}</h3>
            <p className={styles["linhadotempo-description-alfa"]}>{fase.description}</p>
          </div>
          
          {/* Linha conectora, exceto para o último item */}
          {index < fasesAlfabetizacao.length - 1 && <div className={styles["linhadotempo-line-alfa"]}></div>}
        </div>
      ))}
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
          <Card
            title="Orçamento Escolar"
            icon={acordIcon}
            color="green"
            link="/contato"
          />
        </div>
      </section>

      {/* Seção Why Education */}
      <section className={styles.why}>
        <div className={styles["why-text"]}>
          <h2>
            Por que a <span>alfabetização?</span>
          </h2>
          <p>
            A alfabetização é muito mais do que aprender a juntar letras e formar palavras.
            <br />
            É a porta de entrada para o conhecimento, a autonomia e a imaginação.
            <br />
          </p>
        </div>
        <div className={styles["why-img"]}>
          <img src={imgFases} alt="Animal feliz porque sabe ler" />
        </div>

        <div className={styles["alfabetizacao-fases-container"]}>
            <h2 className={styles["fases-title"]}> 
                Fases da <span>alfabetização </span>
            </h2>
            {/* INSERÇÃO DO COMPONENTE AQUI */}
            <LinhaDoTempo /> 
        </div>

      </section>
    </div>
  );
}