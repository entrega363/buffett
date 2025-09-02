// Script de Teste de Compatibilidade - HatchCanvas Copy

// Informações do navegador
function displayBrowserInfo() {
    const userAgent = navigator.userAgent;
    console.log('User Agent:', userAgent);
    
    const browserInfo = getBrowserInfo();
    console.log('Browser:', browserInfo.name, browserInfo.version);
    console.log('OS:', browserInfo.os);
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('Screen:', screen.width + 'x' + screen.height);
}

function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = { name: 'Unknown', version: '0', os: 'Unknown' };
    
    // Detectar navegador
    if (ua.includes('Chrome') && !ua.includes('Edg')) {
        browser.name = 'Chrome';
        browser.version = ua.match(/Chrome\/(\d+)/)[1];
    } else if (ua.includes('Firefox')) {
        browser.name = 'Firefox';
        browser.version = ua.match(/Firefox\/(\d+)/)[1];
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser.name = 'Safari';
        browser.version = ua.match(/Version\/(\d+)/)[1];
    } else if (ua.includes('Edg')) {
        browser.name = 'Edge';
        browser.version = ua.match(/Edg\/(\d+)/)[1];
    }
    
    // Detectar OS
    if (ua.includes('Windows')) browser.os = 'Windows';
    else if (ua.includes('Mac')) browser.os = 'macOS';
    else if (ua.includes('Linux')) browser.os = 'Linux';
    else if (ua.includes('Android')) browser.os = 'Android';
    else if (ua.includes('iOS')) browser.os = 'iOS';
    
    return browser;
}

// Testes de compatibilidade
const compatibilityTests = {
    css: {
        'CSS Grid': () => CSS.supports('display', 'grid'),
        'CSS Flexbox': () => CSS.supports('display', 'flex'),
        'CSS Variables': () => CSS.supports('color', 'var(--test)'),
        'CSS Transforms': () => CSS.supports('transform', 'translateX(10px)'),
        'CSS Transitions': () => CSS.supports('transition', 'all 0.3s'),
        'CSS Animations': () => CSS.supports('animation', 'test 1s'),
        'CSS Backdrop Filter': () => CSS.supports('backdrop-filter', 'blur(10px)')
    },
    
    javascript: {
        'ES6 Arrow Functions': () => {
            try { eval('(() => {})'); return true; } catch(e) { return false; }
        },
        'ES6 Classes': () => {
            try { eval('class Test {}'); return true; } catch(e) { return false; }
        },
        'Promises': () => typeof Promise !== 'undefined',
        'Fetch API': () => typeof fetch !== 'undefined',
        'IntersectionObserver': () => typeof IntersectionObserver !== 'undefined'
    },
    
    html5: {
        'Canvas': () => {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext && canvas.getContext('2d'));
        },
        'SVG': () => !!(document.createElementNS),
        'LocalStorage': () => typeof localStorage !== 'undefined'
    }
};

function runCompatibilityTests() {
    console.log('=== TESTE DE COMPATIBILIDADE ===');
    displayBrowserInfo();
    
    let totalTests = 0;
    let passedTests = 0;
    
    Object.keys(compatibilityTests).forEach(category => {
        console.log(`\n--- ${category.toUpperCase()} ---`);
        
        Object.keys(compatibilityTests[category]).forEach(testName => {
            totalTests++;
            try {
                const result = compatibilityTests[category][testName]();
                if (result) passedTests++;
                console.log(`${testName}: ${result ? '✓ SUPORTADO' : '✗ NÃO SUPORTADO'}`);
            } catch (error) {
                console.log(`${testName}: ✗ ERRO - ${error.message}`);
            }
        });
    });
    
    const percentage = Math.round((passedTests / totalTests) * 100);
    console.log(`\n=== RESUMO ===`);
    console.log(`Compatibilidade: ${percentage}% (${passedTests}/${totalTests})`);
    
    if (percentage >= 90) {
        console.log('✓ Excelente compatibilidade!');
    } else if (percentage >= 75) {
        console.log('⚠ Boa compatibilidade, alguns recursos podem não funcionar');
    } else {
        console.log('✗ Compatibilidade limitada, considere atualizar o navegador');
    }
    
    return { percentage, passedTests, totalTests };
}

// Executar testes automaticamente
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', runCompatibilityTests);
} else {
    // Node.js environment
    module.exports = { runCompatibilityTests, getBrowserInfo };
}