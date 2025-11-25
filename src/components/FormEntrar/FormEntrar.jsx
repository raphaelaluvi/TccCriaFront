import styles from './FormEntrar.module.css';

export default function FormEntrar({ title, campos, textoBotao, links, onSubmit, erros = {} }) {
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
          {campos.map((campo) => {
            const valueProps = {};
            if (campo.value !== undefined) {
              valueProps.value = campo.value;
            } else if (campo.defaultValue !== undefined) {
              valueProps.defaultValue = campo.defaultValue;
            }

            // ⬇️ Função para exibir erro do campo
            const erroCampo = erros[campo.name];

            if (campo.type === "radio-group") {
              const selectedValue = campo.value;
              const defaultValue = campo.defaultValue;
              return (
                <div key={campo.id} className={styles.radioGroup}>
                  <label className={styles.radioLabel}>{campo.label}</label>
                  <div className={styles.radioOptions}>
                    {campo.options.map((opt) => {
                      const radioProps = {};
                      if (selectedValue !== undefined) {
                        radioProps.checked = selectedValue === opt.value;
                      } else if (defaultValue !== undefined) {
                        radioProps.defaultChecked = defaultValue === opt.value;
                      }
                      return (
                        <label key={opt.value} className={styles.radioItem}>
                          <input
                            type="radio"
                            name={campo.name}
                            value={opt.value}
                            required={campo.required}
                            onChange={campo.onChange}
                            disabled={campo.disabled}
                            {...radioProps}
                          />
                          <span>{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                  {erroCampo && (
                    <p className={styles.erro}>{erroCampo}</p>
                  )}
                </div>
              );
            }

            if (campo.type === "select") {
              return (
                <div key={campo.id}>
                  <label htmlFor={campo.id}>{campo.label}</label>
                  <select
                    id={campo.id}
                    name={campo.name}
                    required={campo.required}
                    onChange={campo.onChange}
                    disabled={campo.disabled}
                    style={campo.style}
                    {...valueProps}
                  >
                    {(campo.options || []).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {/* ⬇️ EXIBIR ERRO DO SELECT */}
                  {erroCampo && (
                    <p className={styles.erro}>{erroCampo}</p>
                  )}
                </div>
              );
            }

            return (
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
                  onChange={campo.onChange}
                  disabled={campo.disabled}
                  autoComplete={campo.autoComplete}
                  style={campo.style}
                  {...valueProps}
                />

                {/* ⬇️ EXIBIR ERRO DO INPUT */}
                {erroCampo && (
                  <p className={styles.erro}>{erroCampo}</p>
                )}
              </div>
            );
          })}

          {erros.geral && (
            <p className={styles.erro}>{erros.geral}</p>
          )}

          <button type="submit" className={styles.btn}>
            {textoBotao}
          </button>
        </form>

        <div>{links}</div>
      </div>
    </div>
  );
}
