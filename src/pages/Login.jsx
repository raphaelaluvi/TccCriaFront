import { Link, useNavigate } from "react-router-dom";
import FormEntrar from "../components/FormEntrar/FormEntrar";
import { login as loginApi } from "../services/auth";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setLoading(true);
        try {
            const form = e.currentTarget;
            const email = form.email?.value?.trim();
            const senha = form.senha?.value;
            if (!email || !senha) {
                setErro("Preencha e-mail e senha.");
                return;
            }
            await loginApi(email, senha);
            navigate("/escolhercriancas");
        } catch (err) {
            const d = err?.response?.data;
            const msg = d?.detail || d?.mensagem || err?.message || "Erro ao entrar";
            setErro(msg);
        } finally {
            setLoading(false);
        }
    };
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
                onSubmit={handleSubmit}
            />
            {erro && <p style={{ color: 'red', marginTop: 12 }}>{erro}</p>}
            {loading && <p style={{ marginTop: 8 }}>Entrando...</p>}
        </main>
    );
}
