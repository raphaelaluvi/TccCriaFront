import { api } from './api';

export async function cadastrarEscola(payload) {
  const body = { ...payload };
  const { data } = await api.post('/escolas/', body);
  return data;
}
