const API_URL = "http://127.0.0.1:8000"; // ambiente de desenvolvimento local
// const API_URL = "https://api-criakids-82yc.onrender.com"; // produção
// const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"; QUANDO FOR USAR .ENV

import axios from 'axios'

export const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use(cfg => {
    const t = localStorage.getItem('token');
    if (t) cfg.headers.Authorization = 'Bearer ' + t;
    return cfg;
})

// Trata 401 globalmente: limpa sessão e volta para login
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err?.response?.status;
        if (status === 401) {
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } catch {}
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(err);
    }
)
