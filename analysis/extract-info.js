// Script para extrair informações do site original
// Execute este script no console do navegador na página do HatchCanvas

(function() {
    console.log('=== ANÁLISE DO SITE HATCHCANVAS ===');
    
    // 1. Estrutura HTML
    console.log('\n1. ESTRUTURA HTML:');
    console.log('DOCTYPE:', document.doctype ? document.doctype.name : 'Não encontrado');
    console.log('Título:', document.title);
    console.log('Meta viewport:', document.querySelector('meta[name="viewport"]')?.content || 'Não encontrado');
    
    // 2. Elementos principais
    console.log('\n2. ELEMENTOS PRINCIPAIS:');
    const mainElements = ['header', 'nav', 'main', 'aside', 'footer', 'section', 'article'];
    mainElements.forEach(tag => {
        const elements = document.querySelectorAll(tag);
        if (elements.length > 0) {
            console.log(`${tag.toUpperCase()}: ${elements.length} elemento(s)`);
        }
    });
    
    // 3. Links CSS
    console.log('\n3. ARQUIVOS CSS:');
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach((link, index) => {
        console.log(`CSS ${index + 1}:`, link.href);
    });
    
    // 4. Scripts
    console.log('\n4. ARQUIVOS JAVASCRIPT:');
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach((script, index) => {
        console.log(`JS ${index + 1}:`, script.src);
    });
    
    // 5. Imagens
    console.log('\n5. IMAGENS:');
    const images = document.querySelectorAll('img');
    console.log(`Total de imagens: ${images.length}`);
    images.forEach((img, index) => {
        if (index < 10) { // Mostra apenas as primeiras 10
            console.log(`Imagem ${index + 1}:`, img.src, `Alt: "${img.alt}"`);
        }
    });
    
    // 6. Fontes
    console.log('\n6. FONTES:');
    const fontLinks = document.querySelectorAll('link[href*="font"]');
    fontLinks.forEach((font, index) => {
        console.log(`Fonte ${index + 1}:`, font.href);
    });
    
    // 7. Cores computadas
    console.log('\n7. CORES PRINCIPAIS:');
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    console.log('Cor do texto:', computedStyle.color);
    console.log('Cor de fundo:', computedStyle.backgroundColor);
    console.log('Fonte:', computedStyle.fontFamily);
    
    // 8. Dimensões da página
    console.log('\n8. DIMENSÕES:');
    console.log('Largura da janela:', window.innerWidth);
    console.log('Altura da janela:', window.innerHeight);
    console.log('Largura do documento:', document.documentElement.scrollWidth);
    console.log('Altura do documento:', document.documentElement.scrollHeight);
    
    // 9. Meta tags importantes
    console.log('\n9. META TAGS:');
    const metaTags = document.querySelectorAll('meta');
    metaTags.forEach(meta => {
        if (meta.name || meta.property) {
            console.log(`${meta.name || meta.property}:`, meta.content);
        }
    });
    
    // 10. Elementos com IDs únicos
    console.log('\n10. ELEMENTOS COM ID:');
    const elementsWithId = document.querySelectorAll('[id]');
    elementsWithId.forEach(element => {
        console.log(`#${element.id}:`, element.tagName.toLowerCase());
    });
    
    console.log('\n=== FIM DA ANÁLISE ===');
    console.log('Copie estas informações para o arquivo de análise.');
})();