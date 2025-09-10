const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Corrigir as chamadas específicas de Supabase
content = content.replace(
    /const \\{ data, error \\} = await supabase\\s+\\.from\\('services'\\)/g,
    'const { data, error } = await supabaseClient\n                    .from(\'services\')'
);

content = content.replace(
    /const \\{ data, error \\} = await supabase\\s+\\.from\\('reviews'\\)/g,
    'const { data, error } = await supabaseClient\n                    .from(\'reviews\')'
);

content = content.replace(
    /const \\{ data, error \\} = await supabase\\s+\\.from\\('space_photos'\\)/g,
    'const { data, error } = await supabaseClient\n                    .from(\'space_photos\')'
);

content = content.replace(
    /const \\{ data, error \\} = await supabase\\s+\\.from\\('contact_info'\\)/g,
    'const { data, error } = await supabaseClient\n                    .from(\'contact_info\')'
);

// Escrever o arquivo corrigido
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Correções aplicadas com sucesso ao index.html!');
console.log('Todas as chamadas await supabase.from(...) foram corrigidas para await supabaseClient.from(...)');