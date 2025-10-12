import styles from './FormEntrar.module.css';

export default function FormEntrar({ title, campos, textoBotao, links }) {
  return (
    <div className={styles.formulario}>
      <h2>{title}</h2>
      <form>
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
            />
          </div>
        ))}

        <button type="submit" className={styles.btn}>
          {textoBotao}
        </button>
      </form>

      <div>
        {links}
      </div>
    </div>
  );
}