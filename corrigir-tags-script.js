const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Converter para array de linhas
let lines = content.split('\n');

// Procurar pela tag <script type="module"> e adicionar </script> após ela
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<script type="module">')) {
        console.log(`Encontrada tag <script type="module"> na linha ${i + 1}`);
        
        // Procurar o fim do script (próxima tag </script> ou </body>)
        let foundClose = false;
        for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].includes('</script>')) {
                foundClose = true;
                break;
            }
            if (lines[j].includes('</body>')) {
                // Inserir </script> antes de </body>
                lines.splice(j, 0, '    </script>');
                console.log(`Adicionada tag </script> na linha ${j + 1}`);
                foundClose = true;
                break;
            }
        }
        
        // Se não encontrou fechamento, adicionar antes de </body>
        if (!foundClose) {
            for (let j = lines.length - 1; j >= 0; j--) {
                if (lines[j].includes('</body>')) {
                    lines.splice(j, 0, '    </script>');
                    console.log(`Adicionada tag </script> na linha ${j + 1}`);
                    break;
                }
            }
        }
        break;
    }
}

// Juntar novamente o conteúdo
content = lines.join('\n');

// Escrever o arquivo corrigido
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Correção de tags script aplicada com sucesso!');