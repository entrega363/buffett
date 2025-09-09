// Configuração do Supabase para o Buffet Sobral
import { createClient } from '@supabase/supabase-js'

// Credenciais do Supabase (carregadas das variáveis de ambiente)
const supabaseUrl = process.env.SUPABASE_URL || 'https://vopekxfyorbuyrvzcshy.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4'

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

// Cliente Supabase com service role key (para operações administrativas)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ1OTI2MywiZXhwIjoyMDczMDM1MjYzfQ.CEziwcAFfb7reGiGorqLneb-81OHDSHwR1ew5Ibg0yk'
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)