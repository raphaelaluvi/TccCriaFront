import styles from './CadastroForm.module.css';

export default function Cadastro() {
    return (
        <div className={styles.formulario}>
            <h2>Cadastre-se</h2>
            <form>
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required minLength="11" maxLength="11" />

                <label htmlFor="nome">Nome completo</label>
                <input type="text" id="nome" name="nome" required />

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="telefone">Telefone</label>
                <input type="text" id="telefone" name="telefone" required placeholder="(00) 00000-0000" />

                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" name="senha" required />

                <button type="submit" className={styles.btn}>Cadastrar</button>
            </form>

            <p>Já tem conta? <a href="login.html">Entre aqui</a></p>
        </div>
    )
}