import { api } from './api';

export async function responderExercicio(id, resposta) {
  // Backend define 'resposta' como parâmetro simples (query), não Body
  const { data } = await api.post(`/exercicios/responder_exercicio/${id}`, null, {
    params: { resposta }
  });
  return data;
}

export async function buscarExercicio(id) {
  const { data } = await api.get(`/exercicios/buscar_exercicio/${id}`);
  return data;
}
