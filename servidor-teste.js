const http = require('http');
const fs = require('fs');
const path = require('path');

// Mapeamento de extensões para tipos MIME
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

// Criar servidor
const server = http.createServer((req, res) => {
    console.log(`Requisição: ${req.method} ${req.url}`);
    
    // Determinar caminho do arquivo
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Resolver caminho absoluto
    filePath = path.resolve(filePath);
    const rootDir = path.resolve('.');
    
    // Prevenir acesso a arquivos fora do diretório
    if (!filePath.startsWith(rootDir)) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('403 Forbidden', 'utf-8');
        return;
    }
    
    // Obter extensão do arquivo
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Ler arquivo
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Arquivo não encontrado
                fs.readFile('./404.html', (err, content404) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('404 Not Found', 'utf-8');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content404, 'utf-8');
                    }
                });
            } else {
                // Erro no servidor
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`500 Internal Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            // Sucesso
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`=== SERVIDOR DE TESTE ===`);
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Pressione Ctrl+C para parar`);
    console.log(`========================`);
});