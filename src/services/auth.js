import { api } from './api';

export async function login(email, senha) {
    const { data } = await api.post('/auth/login', { email, senha});
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.dados));
    return data;
}

export async function cadastrarResponsavel(payload) { 
    return api.post('/responsaveis/', payload); 
}

export function logout() { 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

// Retorna usuário autenticado baseado no token
export async function me() {
    const { data } = await api.get('/auth/me');
    return data?.dados;
}

// Solicita e-mail de recuperação de senha
export async function solicitarRecuperacao(email) {
    const { data } = await api.post('/auth/recuperar_senha', { email });
    return data;
}

// Redefine senha com token recebido por e-mail
export async function redefinirSenha(token, nova_senha) {
    const { data } = await api.post('/auth/redefinir_senha', { token, nova_senha });
    return data;
}

// Decodifica JWT (payload) sem verificar a assinatura (apenas client-side)
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Verifica se o token em localStorage existe e não expirou
export function isTokenValid() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return payload.exp > nowSec;
  } catch {
    return false;
  }
}
