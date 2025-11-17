import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormEntrar from "../components/FormEntrar/FormEntrar";
import { cadastrarResponsavel } from "../services/auth";
import Modal from "../components/Modal/Modal";

export default function Cadastro() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    // NOVO: tipo de usuário
    const [tipoUsuario, setTipoUsuario] = useState("responsavel");

    const maskCPF = (v) => {
        v = (v || "").replace(/\D/g, "").slice(0, 11);
        if (v.length > 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
        if (v.length > 6) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
        if (v.length > 3) return `${v.slice(0, 3)}.${v.slice(3)}`;
        return v;
    };

    const maskTelefone = (v) => {
        v = (v || "").replace(/\D/g, "").slice(0, 11);
        if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
        if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
        if (v.length > 0) return `(${v}`;
        return v;
    };

    // CAMPOS DINÂMICOS
    const campos = [
        {
            id: "tipoUsuario",
            name: "tipoUsuario",
            type: "radio-group",
            required: true,
            options: [
                { value: "responsavel", label: "Responsável" },
                { value: "professor", label: "Professor" },
                { value: "escola", label: "Escola" },
            ],
            onChange: (e) => setTipoUsuario(e.target.value),
        },

        // RESPONSÁVEL + PROFESSOR
        ...(tipoUsuario !== "escola"
            ? [
                  {
                      id: "cpf",
                      name: "cpf",
                      label: "CPF",
                      type: "text",
                      placeholder: "000.000.000-00",
                      required: true,
                      maxLength: 14,
                      inputMode: "numeric",
                      onInput: (e) => { e.target.value = maskCPF(e.target.value); },
                  },
                  { id: "nome", name: "nome", label: "Nome completo", type: "text", required: true },
                  { id: "email", name: "email", label: "E-mail", type: "email", required: true },
                  {
                      id: "telefone",
                      name: "telefone",
                      label: "Telefone",
                      type: "text",
                      placeholder: "(00) 00000-0000",
                      required: true,
                      maxLength: 15,
                      inputMode: "numeric",
                      onInput: (e) => { e.target.value = maskTelefone(e.target.value); },
                  },

                  // CAMPOS EXTRAS PARA PROFESSOR
                  ...(tipoUsuario === "professor"
                      ? [
                            { id: "escola", name: "escola", label: "Escola", type: "text", required: true },
                            { id: "turma", name: "turma", label: "Turma", type: "text", required: true },
                        ]
                      : []),
              ]
            : []),

        // CAMPOS EXCLUSIVOS PARA ESCOLA
        ...(tipoUsuario === "escola"
            ? [
                  {
                      id: "nomeInstituicao",
                      name: "nomeInstituicao",
                      label: "Nome da instituição",
                      type: "text",
                      required: true
                  },
                  {
                      id: "tipoInstituicao",
                      name: "tipoInstituicao",
                      type: "radio-group",
                      required: true,
                      options: [
                          { value: "publica", label: "Pública" },
                          { value: "privada", label: "Privada" }
                      ]
                  },
                  {
                      id: "telefone",
                      name: "telefone",
                      label: "Telefone",
                      type: "text",
                      required: true,
                      maxLength: 15,
                      inputMode: "numeric",
                      onInput: (e) => { e.target.value = maskTelefone(e.target.value); },
                  },
                  { id: "email", name: "email", label: "E-mail", type: "email", required: true },
              ]
            : []),

        // SENHA (sempre existe)
        {
            id: "senha",
            name: "senha",
            label: "Senha",
            type: "password",
            required: true
        },
    ];

    const links = (
        <p>Já tem conta? <Link to="/login">Entre aqui</Link></p>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setLoading(true);

        try {
            const f = e.currentTarget;
            const senha = f.senha?.value;

            if (!senha || senha.length < 6) {
                throw new Error("A senha deve ter ao menos 6 caracteres");
            }

            // RESPONSÁVEL
            if (tipoUsuario === "responsavel") {
                const cpf = (f.cpf?.value || '').replace(/\D/g, '');
                const nome = f.nome?.value?.trim();
                const email = f.email?.value?.trim();
                const telefone = (f.telefone?.value || '').replace(/\D/g, '');

                await cadastrarResponsavel({ cpf, nome, email, telefone, senha });
            }

            // PROFESSOR
            if (tipoUsuario === "professor") {
                const cpf = (f.cpf?.value || '').replace(/\D/g, '');
                const nome = f.nome?.value?.trim();
                const email = f.email?.value?.trim();
                const telefone = (f.telefone?.value || '').replace(/\D/g, '');
                const escola = f.escola?.value?.trim();
                const turma = f.turma?.value?.trim();

                if (!escola || !turma)
                    throw new Error("Preencha escola e turma");

                await cadastrarResponsavel({
                    tipo: "professor",
                    cpf,
                    nome,
                    email,
                    telefone,
                    escola,
                    turma,
                    senha,
                });
            }

            // ESCOLA
            if (tipoUsuario === "escola") {
                const nomeInstituicao = f.nomeInstituicao?.value?.trim();
                const tipoInstituicao = f.tipoInstituicao?.value;
                const telefone = (f.telefone?.value || '').replace(/\D/g, '');
                const email = f.email?.value?.trim();

                await cadastrarResponsavel({
                    tipo: "escola",
                    nomeInstituicao,
                    tipoInstituicao,
                    telefone,
                    email,
                    senha,
                });
            }

            setSucesso(true);
        } catch (err) {
            const d = err?.response?.data;
            const msg = d?.detail || d?.mensagem || err?.message || 'Erro no cadastro';
            setErro(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <FormEntrar
                title="Cadastre-se"
                campos={campos}
                textoBotao="Cadastrar"
                links={links}
                onSubmit={handleSubmit}
            />

            {erro && <p style={{ color: 'red', marginTop: 12 }}>{erro}</p>}
            {loading && <p style={{ marginTop: 8 }}>Cadastrando...</p>}

            {sucesso && (
                <Modal
                    title="Cadastro realizado!"
                    primaryText="Ok"
                    onClose={() => { setSucesso(false); navigate('/login'); }}
                    onPrimary={() => { setSucesso(false); navigate('/login'); }}
                >
                    <p>Seu cadastro foi concluído com sucesso.</p>
                </Modal>
            )}
        </main>
    );
}
