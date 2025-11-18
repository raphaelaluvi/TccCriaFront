import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardTurma from "../components/CardTurma/CardTurma";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import Alert from "../components/Alert/Alert";
import { getDashboardRoute, getUser, logout } from "../services/auth";
import { listarTurmasDoProfessor } from "../services/professores";

export default function EscolherTurma() {
    const navigate = useNavigate();
    const [confirmarSair, setConfirmarSair] = useState(false);
    const [turmas, setTurmas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const carregar = useCallback(async (professorId) => {
        if (!professorId) return;
        setCarregando(true);
        setErro("");
        try {
            const lista = await listarTurmasDoProfessor(professorId);
            setTurmas(lista);
        } catch (e) {
            const d = e?.response?.data;
            setErro(d?.detail || d?.mensagem || "Não foi possível carregar as turmas.");
            setTurmas([]);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        const atual = getUser();
        if (!atual?.id) {
            navigate("/login");
            return;
        }
        if (atual?.tipo && atual.tipo !== "professor") {
            navigate(getDashboardRoute(atual.tipo));
            return;
        }
        carregar(atual.id);
    }, [navigate, carregar]);

    const links = [
        { label: "Suas turmas", to: "/escolherturma" },
        { label: "Sair", onClick: () => setConfirmarSair(true) },
    ];

    const handleSelect = (turma) => {
        if (!turma) return;
        const turmaId = turma.id || turma._id;
        if (turmaId) navigate(`/turma/${turmaId}`);
    };

    return (
        <div>
            <Header links={links} />
            {erro && (
                <div style={{ maxWidth: 900, margin: "20px auto", padding: "0 20px" }}>
                    <Alert type="error">{erro}</Alert>
                </div>
            )}
            {carregando ? (
                <main style={{ padding: "40px 20px", textAlign: "center" }}>
                    <p>Carregando turmas...</p>
                </main>
            ) : (
                <CardTurma turmas={turmas} onSelect={handleSelect} />
            )}
            {confirmarSair && (
                <Modal
                    title="Sair da conta?"
                    primaryText="Sair"
                    onPrimary={() => { setConfirmarSair(false); logout(); navigate("/login"); }}
                    onClose={() => setConfirmarSair(false)}
                >
                    <p>Tem certeza que deseja sair?</p>
                </Modal>
            )}
        </div>
    );
}
