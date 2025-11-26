import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Alert from "../components/Alert/Alert";
import styles from "../components/ProgressoDados/ProgressoDados.module.css";
import CardEscola from "../components/CardEscola/CardEscola";
import stylesCard from "../components/CardEscola/CardEscola.module.css";

import { getDashboardRoute, getUser, logout } from "../services/auth";
import {
  listarProfessoresDaEscola,
  cadastrarProfessor,
  atualizarProfessor,
  deletarProfessor,
} from "../services/professores";
import {
  listarTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma,
} from "../services/turmas";
import {
  cadastrarCrianca,
  listarCriancasDaEscola,
} from "../services/criancas";

const formatCPF = (value) => {
  const v = (value || "").replace(/\D/g, "").slice(0, 11);
  if (v.length > 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
  if (v.length > 6) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  if (v.length > 3) return `${v.slice(0, 3)}.${v.slice(3)}`;
  return v;
};

const formatTelefone = (value) => {
  const v = (value || "").replace(/\D/g, "").slice(0, 11);
  if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length > 0) return `(${v}`;
  return v;
};

const digits = (value, limit) => (value || "").replace(/\D/g, "").slice(0, limit);

// Estilo de input inline original (não mais usado nos modais)
const inputStyle = {
  width: "100%", /* Faz o input ocupar 100% da largura do contêiner pai (.modal) */
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  boxSizing: "border-box", /* **Crucial:** Garante que padding e border sejam incluídos na largura de 100% */
  fontSize: "1rem",
  fontFamily: "inherit",
  /* Você pode adicionar estilos específicos da sua aplicação, como a cor de fundo */
  backgroundColor: "#f7f3f9",
};

