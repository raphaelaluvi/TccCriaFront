import { api } from './api';

export async function atualizarResponsavel(id, payload) {
  const body = { ...payload };
  Object.keys(body).forEach((k) => {
    if (body[k] === '' || body[k] == null) delete body[k];
  });
  const { data } = await api.put(`/responsaveis/${id}`, body);
  return data?.dados;
}

