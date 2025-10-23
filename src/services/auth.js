export async function login(email, senha) {
    const { data } = await api.post('/auth/login', { email, senha});
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.dados));
    return data;
}

export async function registerResponsible(payload) { 
    return api.post('/responsaveis', payload); 
}

export function logout() { 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}