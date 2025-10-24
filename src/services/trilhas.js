import { api } from './api';

export async function getTrilhaNivel(criancaId, nivel) {
  const { data } = await api.get(`/trilhas/${nivel}`, { params: { crianca_id: criancaId } });
  return data;
}

export async function avancarTrilha(criancaId, nivel) {
  const { data } = await api.post('/trilhas/avancar', null, { params: { crianca_id: criancaId, nivel } });
  return data;
}

