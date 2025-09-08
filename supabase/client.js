// Cliente do Supabase
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from './config.js';

// Criar cliente do Supabase
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.key
);

export default supabase;