export default function PainelEscola() {
  const navigate = useNavigate();
  const [confirmarSair, setConfirmarSair] = useState(false);
  const [aba, setAba] = useState("professores");
  const [usuario, setUsuario] = useState(() => getUser());
  const [escolaId, setEscolaId] = useState(() => getUser()?.id || null);

  // Professores
  const [professores, setProfessores] = useState([]);
  const [carregandoProfessores, setCarregandoProfessores] = useState(true);
  const [erroProfessores, setErroProfessores] = useState("");
  const [modalProfessor, setModalProfessor] = useState(false);
  const [editandoProfessor, setEditandoProfessor] = useState(null);
  const [formProfessor, setFormProfessor] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
  });
  const [salvandoProfessor, setSalvandoProfessor] = useState(false);
  const [mensagemModalProfessor, setMensagemModalProfessor] = useState("");
  const [professorParaExcluir, setProfessorParaExcluir] = useState(null);
  const [removendoProfessor, setRemovendoProfessor] = useState(false);
  const [erroExcluirProfessor, setErroExcluirProfessor] = useState("");

  // Turmas
  const [turmas, setTurmas] = useState([]);
  const [carregandoTurmas, setCarregandoTurmas] = useState(true);
  const [erroTurmas, setErroTurmas] = useState("");
  const [modalTurma, setModalTurma] = useState(false);
  const [editandoTurma, setEditandoTurma] = useState(null);
  const [formTurma, setFormTurma] = useState({
    nome: "",
    descricao: "",
    nivel: "",
    turno: "",
    professores: [],
  });
  const [salvandoTurma, setSalvandoTurma] = useState(false);
  const [erroModalTurma, setErroModalTurma] = useState("");
  const [turmaParaExcluir, setTurmaParaExcluir] = useState(null);
  const [removendoTurma, setRemovendoTurma] = useState(false);
  const [erroExcluirTurma, setErroExcluirTurma] = useState("");

  // Crianças
  const [criancas, setCriancas] = useState([]);
  const [carregandoCriancas, setCarregandoCriancas] = useState(true);
  const [erroCriancas, setErroCriancas] = useState("");
  const [modalCrianca, setModalCrianca] = useState(false);
  const [formCrianca, setFormCrianca] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    tipo_escola: "publica",
    turma_id: "",
    professor_id: "",
    responsavel_nome: "",
    responsavel_cpf: "",
    responsavel_email: "",
    responsavel_telefone: "",
    responsavel_senha: "",
  });
  const [salvandoCrianca, setSalvandoCrianca] = useState(false);
  const [erroModalCrianca, setErroModalCrianca] = useState("");

  const carregarProfessores = useCallback(async (id) => {
    if (!id) return;
    setCarregandoProfessores(true);
    setErroProfessores("");
    try {
      const lista = await listarProfessoresDaEscola(id); // <-- chamada correta
      console.log("DEBUG listarProfessoresDaEscola:", lista);
      setProfessores(Array.isArray(lista) ? lista : (lista && Array.isArray(lista.professores) ? lista.professores : []));
    } catch (e) {
      console.error("Erro ao carregar professores", e);
      const d = e?.response?.data;
      setErroProfessores(d?.detail || d?.mensagem || "Erro ao listar professores.");
      setProfessores([]);
    } finally {
      setCarregandoProfessores(false);
    }
  }, []);


  const carregarTurmas = useCallback(async (id) => {
    if (!id) return;
    setCarregandoTurmas(true);
    setErroTurmas("");
    try {
      const lista = await listarTurmas({ escolaId: id });
      setTurmas(Array.isArray(lista) ? lista : []);
    } catch (e) {
      if (e?.response?.status === 404) {
        setTurmas([]);
        setErroTurmas("");
      } else {
        const d = e?.response?.data;
        setErroTurmas(d?.detail || d?.mensagem || "Erro ao listar turmas.");
        setTurmas([]);
      }
    } finally {
      setCarregandoTurmas(false);
    }
  }, []);

  const carregarCriancas = useCallback(async (id) => {
    if (!id) return;
    setCarregandoCriancas(true);
    setErroCriancas("");
    try {
      const lista = await listarCriancasDaEscola(id);
      setCriancas(Array.isArray(lista) ? lista : []);
    } catch (e) {
      if (e?.response?.status === 404) {
        setCriancas([]);
        setErroCriancas("");
      } else {
        const d = e?.response?.data;
        setErroCriancas(d?.detail || d?.mensagem || "Erro ao listar crianças.");
        setCriancas([]);
      }
    } finally {
      setCarregandoCriancas(false);
    }
  }, []);

  useEffect(() => {
    const atual = getUser();
    if (!atual?.id) {
      navigate("/login");
      return;
    }
    if (atual?.tipo && atual.tipo !== "escola") {
      navigate(getDashboardRoute(atual.tipo));
      return;
    }
    setUsuario(atual);
    setEscolaId(atual.id);
    carregarProfessores(atual.id);
    carregarTurmas(atual.id);
    carregarCriancas(atual.id);
  }, [navigate, carregarProfessores, carregarTurmas, carregarCriancas]);

  const links = useMemo(() => ([
    { label: "Dashboard", to: "/painel-escola" },
    { label: "Sair", onClick: () => setConfirmarSair(true) },
  ]), []);
  const nomeEscola = usuario?.nome || usuario?.nomeInstituicao || "Escola";

  const mapaProfessores = useMemo(() => {
  const map = {};
  professores.forEach((p) => {
    const key = p.id || p._id || (p._id && p._id.$oid) || "";
    map[key] = p.nome || p.nomeCompleto || "-";
  });
  return map;
}, [professores]);


  const mapaCriancasPorTurma = useMemo(() => {
    const map = {};
    criancas.forEach((c) => {
      if (!c.turma_id) return;
      map[c.turma_id] = (map[c.turma_id] || 0) + 1;
    });
    return map;
  }, [criancas]);

  const mapaTurmas = useMemo(() => {
    const map = {};
    turmas.forEach((t) => { map[t.id] = t.nome; });
    return map;
  }, [turmas]);

  // --- Professores ---
  const abrirCadastroProfessor = () => {
    setEditandoProfessor(null);
    setFormProfessor({ nome: "", cpf: "", email: "", telefone: "", senha: "" });
    setMensagemModalProfessor("");
    setModalProfessor(true);
  };

  const abrirEdicaoProfessor = (prof) => {
    setEditandoProfessor(prof);
    setFormProfessor({
      nome: prof.nome || "",
      cpf: formatCPF(prof.cpf),
      email: prof.email || "",
      telefone: formatTelefone(prof.telefone),
      senha: "",
    });
    setMensagemModalProfessor("");
    setModalProfessor(true);
  };

  const handleChangeProfessor = (e) => {
    const { name, value } = e.target;
    let nextValue = value;
    if (name === "cpf") nextValue = formatCPF(value);
    if (name === "telefone") nextValue = formatTelefone(value);
    setFormProfessor((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSalvarProfessor = async () => {
    if (salvandoProfessor || !escolaId) return;
    setSalvandoProfessor(true);
    setMensagemModalProfessor("");
    try {
      const nome = formProfessor.nome?.trim();
      const email = formProfessor.email?.trim();
      const telefoneDigits = digits(formProfessor.telefone, 11);
      if (!nome || !email || telefoneDigits.length < 10) {
        throw new Error("Preencha nome, email e telefone válidos.");
      }

      if (!editandoProfessor) {
        const cpfDigits = digits(formProfessor.cpf, 11);
        if (cpfDigits.length !== 11) throw new Error("CPF precisa ter 11 dígitos.");
        if (!formProfessor.senha || formProfessor.senha.length < 6) {
          throw new Error("Defina uma senha com pelo menos 6 caracteres.");
        }
        const payload = {
          nome,
          cpf: cpfDigits,
          email,
          telefone: telefoneDigits,
          senha: formProfessor.senha,
          escola_id: escolaId,
        };
        const novo = await cadastrarProfessor(payload);
        setProfessores((prev) => [...prev, novo]);
      } else {
        const payload = { nome, email, telefone: telefoneDigits };
        const atualizado = await atualizarProfessor(editandoProfessor.id, payload);
        setProfessores((prev) => prev.map((p) => (p.id === atualizado.id ? atualizado : p)));
      }
      setModalProfessor(false);
    } catch (e) {
      const d = e?.response?.data;
      setMensagemModalProfessor(d?.detail || d?.mensagem || e.message || "Não foi possível salvar.");
    } finally {
      setSalvandoProfessor(false);
    }
  };

  const confirmarExclusaoProfessor = (prof) => {
    setProfessorParaExcluir(prof);
    setErroExcluirProfessor("");
  };

  const handleRemoverProfessor = async () => {
    if (!professorParaExcluir || removendoProfessor) return;
    setRemovendoProfessor(true);
    setErroExcluirProfessor("");
    try {
      await deletarProfessor(professorParaExcluir.id);
      setProfessores((prev) => prev.filter((p) => p.id !== professorParaExcluir.id));
      setProfessorParaExcluir(null);
    } catch (e) {
      const d = e?.response?.data;
      setErroExcluirProfessor(d?.detail || d?.mensagem || "Não foi possível remover.");
    } finally {
      setRemovendoProfessor(false);
    }
  };

  // --- Turmas ---
  const abrirCadastroTurma = () => {
    setEditandoTurma(null);
    setFormTurma({
      nome: "",
      descricao: "",
      nivel: "",
      turno: "",
      professores: [],
    });
    setErroModalTurma("");
    setModalTurma(true);
  };

  const abrirEdicaoTurma = (turma) => {
    setEditandoTurma(turma);
    setFormTurma({
      nome: turma.nome || "",
      descricao: turma.descricao || "",
      nivel: turma.nivel || "",
      turno: turma.turno || "",
      professores: Array.isArray(turma.professores) ? turma.professores : [],
    });
    setErroModalTurma("");
    setModalTurma(true);
  };

  const handleChangeTurma = (e) => {
    const { name, value } = e.target;
    setFormTurma((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfessoresTurma = (e) => {
    const valores = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormTurma((prev) => ({ ...prev, professores: valores }));
  };

  const handleSalvarTurma = async () => {
    if (salvandoTurma || !escolaId) return;
    setSalvandoTurma(true);
    setErroModalTurma("");
    try {
      const nome = formTurma.nome?.trim();
      if (!nome) throw new Error("Informe o nome da turma.");
      const payloadBase = {
        nome,
        descricao: formTurma.descricao?.trim() || undefined,
        nivel: formTurma.nivel?.trim() || undefined,
        turno: formTurma.turno?.trim() || undefined,
        professores: (formTurma.professores || []).filter(Boolean),
      };
      if (!editandoTurma) {
        const nova = await criarTurma({ ...payloadBase, escola_id: escolaId });
        setTurmas((prev) => [...prev, nova]);
      } else {
        const atualizada = await atualizarTurma(editandoTurma.id, payloadBase);
        setTurmas((prev) => prev.map((t) => (t.id === atualizada.id ? atualizada : t)));
      }
      setModalTurma(false);
      carregarCriancas(escolaId);
    } catch (e) {
      const d = e?.response?.data;
      setErroModalTurma(d?.detail || d?.mensagem || e.message || "Não foi possível salvar a turma.");
    } finally {
      setSalvandoTurma(false);
    }
  };

  const confirmarExcluirTurma = (turma) => {
    setTurmaParaExcluir(turma);
    setErroExcluirTurma("");
  };

  const handleRemoverTurma = async () => {
    if (!turmaParaExcluir || removendoTurma) return;
    setRemovendoTurma(true);
    setErroExcluirTurma("");
    try {
      await deletarTurma(turmaParaExcluir.id);
      setTurmas((prev) => prev.filter((t) => t.id !== turmaParaExcluir.id));
      setTurmaParaExcluir(null);
      carregarCriancas(escolaId);
    } catch (e) {
      const d = e?.response?.data;
      setErroExcluirTurma(d?.detail || d?.mensagem || "Não foi possível remover a turma.");
    } finally {
      setRemovendoTurma(false);
    }
  };

  // --- Crianças ---
  const abrirCadastroCrianca = () => {
    setFormCrianca({
      nome: "",
      cpf: "",
      data_nascimento: "",
      tipo_escola: "publica",
      turma_id: "",
      professor_id: "",
      responsavel_nome: "",
      responsavel_cpf: "",
      responsavel_email: "",
      responsavel_telefone: "",
      responsavel_senha: "",
    });
    setErroModalCrianca("");
    setModalCrianca(true);
  };

  const handleChangeCrianca = (e) => {
    const { name, value } = e.target;
    let nextValue = value;
    if (name === "cpf" || name === "responsavel_cpf") nextValue = formatCPF(value);
    if (name === "responsavel_telefone") nextValue = formatTelefone(value);
    setFormCrianca((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSalvarCrianca = async () => {
    if (salvandoCrianca || !escolaId) return;
    setSalvandoCrianca(true);
    setErroModalCrianca("");
    try {
      const nome = formCrianca.nome?.trim();
      const respNome = formCrianca.responsavel_nome?.trim();
      const email = formCrianca.responsavel_email?.trim();
      const data = formCrianca.data_nascimento;
      const cpfCrianca = digits(formCrianca.cpf, 11);
      const cpfResp = digits(formCrianca.responsavel_cpf, 11);
      const telResp = digits(formCrianca.responsavel_telefone, 11);

      if (!nome || cpfCrianca.length !== 11 || !data) {
        throw new Error("Preencha os dados da criança (nome, CPF, data).");
      }
      if (!respNome || cpfResp.length !== 11 || !email || telResp.length < 10) {
        throw new Error("Preencha os dados do responsável (nome, CPF, email, telefone).");
      }
      if (!formCrianca.responsavel_senha || formCrianca.responsavel_senha.length < 6) {
        throw new Error("Defina uma senha de ao menos 6 caracteres para o responsável.");
      }

      const payload = {
        nome,
        cpf: cpfCrianca,
        data_nascimento: data,
        tipo_escola: formCrianca.tipo_escola || "publica",
        plano: "escolar",
        escola_id: escolaId,
        turma_id: formCrianca.turma_id || undefined,
        professor_id: formCrianca.professor_id || undefined,
        responsavel_dados: {
          nome: respNome,
          cpf: cpfResp,
          email,
          telefone: telResp,
          senha: formCrianca.responsavel_senha,
        },
      };

      const nova = await cadastrarCrianca(payload);
      setCriancas((prev) => [...prev, nova]);
      setModalCrianca(false);
    } catch (e) {
      const d = e?.response?.data;
      setErroModalCrianca(d?.detail || d?.mensagem || e.message || "Não foi possível cadastrar a criança.");
    } finally {
      setSalvandoCrianca(false);
    }
  };

  const tabButton = (tab, label) => (
    <button
      key={tab}
      onClick={() => setAba(tab)}
      style={{
        padding: "8px 16px",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        background: aba === tab ? "#8E24AA" : "#f2d9ff",
        color: aba === tab ? "#fff" : "#8E24AA",
      }}
    >
      {label}
    </button>
  );

  const renderProfessores = () => (
    <section style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>Professores cadastrados</h3>
          <p style={{ margin: "4px 0 0", color: "#666" }}>Total: {professores.length}</p>
        </div>
        <button
          onClick={abrirCadastroProfessor}
          style={{ background: "#8E24AA", color: "#fff", border: "none", borderRadius: 12, padding: "10px 18px", cursor: "pointer", fontWeight: 600 }}
        >
          + Novo professor
        </button>
      </div>

      {erroProfessores && (
        <div style={{ marginTop: 16 }}>
          <Alert type="error">{erroProfessores}</Alert>
        </div>
      )}

      {carregandoProfessores ? (
        <p style={{ marginTop: 24 }}>Carregando...</p>
      ) : professores.length === 0 ? (
        <p style={{ marginTop: 24 }}>Nenhum professor cadastrado ainda.</p>
      ) : (
        <div style={{ marginTop: 20, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#777", fontSize: 14 }}>
                <th style={{ padding: "8px 4px" }}>Nome</th>
                <th style={{ padding: "8px 4px" }}>CPF</th>
                <th style={{ padding: "8px 4px" }}>Email</th>
                <th style={{ padding: "8px 4px" }}>Telefone</th>
                <th style={{ padding: "8px 4px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((prof) => (
                <tr key={prof.id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: "12px 4px" }}>{prof.nome}</td>
                  <td style={{ padding: "12px 4px" }}>{formatCPF(prof.cpf)}</td>
                  <td style={{ padding: "12px 4px" }}>{prof.email}</td>
                  <td style={{ padding: "12px 4px" }}>{formatTelefone(prof.telefone)}</td>
                  <td style={{ padding: "12px 4px" }}>
                    <button
                      onClick={() => abrirEdicaoProfessor(prof)}
                      style={{ border: "none", background: "transparent", color: "#8E24AA", cursor: "pointer", marginRight: 12, fontFamily: "Fredoka" }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => confirmarExclusaoProfessor(prof)}
                      style={{ border: "none", background: "transparent", color: "#E53935", cursor: "pointer", fontFamily: "Fredoka" }}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );

  const renderTurmas = () => (
    <section style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>Turmas / Salas</h3>
          <p style={{ margin: "4px 0 0", color: "#666" }}>Total: {turmas.length}</p>
        </div>
        <button
          onClick={abrirCadastroTurma}
          style={{ background: "#8E24AA", color: "#fff", border: "none", borderRadius: 12, padding: "10px 18px", cursor: "pointer", fontWeight: 600 }}
        >
          + Nova turma
        </button>
      </div>

      {erroTurmas && (
        <div style={{ marginTop: 16 }}>
          <Alert type="error">{erroTurmas}</Alert>
        </div>
      )}

      {carregandoTurmas ? (
        <p style={{ marginTop: 24 }}>Carregando...</p>
      ) : turmas.length === 0 ? (
        <p style={{ marginTop: 24 }}>Nenhuma turma cadastrada ainda.</p>
      ) : (
        <div style={{ marginTop: 20, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#777", fontSize: 14 }}>
                <th style={{ padding: "8px 4px" }}>Nome</th>
                <th style={{ padding: "8px 4px" }}>Descrição</th>
                <th style={{ padding: "8px 4px" }}>Professores</th>
                <th style={{ padding: "8px 4px" }}>Crianças</th>
                <th style={{ padding: "8px 4px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => {
                const professoresNomes = (turma.professores || [])
                  .map((id) => mapaProfessores[id])
                  .filter(Boolean)
                  .join(", ");
                const criancasTotal = mapaCriancasPorTurma[turma.id] || 0;
                return (
                  <tr key={turma.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px 4px" }}>{turma.nome}</td>
                    <td style={{ padding: "12px 4px" }}>{turma.descricao || turma.nivel || turma.turno || "-"}</td>
                    <td style={{ padding: "12px 4px" }}>{professoresNomes || "-"}</td>
                    <td style={{ padding: "12px 4px" }}>{criancasTotal}</td>
                    <td style={{ padding: "12px 4px" }}>
                      <button
                        onClick={() => abrirEdicaoTurma(turma)}
                        style={{ border: "none", background: "transparent", color: "#8E24AA", cursor: "pointer", marginRight: 12, fontFamily: "Fredoka" }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmarExcluirTurma(turma)}
                        style={{ border: "none", background: "transparent", color: "#E53935", cursor: "pointer", fontFamily: "Fredoka" }}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );

  const renderCriancas = () => (
    <section style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>Crianças cadastradas</h3>
          <p style={{ margin: "4px 0 0", color: "#666" }}>Total: {criancas.length}</p>
        </div>
        <button
          onClick={abrirCadastroCrianca}
          style={{ background: "#8E24AA", color: "#fff", border: "none", borderRadius: 12, padding: "10px 18px", cursor: "pointer", fontWeight: 600 }}
        >
          + Cadastrar criança
        </button>
      </div>

      {erroCriancas && (
        <div style={{ marginTop: 16 }}>
          <Alert type="error">{erroCriancas}</Alert>
        </div>
      )}

      {carregandoCriancas ? (
        <p style={{ marginTop: 24 }}>Carregando...</p>
      ) : criancas.length === 0 ? (
        <p style={{ marginTop: 24 }}>Nenhuma criança cadastrada no plano escolar.</p>
      ) : (
        <div style={{ marginTop: 20, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720, marginBottom: '2rem' }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#777", fontSize: 14 }}>
                <th style={{ padding: "8px 4px" }}>Nome</th>
                <th style={{ padding: "8px 4px" }}>CPF</th>
                <th style={{ padding: "8px 4px" }}>Turma</th>
                <th style={{ padding: "8px 4px" }}>Professor</th>
                <th style={{ padding: "8px 4px" }}>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {criancas.map((crianca) => {
                const turmaNome = crianca.turma_id ? mapaTurmas[crianca.turma_id] : "-";
                const professorNome = crianca.professor_nome || mapaProfessores[crianca.professor_id] || "-";
                return (
                  <tr key={crianca.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px 4px" }}>{crianca.nome}</td>
                    <td style={{ padding: "12px 4px" }}>{formatCPF(crianca.cpf)}</td>
                    <td style={{ padding: "12px 4px" }}>{turmaNome || "-"}</td>
                    <td style={{ padding: "12px 4px" }}>{professorNome}</td>
                    <td style={{ padding: "12px 4px" }}>{crianca.responsavel_nome || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );

  return (
    <div>
      <Header links={links} />
      <main style={{ maxWidth: 1100, margin: "30px auto 60px", padding: "0 24px" }}>

        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>
        <div className={styles.bolha}></div>

        <section style={{ marginBottom: 24 }}>
          <h2 style={{ color: "#8E24AA", marginBottom: 8 }}>Bem-vindo(a), {nomeEscola}!</h2>
          <p style={{ color: "#555" }}>Gerencie professores, turmas e crianças do plano escolar em um só lugar.</p>
          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap", fontFamily: 'Fredoka' }}>
            {tabButton("professores", "Professores")}
            {tabButton("turmas", "Turmas")}
            {tabButton("criancas", "Crianças")}
          </div>
        </section>

        {aba === "professores" && renderProfessores()}
        {aba === "turmas" && renderTurmas()}
        {aba === "criancas" && renderCriancas()}
      </main>

      {/* --- MODAIS COM CARDESCOLA --- */}

      {/* 1. Modal Professor (Cadastro/Edição) */}
      {modalProfessor && (
        <CardEscola // 👈 SUBSTITUIÇÃO
          isOpen={modalProfessor}
          title={editandoProfessor ? "Editar professor" : "Novo professor"}
          primaryText={salvandoProfessor ? "Salvando..." : "Salvar"}
          primaryDisabled={salvandoProfessor}
          onPrimary={handleSalvarProfessor}
          onClose={() => setModalProfessor(false)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontWeight: 600 }}>
              Nome
              <input
                type="text"
                name="nome"
                value={formProfessor.nome}
                onChange={handleChangeProfessor}
                className={stylesCard.modalInput} // 👈 Uso do CSS modular
              />
            </label>
            <label style={{ fontWeight: 600 }}>
              CPF
              <input
                type="text"
                name="cpf"
                value={formProfessor.cpf}
                onChange={handleChangeProfessor}
                maxLength={14}
                inputMode="numeric"
                disabled={!!editandoProfessor}
                className={stylesCard.modalInput} // 👈 Uso do CSS modular
              />
            </label>
            <label style={{ fontWeight: 600 }}>
              Email
              <input
                type="email"
                name="email"
                value={formProfessor.email}
                onChange={handleChangeProfessor}
                className={stylesCard.modalInput} // 👈 Uso do CSS modular
              />
            </label>
            <label style={{ fontWeight: 600 }}>
              Telefone
              <input
                type="text"
                name="telefone"
                value={formProfessor.telefone}
                onChange={handleChangeProfessor}
                maxLength={15}
                inputMode="numeric"
                className={stylesCard.modalInput} // 👈 Uso do CSS modular
              />
            </label>
            {!editandoProfessor && (
              <label style={{ fontWeight: 600 }}>
                Senha inicial
                <input
                  type="password"
                  name="senha"
                  value={formProfessor.senha}
                  onChange={handleChangeProfessor}
                  minLength={6}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
            )}
            {mensagemModalProfessor && (
              <p style={{ color: "#d32f2f", marginTop: 4 }}>{mensagemModalProfessor}</p>
            )}
          </div>
        </CardEscola>
      )}

      {/* 2. Modal Exclusão Professor */}
      {professorParaExcluir && (
        <CardEscola // 👈 SUBSTITUIÇÃO
          isOpen={!!professorParaExcluir}
          isAlert={true} // Para estilizar o botão primário como 'danger'
          title="Remover professor"
          primaryText={removendoProfessor ? "Removendo..." : "Remover"}
          primaryDisabled={removendoProfessor}
          onPrimary={handleRemoverProfessor}
          onClose={() => setProfessorParaExcluir(null)}
        >
          <p>Deseja remover o acesso de <strong>{professorParaExcluir.nome}</strong>? Esta ação não pode ser desfeita.</p>
          {erroExcluirProfessor && <p style={{ color: "#d32f2f", marginTop: 8 }}>{erroExcluirProfessor}</p>}
        </CardEscola>
      )}

      {/* 3. Modal Turma (Cadastro/Edição) */}
      {modalTurma && (
        <CardEscola // 👈 SUBSTITUIÇÃO
          isOpen={modalTurma}
          title={editandoTurma ? "Editar turma" : "Nova turma"}
          primaryText={salvandoTurma ? "Salvando..." : "Salvar"}
          primaryDisabled={salvandoTurma}
          onPrimary={handleSalvarTurma}
          onClose={() => setModalTurma(false)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontWeight: 600 }}>
              Nome
              <input
                type="text"
                name="nome"
                value={formTurma.nome}
                onChange={handleChangeTurma}
                className={stylesCard.modalInput} // 👈 Uso do CSS modular
              />
            </label>
            <label style={{ fontWeight: 600 }}>
              Descrição
              <input
                type="text"
                name="descricao"
                value={formTurma.descricao}
                onChange={handleChangeTurma}
                className={stylesCard.modalInput} // 👈 Uso do CSS modular
              />
            </label>
            <label style={{ fontWeight: 600 }}>
              Nível/Série
              <input
                type="text"
                name="nivel"
                value={formTurma.nivel}
                onChange={handleChangeTurma}
                placeholder="Ex: 1º ano"
                className={stylesCard.modalInput} // 👈 Uso do CSS modular
              />
            </label>
            <label style={{ fontWeight: 600 }}>
              Turno
              <input
                type="text"
                name="turno"
                value={formTurma.turno}
                onChange={handleChangeTurma}
                placeholder="Ex: Manhã"
                className={stylesCard.modalInput} // 👈 Uso do CSS modular
              />
            </label>
            <label style={{ fontWeight: 600 }}>
              Professores
              <select
                multiple
                value={formTurma.professores}
                onChange={handleProfessoresTurma}
                className={stylesCard.modalSelectMultiple} // 👈 Uso do CSS modular para select
              >
                {professores.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nome}
                  </option>
                ))}
              </select>
              <small style={{ color: "#666", display: "block", marginTop: 4 }}>
                Use CTRL/CMD para selecionar múltiplos.
              </small>
            </label>
            {erroModalTurma && (
              <p style={{ color: "#d32f2f", marginTop: 4 }}>{erroModalTurma}</p>
            )}
          </div>
        </CardEscola>
      )}

      {/* 4. Modal Exclusão Turma */}
      {turmaParaExcluir && (
        <CardEscola // 👈 SUBSTITUIÇÃO
          isOpen={!!turmaParaExcluir}
          isAlert={true} // Para estilizar o botão primário como 'danger'
          title="Remover turma"
          primaryText={removendoTurma ? "Removendo..." : "Remover"}
          primaryDisabled={removendoTurma}
          onPrimary={handleRemoverTurma}
          onClose={() => setTurmaParaExcluir(null)}
        >
          <p>
            Deseja remover a turma <strong>{turmaParaExcluir.nome}</strong>?
            Todas as crianças associadas a esta turma ficarão sem turma. Esta ação não pode ser desfeita.
          </p>
          {erroExcluirTurma && <p style={{ color: "#d32f2f", marginTop: 8 }}>{erroExcluirTurma}</p>}
        </CardEscola>
      )}

      {/* 5. Modal Criança (Cadastro) */}
      {modalCrianca && (
        <CardEscola // 👈 SUBSTITUIÇÃO
          isOpen={modalCrianca}
          title="Cadastrar nova criança"
          primaryText={salvandoCrianca ? "Salvando..." : "Cadastrar"}
          primaryDisabled={salvandoCrianca}
          onPrimary={handleSalvarCrianca}
          onClose={() => setModalCrianca(false)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h4 style={{ margin: 0 }}>Dados da Criança</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={{ fontWeight: 600, gridColumn: "span 2" }}>
                Nome Completo
                <input
                  type="text"
                  name="nome"
                  value={formCrianca.nome}
                  onChange={handleChangeCrianca}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
              <label style={{ fontWeight: 600 }}>
                CPF
                <input
                  type="text"
                  name="cpf"
                  value={formCrianca.cpf}
                  onChange={handleChangeCrianca}
                  maxLength={14}
                  inputMode="numeric"
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
              <label style={{ fontWeight: 600 }}>
                Data de Nascimento
                <input
                  type="date"
                  name="data_nascimento"
                  value={formCrianca.data_nascimento}
                  onChange={handleChangeCrianca}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
              <label style={{ fontWeight: 600 }}>
                Tipo de Escola
                <select
                  name="tipo_escola"
                  value={formCrianca.tipo_escola}
                  onChange={handleChangeCrianca}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                >
                  <option value="publica">Pública</option>
                  <option value="privada">Privada</option>
                </select>
              </label>
              <label style={{ fontWeight: 600 }}>
                Turma (Opcional)
                <select
                  name="turma_id"
                  value={formCrianca.turma_id}
                  onChange={handleChangeCrianca}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                >
                  <option value="">Nenhuma</option>
                  {turmas.map((t) => (
                    <option key={t.id} value={t.id}>{t.nome}</option>
                  ))}
                </select>
              </label>
              <label style={{ fontWeight: 600 }}>
                Professor (Opcional)
                <select
                  name="professor_id"
                  value={formCrianca.professor_id}
                  onChange={handleChangeCrianca}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                >
                  <option value="">Nenhum</option>
                  {professores.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </label>
            </div>

            <h4 style={{ margin: "16px 0 0" }}>Dados do Responsável (será criado um usuário)</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={{ fontWeight: 600, gridColumn: "span 2" }}>
                Nome Completo
                <input
                  type="text"
                  name="responsavel_nome"
                  value={formCrianca.responsavel_nome}
                  onChange={handleChangeCrianca}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
              <label style={{ fontWeight: 600 }}>
                CPF
                <input
                  type="text"
                  name="responsavel_cpf"
                  value={formCrianca.responsavel_cpf}
                  onChange={handleChangeCrianca}
                  maxLength={14}
                  inputMode="numeric"
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
              <label style={{ fontWeight: 600 }}>
                Telefone
                <input
                  type="text"
                  name="responsavel_telefone"
                  value={formCrianca.responsavel_telefone}
                  onChange={handleChangeCrianca}
                  maxLength={15}
                  inputMode="numeric"
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
              <label style={{ fontWeight: 600, gridColumn: "span 2" }}>
                Email
                <input
                  type="email"
                  name="responsavel_email"
                  value={formCrianca.responsavel_email}
                  onChange={handleChangeCrianca}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
              <label style={{ fontWeight: 600, gridColumn: "span 2" }}>
                Senha inicial
                <input
                  type="password"
                  name="responsavel_senha"
                  value={formCrianca.responsavel_senha}
                  onChange={handleChangeCrianca}
                  minLength={6}
                  className={stylesCard.modalInput} // 👈 Uso do CSS modular
                />
              </label>
            </div>
            {erroModalCrianca && (
              <p style={{ color: "#d32f2f", marginTop: 4 }}>{erroModalCrianca}</p>
            )}
          </div>
        </CardEscola>
      )}

      {/* 6. Modal Confirmação Sair */}
      {confirmarSair && (
        <CardEscola // 👈 SUBSTITUIÇÃO
          isOpen={confirmarSair}
          isAlert={true}
          title="Confirmação"
          primaryText="Sair"
          primaryDisabled={false}
          onPrimary={() => {
            logout();
            navigate("/login");
          }}
          onClose={() => setConfirmarSair(false)}
        >
          <p>Tem certeza que deseja sair?</p>
        </CardEscola>
      )}

    </div>
  );
}