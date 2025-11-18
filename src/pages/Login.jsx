import { Link, useNavigate } from "react-router-dom";
import FormEntrar from "../components/FormEntrar/FormEntrar";
import { login as loginApi, getDashboardRoute } from "../services/auth";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [tipo, setTipo] = useState("responsavel");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setLoading(true);
        try {
            const form = e.currentTarget;
            const email = form.email?.value?.trim();
            const senha = form.senha?.value;
            const tipoSelecionado = form.tipo?.value || tipo;
            if (!email || !senha) {
                setErro("Preencha e-mail e senha.");
                return;
            }
            await loginApi(email, senha, tipoSelecionado);
            navigate(getDashboardRoute(tipoSelecionado));
        } catch (err) {
            const d = err?.response?.data;
            const msg = d?.detail || d?.mensagem || err?.message || "Erro ao entrar";
            setErro(msg);
        } finally {
            setLoading(false);
        }
    };
    const campos = [
        {
            id: "tipo",
            name: "tipo",
            label: "Entrar como",
            type: "select",
            required: true,
            value: tipo,
            onChange: (e) => setTipo(e.target.value),
            options: [
                { value: "responsavel", label: "Responsável" },
                { value: "professor", label: "Professor" },
                { value: "escola", label: "Escola" },
            ],
        },
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
