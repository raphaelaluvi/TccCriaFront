import styles from './LoginForm.module.css';

export default function Login() {
    return (
        <div className={styles.formulario}>
            <h2>Entrar</h2>
            <form>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" name="senha" required />

                <button type="submit" className={styles.btn}>Entrar</button>
            </form>

            <p><a href="esqueci_senha.html">Esqueceu a senha?</a></p>
            <p>Não tem conta? <a href="cadastro.html">Cadastre-se</a></p>
        </div>
    );
}