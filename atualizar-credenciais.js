const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

console.log('=== ATUALIZANDO CREDENCIAIS DO SUPABASE ===\n');

// Atualizar para as credenciais corretas do projeto
const SUPABASE_URL = 'https://vopekxfyorbuyrvzcshy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4';

// Substituir as credenciais existentes
content = content.replace(/const SUPABASE_URL = '[^']*';/, `const SUPABASE_URL = '${SUPABASE_URL}';`);
content = content.replace(/const SUPABASE_KEY = '[^']*';/, `const SUPABASE_KEY = '${SUPABASE_KEY}';`);

// Corrigir possíveis erros na criação do cliente
content = content.replace(/const supabase = supabase\.createClient\(SUPABASE_URL, SUPABASE_KEY\);/, 'const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);');

// Corrigir chamadas que possam estar incorretas
content = content.replace(/await supabase\./g, 'await supabaseClient.');

console.log('✅ Credenciais do Supabase atualizadas para o projeto correto');
console.log('✅ URL:', SUPABASE_URL);
console.log('✅ Cliente Supabase corrigido');
console.log('✅ Chamadas Supabase padronizadas\n');

// Escrever o arquivo atualizado
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Arquivo index.html atualizado com credenciais corretas');
console.log('=== ATUALIZAÇÃO CONCLUÍDA ===');