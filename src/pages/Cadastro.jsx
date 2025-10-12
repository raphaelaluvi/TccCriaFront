import { Link } from "react-router-dom";
import FormEntrar from "../components/FormEntrar/FormEntrar";

export default function Cadastro() {
    const campos = [
        { id: "cpf", name: "cpf", label: "CPF", type: "text", placeholder: "000.000.000-00", required: true, minLength: 11, maxLength: 11 },
        { id: "nome", name: "nome", label: "Nome completo", type: "text", required: true },
        { id: "email", name: "email", label: "E-mail", type: "email", required: true },
        { id: "telefone", name: "telefone", label: "Telefone", type: "text", placeholder: "(00) 00000-0000", required: true },
        { id: "senha", name: "senha", label: "Senha", type: "password", required: true },
    ];

    const links = (
        <p>Já tem conta? <Link to="/login">Entre aqui</Link></p>
    );

    return (
        <main>
            <FormEntrar
                title="Cadastre-se"
                campos={campos}
                textoBotao="Cadastrar"
                links={links}
            />
        </main>
    );
}