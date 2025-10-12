import FormEntrar from "../components/FormEntrar/FormEntrar";

export default function Login() {
    const fields = [
        { id: "email", name: "email", label: "E-mail", type: "email", required: true },
        { id: "senha", name: "senha", label: "Senha", type: "password", required: true },
    ];

    const footerLinks = (
        <>
            <p><a href="esqueci_senha.html">Esqueceu a senha?</a></p>
            <p>Não tem conta? <a href="cadastro.html">Cadastre-se</a></p>
        </>
    );

    return (
        <main>
            <FormEntrar
                title="Entrar"
                fields={fields}
                buttonText="Entrar"
                footerLinks={footerLinks}
            />
        </main>
    );
}