// Script para analisar o site original HatchCanvas
// Este script pode ser executado no console do navegador no site original

const siteAnalyzer = {
    // Extrair todas as cores CSS usadas
    extractColors: function() {
        const colors = new Set();
        const elements = document.querySelectorAll('*');
        
        elements.forEach(el => {
            const styles = window.getComputedStyle(el);
            colors.add(styles.color);
            colors.add(styles.backgroundColor);
            colors.add(styles.borderColor);
        });
        
        return Array.from(colors).filter(color => 
            color !== 'rgba(0, 0, 0, 0)' && 
            color !== 'transparent' && 
            color !== 'initial'
        );
    },
    
    // Extrair fontes utilizadas
    extractFonts: function() {
        const fonts = new Set();
        const elements = document.querySelectorAll('*');
        
        elements.forEach(el => {
            const styles = window.getComputedStyle(el);
            fonts.add(styles.fontFamily);
        });
        
        return Array.from(fonts);
    },
    
    // Extrair estrutura HTML
    extractStructure: function() {
        const structure = {
            title: document.title,
            meta: Array.from(document.querySelectorAll('meta')).map(meta => ({
                name: meta.name || meta.property,
                content: meta.content
            })),
            headings: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
                tag: h.tagName.toLowerCase(),
                text: h.textContent.trim()
            })),
            links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
                href: a.href,
                text: a.textContent.trim()
            })),
            images: Array.from(document.querySelectorAll('img')).map(img => ({
                src: img.src,
                alt: img.alt,
                width: img.width,
                height: img.height
            }))
        };
        
        return structure;
    },
    
    // Extrair estilos CSS principais
    extractMainStyles: function() {
        const bodyStyles = window.getComputedStyle(document.body);
        const htmlStyles = window.getComputedStyle(document.documentElement);
        
        return {
            body: {
                fontFamily: bodyStyles.fontFamily,
                fontSize: bodyStyles.fontSize,
                lineHeight: bodyStyles.lineHeight,
                color: bodyStyles.color,
                backgroundColor: bodyStyles.backgroundColor,
                margin: bodyStyles.margin,
                padding: bodyStyles.padding
            },
            html: {
                fontSize: htmlStyles.fontSize
            }
        };
    },
    
    // Detectar breakpoints responsivos
    detectBreakpoints: function() {
        const breakpoints = [];
        const testElement = document.createElement('div');
        document.body.appendChild(testElement);
        
        // Testar diferentes larguras
        const widths = [320, 480, 768, 1024, 1200, 1440];
        
        widths.forEach(width => {
            testElement.style.width = width + 'px';
            const styles = window.getComputedStyle(testElement);
            breakpoints.push({
                width: width,
                styles: {
                    display: styles.display,
                    fontSize: styles.fontSize
                }
            });
        });
        
        document.body.removeChild(testElement);
        return breakpoints;
    },
    
    // Executar análise completa
    analyzeComplete: function() {
        const analysis = {
            url: window.location.href,
            timestamp: new Date().toISOString(),
            colors: this.extractColors(),
            fonts: this.extractFonts(),
            structure: this.extractStructure(),
            styles: this.extractMainStyles(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
        
        console.log('Análise completa do site:', analysis);
        return analysis;
    }
};

// Instruções de uso:
console.log(`
Para usar este analisador no site original:
1. Abra o site HatchCanvas no navegador
2. Abra o console do desenvolvedor (F12)
3. Cole este código no console
4. Execute: siteAnalyzer.analyzeComplete()
`);

// Auto-executar se estiver no site HatchCanvas
if (window.location.hostname.includes('hatchcanvas.com')) {
    console.log('Site HatchCanvas detectado. Executando análise...');
    setTimeout(() => {
        siteAnalyzer.analyzeComplete();
    }, 2000);
}