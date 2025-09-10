const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

console.log('=== CORRIGINDO PROBLEMAS DO index.html ===');

// Corrigir funções duplicadas
// Primeiro, vamos encontrar as funções duplicadas
const lines = content.split('\n');

// Encontrar a segunda ocorrência de updateServicesEventsFromAdmin
let firstUpdateServicesIndex = -1;
let secondUpdateServicesIndex = -1;
let updateServicesEndIndex = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function updateServicesEventsFromAdmin(adminEventsData) {')) {
        if (firstUpdateServicesIndex === -1) {
            firstUpdateServicesIndex = i;
        } else {
            secondUpdateServicesIndex = i;
            // Encontrar o fim da função (próxima chave de fechamento no mesmo nível)
            let braceCount = 0;
            for (let j = i; j < lines.length; j++) {
                const line = lines[j];
                if (line.includes('{')) braceCount++;
                if (line.includes('}')) braceCount--;
                if (braceCount === 0) {
                    updateServicesEndIndex = j;
                    break;
                }
            }
            break;
        }
    }
}

// Remover a segunda ocorrência da função updateServicesEventsFromAdmin
if (secondUpdateServicesIndex !== -1 && updateServicesEndIndex !== -1) {
    console.log(`Removendo segunda ocorrência de updateServicesEventsFromAdmin (linhas ${secondUpdateServicesIndex + 1} a ${updateServicesEndIndex + 1})`);
    lines.splice(secondUpdateServicesIndex, updateServicesEndIndex - secondUpdateServicesIndex + 1);
}

// Encontrar a segunda ocorrência de addEventLabelsToService
let firstAddEventLabelsIndex = -1;
let secondAddEventLabelsIndex = -1;
let addEventLabelsEndIndex = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function addEventLabelsToService(serviceCard, events) {')) {
        if (firstAddEventLabelsIndex === -1) {
            firstAddEventLabelsIndex = i;
        } else {
            secondAddEventLabelsIndex = i;
            // Encontrar o fim da função
            let braceCount = 0;
            for (let j = i; j < lines.length; j++) {
                const line = lines[j];
                if (line.includes('{')) braceCount++;
                if (line.includes('}')) braceCount--;
                if (braceCount === 0) {
                    addEventLabelsEndIndex = j;
                    break;
                }
            }
            break;
        }
    }
}

// Remover a segunda ocorrência da função addEventLabelsToService
if (secondAddEventLabelsIndex !== -1 && addEventLabelsEndIndex !== -1) {
    console.log(`Removendo segunda ocorrência de addEventLabelsToService (linhas ${secondAddEventLabelsIndex + 1} a ${addEventLabelsEndIndex + 1})`);
    lines.splice(secondAddEventLabelsIndex, addEventLabelsEndIndex - secondAddEventLabelsIndex + 1);
}

// Corrigir tags script desbalanceadas
// Encontrar a última tag </script> e adicionar uma antes do </body>
let bodyCloseIndex = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('</body>')) {
        bodyCloseIndex = i;
        break;
    }
}

if (bodyCloseIndex !== -1) {
    // Verificar se já existe uma tag </script> antes de </body>
    let hasScriptCloseBeforeBody = false;
    for (let i = bodyCloseIndex - 1; i >= 0; i--) {
        if (lines[i].includes('</script>')) {
            hasScriptCloseBeforeBody = true;
            break;
        }
        if (lines[i].includes('<body>') || lines[i].includes('</head>')) {
            break;
        }
    }
    
    if (!hasScriptCloseBeforeBody) {
        console.log('Adicionando tag </script> faltando antes de </body>');
        lines.splice(bodyCloseIndex, 0, '    </script>');
    }
}

// Juntar novamente o conteúdo
content = lines.join('\n');

// Escrever o arquivo corrigido
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Correções aplicadas com sucesso!');
console.log('✅ Funções duplicadas removidas');
console.log('✅ Tags script balanceadas');