// Configuração do Supabase
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL',
  key: import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY',
};

export default supabaseConfig;