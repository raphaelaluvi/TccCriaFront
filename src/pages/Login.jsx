import { Link, useNavigate } from "react-router-dom";
import FormEntrar from "../components/FormEntrar/FormEntrar";
import { login as loginApi, getDashboardRoute } from "../services/auth";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);
    const [erros, setErros] = useState({
        email: "",
        senha: "",
        tipo: "",
    });

    const [tipo, setTipo] = useState("responsavel");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErros({ email: "", senha: "", tipo: "" }); // Limpar erros anteriores
        // setLoading(true);
        try {
            const form = e.currentTarget;
            const email = form.email?.value?.trim();
            const senha = form.senha?.value;
            const tipoSelecionado = form.tipo?.value || tipo;

            // Validação de campos
            const newErros = { email: "", senha: "", tipo: "" };
            if (!email) {
                newErros.email = "O e-mail é obrigatório.";
            }
            if (!senha) {
                newErros.senha = "A senha é obrigatória.";
            }
            if (!tipoSelecionado) {
                newErros.tipo = "Selecione o tipo.";
            }

            if (newErros.email || newErros.senha || newErros.tipo) {
                setErros(newErros); // Atualiza o estado com os erros
                return;
            }

            await loginApi(email, senha, tipoSelecionado);
            navigate(getDashboardRoute(tipoSelecionado));
        } catch (err) {
            const d = err?.response?.data;
            const msg = d?.detail || d?.mensagem || err?.message || "Erro ao entrar";
            setErros({ ...erros, email: msg }); // Exemplo de como adicionar uma mensagem de erro geral
        } finally {
            // setLoading(false);
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
                erros={erros}  // Passando os erros para o FormEntrar
            />
        </main>
    );
}
