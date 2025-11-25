import { api } from './api';

export async function getProgressoGeral(criancaId) {
  try {
    const { data } = await api.get(`/progresso/geral/${criancaId}`);
    return data;
  } catch (err) {
    if (err?.response?.status === 404) return null;
    throw err;
  }
}

export async function getProgressoAtividade(atividadeId) {
  const { data } = await api.get(`/progresso/atividade/${atividadeId}`);
  return data;
}

export async function getDiagnostico(criancaId, nivel) {
  const { data } = await api.get('/progresso/diagnostico/' + criancaId, {
    params: nivel != null ? { nivel } : undefined,
  });
  return data;
}

export async function getDiagnosticoLLM(criancaId, nivel) {
  try {
    const { data } = await api.get('/progresso/diagnostico_llm/' + criancaId, {
      params: nivel != null ? { nivel } : undefined,
    });
    return data;
  } catch (err) {
    if (err?.response?.data) {
      return err.response.data;
    }
    throw err;
  }
}

export async function getProgressoTurma(turmaId) {
  try {
    const { data } = await api.get(`/progresso/turma/${turmaId}`);
    return data;
  } catch (err) {
    if (err?.response?.status === 404) return null;
    throw err;
  }
}
