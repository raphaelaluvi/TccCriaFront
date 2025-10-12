import styles from "./SobreTexto.module.css";

export default function SobreTexto() {
  return (
    <div className={styles.sobre}>
      <div>
        <h2>Nossa História</h2>
        <p>
          Somos estudantes do 3º ano do Ensino Médio Integrado ao Técnico em
          Informática para Internet da Etec Professora Maria Cristina Medeiros,
          movidos pela ideia de que a tecnologia pode transformar a forma de
          aprender...
        </p>
      </div>

      <div>
        <h2>Nosso Propósito</h2>
        <p>
          Nosso propósito é contribuir com a educação de forma criativa e
          acessível, oferecendo uma ferramenta digital que apoie pais,
          professores e, principalmente, as crianças...
        </p>
      </div>
    </div>
  );
}