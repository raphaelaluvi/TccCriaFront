import { api } from './api';

export async function listarCriancasDoResponsavel(responsavelId) {
  try {
    const { data } = await api.get(`/responsaveis/${responsavelId}/criancas`);
    return data?.dados || [];
  } catch (err) {
    if (err?.response?.status === 404) return [];
    throw err;
  }
}

export async function cadastrarCrianca(payload) {
  const { data } = await api.post('/criancas/', payload);
  return data?.dados;
}

export async function listarCriancasDaEscola(escolaId) {
  try {
    const { data } = await api.get('/professores/minhas-criancas', {
      params: { escola_id: escolaId },
    });
    return data?.criancas || [];
  } catch (err) {
    const mensagem = err?.response?.data?.detail || err?.message || '';
    const erroConhecido =
      err?.response?.status === 404 ||
      mensagem?.includes("minhas-criancas") ||
      mensagem?.toLowerCase?.().includes("objectid");

    if (erroConhecido) {
      // Fallback: lista todas as crianças e filtra por escola_id
      const { data } = await api.get('/criancas/');
      const lista =
        Array.isArray(data?.dados) ? data.dados :
        Array.isArray(data) ? data :
        [];
      return lista.filter((c) => String(c.escola_id) === String(escolaId));
    }
    throw err;
  }
}

export async function deletarCrianca(id) {
  return api.delete(`/criancas/${id}`);
}

export async function atualizarCrianca(id, dados) {
  const { data } = await api.put(`/criancas/${id}`, dados);
  return data?.dados;
}

export async function buscarCrianca(id) {
  const { data } = await api.get(`/criancas/${id}`);
  return data;
}
