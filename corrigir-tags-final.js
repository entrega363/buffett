const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Verificar se há uma tag </script> antes de </body>
if (!content.includes('</script>\\n</body>') && content.includes('</body>')) {
    // Substituir </body> por </script>\n</body>
    content = content.replace('</body>', '    </script>\\n</body>');
    console.log('✅ Adicionada tag </script> faltando antes de </body>');
} else {
    console.log('✅ Tags script já estão corretamente balanceadas');
}

// Escrever o arquivo corrigido
fs.writeFileSync(indexPath, content, 'utf8');