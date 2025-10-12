import FormEntrar from "../components/FormEntrar/FormEntrar";

export default function Cadastro() {
    const fields = [
        { id: "cpf", name: "cpf", label: "CPF", type: "text", placeholder: "000.000.000-00", required: true, minLength: 11, maxLength: 11 },
        { id: "nome", name: "nome", label: "Nome completo", type: "text", required: true },
        { id: "email", name: "email", label: "E-mail", type: "email", required: true },
        { id: "telefone", name: "telefone", label: "Telefone", type: "text", placeholder: "(00) 00000-0000", required: true },
        { id: "senha", name: "senha", label: "Senha", type: "password", required: true },
    ];

    const footerLinks = (
        <p>Já tem conta? <a href="login.html">Entre aqui</a></p>
    );

    return (
        <main>
            <FormEntrar
                title="Cadastre-se"
                fields={fields}
                buttonText="Cadastrar"
                footerLinks={footerLinks}
            />
        </main>
    );
}