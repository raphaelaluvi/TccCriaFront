import { Link } from "react-router-dom";
import FormEntrar from "../components/FormEntrar/FormEntrar";

export default function Login() {
    const campos = [
        { id: "email", name: "email", label: "E-mail", type: "email", required: true },
        { id: "senha", name: "senha", label: "Senha", type: "password", required: true },
    ];

    const links = (
        <>
            <p><a href="esqueci_senha.html">Esqueceu a senha?</a></p>
            <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </>
    );

    return (
        <main>
            <FormEntrar
                title="Entrar"
                campos={campos}
                textoBotao="Entrar"
                links={links}
            />
        </main>
    );
}