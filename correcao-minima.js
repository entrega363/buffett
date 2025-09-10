const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

console.log('=== APLICANDO CORREÇÕES MÍNIMAS ===');

// Converter para array de linhas
let lines = content.split('\n');

// Correção 1: Corrigir a função showTab para garantir que funcione corretamente
// Encontrar a função showTab original
let showTabStart = -1;
let showTabEnd = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function showTab(tabName) {')) {
        showTabStart = i;
        // Encontrar o fim da função
        let braceCount = 0;
        for (let j = i; j < lines.length; j++) {
            const line = lines[j];
            if (line.includes('{')) braceCount++;
            if (line.includes('}')) braceCount--;
            if (braceCount === 0 && line.includes('}')) {
                showTabEnd = j;
                break;
            }
        }
        break;
    }
}

// Se encontramos a função showTab, vamos substituir por uma versão mais robusta
if (showTabStart !== -1 && showTabEnd !== -1) {
    console.log(`Corrigindo função showTab (linhas ${showTabStart + 1} a ${showTabEnd + 1})`);
    
    const newShowTab = [
        '        function showTab(tabName) {',
        '            // Esconder todas as seções',
        '            document.querySelectorAll(\'.section\').forEach(section => {',
        '                section.classList.remove(\'active\');',
        '            });',
        '            ',
        '            // Remover classe active de todas as abas',
        '            document.querySelectorAll(\'.nav-tab\').forEach(tab => {',
        '                tab.classList.remove(\'active\');',
        '            });',
        '            ',
        '            // Mostrar a seção solicitada',
        '            const targetSection = document.getElementById(tabName);',
        '            if (targetSection) {',
        '                targetSection.classList.add(\'active\');',
        '            }',
        '            ',
        '            // Ativar a aba correspondente (baseado no texto do botão)',
        '            const tabToActivate = Array.from(document.querySelectorAll(\'.nav-tab\')).find(tab => {',
        '                const tabText = tab.textContent.trim();',
        '                if (tabName === \'catalogo\') return tabText.includes(\'Catálogo\');',
        '                if (tabName === \'simulador\') return tabText.includes(\'Simulador\');',
        '                if (tabName === \'agenda\') return tabText.includes(\'Agenda\');',
        '                if (tabName === \'avaliacoes\') return tabText.includes(\'Avaliações\');',
        '                if (tabName === \'videos\') return tabText.includes(\'Vídeos\');',
        '                return false;',
        '            });',
        '            ',
        '            if (tabToActivate) {',
        '                tabToActivate.classList.add(\'active\');',
        '            }',
        '            ',
        '            // Carregar conteúdo dinâmico quando necessário',
        '            if (tabName === \'videos\') {',
        '                loadFeaturedVideos();',
        '            }',
        '            ',
        '            if (tabName === \'avaliacoes\') {',
        '                loadReviews();',
        '            }',
        '        }'
    ];
    
    // Substituir a função
    lines.splice(showTabStart, showTabEnd - showTabStart + 1, ...newShowTab);
}

// Correção 2: Corrigir o cliente Supabase
for (let i = 0; i < lines.length; i++) {
    // Corrigir declaração do cliente
    if (lines[i].includes('const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);')) {
        lines[i] = lines[i].replace('const supabase = supabase.createClient', 'const supabaseClient = supabase.createClient');
        console.log(`Corrigida declaração do cliente Supabase na linha ${i + 1}`);
    }
    
    // Corrigir chamadas
    if (lines[i].includes('await supabase.') && !lines[i].includes('await supabaseClient.')) {
        lines[i] = lines[i].replace('await supabase.', 'await supabaseClient.');
        console.log(`Corrigida chamada Supabase na linha ${i + 1}`);
    }
    
    // Corrigir chamadas específicas com quebras de linha
    if (lines[i].includes('const { data, error } = await supabase') && lines[i+1] && lines[i+1].includes('.from(')) {
        lines[i] = lines[i].replace('await supabase', 'await supabaseClient');
        console.log(`Corrigida chamada Supabase multilinha na linha ${i + 1}`);
    }
}

// Juntar novamente o conteúdo
content = lines.join('\n');

// Escrever o arquivo corrigido
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Correções mínimas aplicadas com sucesso!');
console.log('✅ Função showTab corrigida');
console.log('✅ Cliente Supabase corrigido');