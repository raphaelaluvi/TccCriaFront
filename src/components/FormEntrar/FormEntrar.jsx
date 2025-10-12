import styles from './FormEntrar.module.css';

export default function FormEntrar({ title, fields, buttonText, footerLinks }) {
  return (
    <div className={styles.formulario}>
      <h2>{title}</h2>
      <form>
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              minLength={field.minLength}
              maxLength={field.maxLength}
            />
          </div>
        ))}

        <button type="submit" className={styles.btn}>
          {buttonText}
        </button>
      </form>

      <div className={styles.footer}>
        {footerLinks}
      </div>
    </div>
  );
}