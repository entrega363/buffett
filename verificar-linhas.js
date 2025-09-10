const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

// Dividir em linhas
const lines = content.split('\n');

// Verificar linhas específicas
console.log('Linha 2215:', lines[2214]);
console.log('Linha 2242:', lines[2241]);
console.log('Linha 2263:', lines[2262]);
console.log('Linha 2285:', lines[2284]);