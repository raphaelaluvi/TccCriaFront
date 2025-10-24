import styles from './FormEntrar.module.css';

export default function FormEntrar({ title, campos, textoBotao, links, onSubmit }) {
  return (
    <div className={styles.container}>
      {/* Bolhas flutuantes */}
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>
      <div className={styles.bolha}></div>

      {/* Formulário */}
      <div className={styles.formulario}>
        <h2>{title}</h2>
        <form onSubmit={onSubmit}>
          {campos.map((campo) => (
            <div key={campo.id}>
              <label htmlFor={campo.id}>{campo.label}</label>
              <input
                type={campo.type}
                id={campo.id}
                name={campo.name}
                placeholder={campo.placeholder}
                required={campo.required}
                minLength={campo.minLength}
                maxLength={campo.maxLength}
                inputMode={campo.inputMode}
                pattern={campo.pattern}
                onInput={campo.onInput}
              />
            </div>
          ))}

          <button type="submit" className={styles.btn}>
            {textoBotao}
          </button>
        </form>

        <div>{links}</div>
      </div>
    </div>
  );
}
