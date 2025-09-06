// Autenticação com Supabase
import supabase from './client.js';

// Função para login
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Função para logout
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

// Função para registrar novo usuário
export async function register(email, password, userData = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });

  if (error) throw error;
  return data;
}

// Função para verificar se usuário está logado
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Função para observar mudanças na autenticação
export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );

  return subscription;
}

export default {
  login,
  logout,
  register,
  getCurrentUser,
  onAuthStateChange
};