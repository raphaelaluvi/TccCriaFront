import { api } from './api';

const DASHBOARD_ROUTES = {
  responsavel: '/escolhercriancas',
  professor: '/escolherturma',
  escola: '/painel-escola',
};

export function getDashboardRoute(tipo, fallback = '/escolhercriancas') {
  return DASHBOARD_ROUTES[tipo] || fallback;
}

export async function login(email, senha, tipo = 'responsavel') {
  const payload = { email, senha, tipo };
  const { data } = await api.post('/auth/login', payload);
  const resolvedTipo = data?.tipo || tipo || 'responsavel';
  const usuario = { ...(data?.dados || {}), tipo: resolvedTipo };
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(usuario));
  return { ...data, dados: usuario };
}

export async function cadastrarResponsavel(payload) { 
    return api.post('/responsaveis/', payload); 
}

export function logout() { 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        return null;
    }
}

// Retorna usuário autenticado baseado no token
export async function me() {
    const { data } = await api.get('/auth/me');
    if (!data?.dados) return null;
    const resolvedTipo = data?.tipo || data?.dados?.tipo;
    const usuario = { ...data.dados, tipo: resolvedTipo };
    localStorage.setItem('user', JSON.stringify(usuario));
    return usuario;
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
