const fs = require('fs');
const path = require('path');

// Caminho do arquivo
const filePath = path.join(__dirname, 'index.html');

// Ler o arquivo
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Fazer as substituições necessárias
    let correctedData = data;
    
    // Corrigir a declaração do cliente Supabase
    correctedData = correctedData.replace(
        'const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);',
        'const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);'
    );
    
    // Corrigir todas as chamadas para usar supabaseClient
    correctedData = correctedData.replace(
        /await supabase\./g,
        'await supabaseClient.'
    );
    
    // Escrever o arquivo corrigido
    fs.writeFile(filePath, correctedData, 'utf8', (err) => {
        if (err) {
            console.error('Erro ao escrever o arquivo:', err);
            return;
        }
        
        console.log('✅ Arquivo index.html corrigido com sucesso!');
        console.log('As seguintes correções foram aplicadas:');
        console.log('1. const supabase = supabase.createClient(...) → const supabaseClient = supabase.createClient(...)');
        console.log('2. await supabase.from(...) → await supabaseClient.from(...)');
    });
});