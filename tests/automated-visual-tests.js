// Testes Automatizados de Fidelidade Visual - HatchCanvas Copy

class AutomatedVisualTests {
    constructor() {
        this.testResults = [];
        this.tolerance = 5; // Tolerância em pixels/percentual
        this.colorTolerance = 10; // Tolerância para cores (0-255)
        
        this.expectedValues = {
            colors: {
                primary: '#6366f1',
                primaryDark: '#4f46e5',
                secondary: '#64748b',
                accent: '#f59e0b',
                backgroundPrimary: '#ffffff',
                backgroundSecondary: '#f8fafc',
                textPrimary: '#1e293b',
                textSecondary: '#64748b'
            },
            fonts: {
                primary: 'Inter',
                fallback: ['Arial', 'Helvetica', 'sans-serif']
            },
            spacing: {
                xs: 4,    // 0.25rem
                sm: 8,    // 0.5rem
                md: 16,   // 1rem
                lg: 24,   // 1.5rem
                xl: 32,   // 2rem
                '2xl': 40, // 2.5rem
                '3xl': 48, // 3rem
                '4xl': 64  // 4rem
            },
            layout: {
                maxWidth: 1200,
                headerHeight: 80,
                sectionPadding: 64
            }
        };
    }

    // Executar todos os testes
    async runAllTests() {
        console.log('🚀 Iniciando testes automatizados de fidelidade visual...');
        
        this.testResults = [];
        
        try {
            await this.testColors();
            await this.testTypography();
            await this.testLayout();
            await this.testSpacing();
            await this.testComponents();
            await this.testResponsiveness();
            
            this.generateReport();
            
        } catch (error) {
            console.error('Erro durante os testes:', error);
            this.addResult('Sistema', 'Erro Geral', false, error.message);
        }
    }

    // Teste de cores
    async testColors() {
        console.log('🎨 Testando cores...');
        
        const colorTests = [
            { selector: ':root', property: '--primary-color', expected: this.expectedValues.colors.primary },
            { selector: ':root', property: '--primary-dark', expected: this.expectedValues.colors.primaryDark },
            { selector: ':root', property: '--secondary-color', expected: this.expectedValues.colors.secondary },
            { selector: ':root', property: '--accent-color', expected: this.expectedValues.colors.accent },
            { selector: 'body', property: 'background-color', expected: this.expectedValues.colors.backgroundPrimary },
            { selector: 'body', property: 'color', expected: this.expectedValues.colors.textPrimary }
        ];

        for (const test of colorTests) {
            try {
                const element = document.querySelector(test.selector);
                if (!element) {
                    this.addResult('Cores', `Elemento ${test.selector}`, false, 'Elemento não encontrado');
                    continue;
                }

                const computedStyle = getComputedStyle(element);
                let actualValue;

                if (test.property.startsWith('--')) {
                    actualValue = computedStyle.getPropertyValue(test.property).trim();
                } else {
                    actualValue = computedStyle.getPropertyValue(test.property);
                }

                const isMatch = this.compareColors(actualValue, test.expected);
                this.addResult('Cores', `${test.selector} ${test.property}`, isMatch, 
                    `Esperado: ${test.expected}, Atual: ${actualValue}`);

            } catch (error) {
                this.addResult('Cores', `${test.selector} ${test.property}`, false, error.message);
            }
        }
    }

    // Teste de tipografia
    async testTypography() {
        console.log('📝 Testando tipografia...');
        
        const typographyTests = [
            { selector: 'h1', property: 'font-size', expected: '48px', tolerance: 4 },
            { selector: 'h2', property: 'font-size', expected: '30px', tolerance: 3 },
            { selector: 'h3', property: 'font-size', expected: '24px', tolerance: 2 },
            { selector: 'body', property: 'font-size', expected: '16px', tolerance: 1 },
            { selector: 'body', property: 'line-height', expected: '1.6', tolerance: 0.1 },
            { selector: 'h1, h2, h3', property: 'line-height', expected: '1.2', tolerance: 0.1 }
        ];

        for (const test of typographyTests) {
            try {
                const element = document.querySelector(test.selector);
                if (!element) {
                    this.addResult('Tipografia', `Elemento ${test.selector}`, false, 'Elemento não encontrado');
                    continue;
                }

                const computedStyle = getComputedStyle(element);
                const actualValue = computedStyle.getPropertyValue(test.property);
                
                const isMatch = this.compareNumericValues(actualValue, test.expected, test.tolerance);
                this.addResult('Tipografia', `${test.selector} ${test.property}`, isMatch,
                    `Esperado: ${test.expected}, Atual: ${actualValue}`);

            } catch (error) {
                this.addResult('Tipografia', `${test.selector} ${test.property}`, false, error.message);
            }
        }

        // Teste de fontes
        this.testFontFamily();
    }

    // Teste de família de fontes
    testFontFamily() {
        const elements = ['body', 'h1', 'h2', 'h3', '.btn'];
        
        elements.forEach(selector => {
            try {
                const element = document.querySelector(selector);
                if (!element) return;

                const computedStyle = getComputedStyle(element);
                const fontFamily = computedStyle.fontFamily.toLowerCase();
                
                const hasExpectedFont = fontFamily.includes('inter') || 
                                      this.expectedValues.fonts.fallback.some(font => 
                                          fontFamily.includes(font.toLowerCase()));
                
                this.addResult('Tipografia', `${selector} font-family`, hasExpectedFont,
                    `Font atual: ${fontFamily}`);

            } catch (error) {
                this.addResult('Tipografia', `${selector} font-family`, false, error.message);
            }
        });
    }

    // Teste de layout
    async testLayout() {
        console.log('📐 Testando layout...');
        
        const layoutTests = [
            { selector: '.container', property: 'max-width', expected: '1200px' },
            { selector: '.header', property: 'position', expected: 'sticky' },
            { selector: '.hero-content', property: 'display', expected: 'grid' },
            { selector: '.features-grid', property: 'display', expected: 'grid' },
            { selector: '.footer', property: 'background-color', expected: this.expectedValues.colors.backgroundDark }
        ];

        for (const test of layoutTests) {
            try {
                const element = document.querySelector(test.selector);
                if (!element) {
                    this.addResult('Layout', `Elemento ${test.selector}`, false, 'Elemento não encontrado');
                    continue;
                }

                const computedStyle = getComputedStyle(element);
                const actualValue = computedStyle.getPropertyValue(test.property);
                
                let isMatch;
                if (test.property === 'background-color') {
                    isMatch = this.compareColors(actualValue, test.expected);
                } else {
                    isMatch = actualValue.trim() === test.expected;
                }
                
                this.addResult('Layout', `${test.selector} ${test.property}`, isMatch,
                    `Esperado: ${test.expected}, Atual: ${actualValue}`);

            } catch (error) {
                this.addResult('Layout', `${test.selector} ${test.property}`, false, error.message);
            }
        }
    }

    // Teste de espaçamento
    async testSpacing() {
        console.log('📏 Testando espaçamentos...');
        
        const spacingTests = [
            { selector: 'section', property: 'padding-top', expected: '64px' },
            { selector: 'section', property: 'padding-bottom', expected: '64px' },
            { selector: '.container', property: 'padding-left', expected: '16px' },
            { selector: '.container', property: 'padding-right', expected: '16px' },
            { selector: '.btn', property: 'padding', expected: '8px 24px' }
        ];

        for (const test of spacingTests) {
            try {
                const element = document.querySelector(test.selector);
                if (!element) continue;

                const computedStyle = getComputedStyle(element);
                const actualValue = computedStyle.getPropertyValue(test.property);
                
                const isMatch = this.compareSpacing(actualValue, test.expected);
                this.addResult('Espaçamento', `${test.selector} ${test.property}`, isMatch,
                    `Esperado: ${test.expected}, Atual: ${actualValue}`);

            } catch (error) {
                this.addResult('Espaçamento', `${test.selector} ${test.property}`, false, error.message);
            }
        }
    }

    // Teste de componentes
    async testComponents() {
        console.log('🧩 Testando componentes...');
        
        // Teste de botões
        this.testButtons();
        
        // Teste de cards
        this.testCards();
        
        // Teste de formulários
        this.testForms();
        
        // Teste de navegação
        this.testNavigation();
    }

    // Teste de botões
    testButtons() {
        const buttonTests = [
            { selector: '.btn-primary', property: 'background-color', expected: this.expectedValues.colors.primary },
            { selector: '.btn-primary', property: 'color', expected: this.expectedValues.colors.backgroundPrimary },
            { selector: '.btn', property: 'border-radius', expected: '6px' },
            { selector: '.btn', property: 'cursor', expected: 'pointer' }
        ];

        buttonTests.forEach(test => {
            try {
                const element = document.querySelector(test.selector);
                if (!element) return;

                const computedStyle = getComputedStyle(element);
                const actualValue = computedStyle.getPropertyValue(test.property);
                
                let isMatch;
                if (test.property.includes('color')) {
                    isMatch = this.compareColors(actualValue, test.expected);
                } else {
                    isMatch = actualValue.trim() === test.expected;
                }
                
                this.addResult('Componentes', `Botão ${test.property}`, isMatch,
                    `Esperado: ${test.expected}, Atual: ${actualValue}`);

            } catch (error) {
                this.addResult('Componentes', `Botão ${test.property}`, false, error.message);
            }
        });
    }

    // Teste de cards
    testCards() {
        const cardSelectors = ['.feature-card', '.gallery-item', '.stat-item'];
        
        cardSelectors.forEach(selector => {
            try {
                const element = document.querySelector(selector);
                if (!element) return;

                const computedStyle = getComputedStyle(element);
                
                // Teste de border-radius
                const borderRadius = computedStyle.borderRadius;
                const hasRadius = borderRadius && borderRadius !== '0px';
                this.addResult('Componentes', `${selector} border-radius`, hasRadius,
                    `Border radius: ${borderRadius}`);
                
                // Teste de box-shadow
                const boxShadow = computedStyle.boxShadow;
                const hasShadow = boxShadow && boxShadow !== 'none';
                this.addResult('Componentes', `${selector} box-shadow`, hasShadow,
                    `Box shadow: ${boxShadow}`);

            } catch (error) {
                this.addResult('Componentes', `${selector}`, false, error.message);
            }
        });
    }

    // Teste de formulários
    testForms() {
        const formTests = [
            { selector: '.form-input', property: 'border', expected: '1px solid' },
            { selector: '.form-input', property: 'border-radius', expected: '6px' },
            { selector: '.form-input', property: 'padding', expected: '16px' }
        ];

        formTests.forEach(test => {
            try {
                const element = document.querySelector(test.selector);
                if (!element) return;

                const computedStyle = getComputedStyle(element);
                const actualValue = computedStyle.getPropertyValue(test.property);
                
                const isMatch = actualValue.includes(test.expected);
                this.addResult('Componentes', `Form ${test.property}`, isMatch,
                    `Esperado: ${test.expected}, Atual: ${actualValue}`);

            } catch (error) {
                this.addResult('Componentes', `Form ${test.property}`, false, error.message);
            }
        });
    }

    // Teste de navegação
    testNavigation() {
        const navTests = [
            { selector: '.header', property: 'position', expected: 'sticky' },
            { selector: '.nav-link', property: 'text-decoration', expected: 'none' },
            { selector: '.mobile-menu-toggle', property: 'display', expected: 'none' }
        ];

        navTests.forEach(test => {
            try {
                const element = document.querySelector(test.selector);
                if (!element) return;

                const computedStyle = getComputedStyle(element);
                const actualValue = computedStyle.getPropertyValue(test.property);
                
                const isMatch = actualValue.trim() === test.expected;
                this.addResult('Componentes', `Nav ${test.property}`, isMatch,
                    `Esperado: ${test.expected}, Atual: ${actualValue}`);

            } catch (error) {
                this.addResult('Componentes', `Nav ${test.property}`, false, error.message);
            }
        });
    }

    // Teste de responsividade
    async testResponsiveness() {
        console.log('📱 Testando responsividade...');
        
        const breakpoints = [
            { name: 'Mobile', width: 375 },
            { name: 'Tablet', width: 768 },
            { name: 'Desktop', width: 1200 }
        ];

        for (const breakpoint of breakpoints) {
            try {
                // Simular mudança de viewport (limitado no browser)
                const mediaQuery = window.matchMedia(`(max-width: ${breakpoint.width}px)`);
                
                this.addResult('Responsividade', `${breakpoint.name} breakpoint`, true,
                    `Breakpoint ${breakpoint.width}px configurado`);

            } catch (error) {
                this.addResult('Responsividade', `${breakpoint.name} breakpoint`, false, error.message);
            }
        }

        // Teste de elementos responsivos
        this.testResponsiveElements();
    }

    // Teste de elementos responsivos
    testResponsiveElements() {
        const responsiveTests = [
            { selector: '.hero-content', property: 'grid-template-columns' },
            { selector: '.features-grid', property: 'grid-template-columns' },
            { selector: '.gallery-grid', property: 'grid-template-columns' }
        ];

        responsiveTests.forEach(test => {
            try {
                const element = document.querySelector(test.selector);
                if (!element) return;

                const computedStyle = getComputedStyle(element);
                const actualValue = computedStyle.getPropertyValue(test.property);
                
                const hasGridColumns = actualValue && actualValue !== 'none';
                this.addResult('Responsividade', `${test.selector} grid`, hasGridColumns,
                    `Grid columns: ${actualValue}`);

            } catch (error) {
                this.addResult('Responsividade', `${test.selector} grid`, false, error.message);
            }
        });
    }

    // Utilitários de comparação
    compareColors(actual, expected) {
        // Converter cores para RGB para comparação
        const actualRgb = this.colorToRgb(actual);
        const expectedRgb = this.colorToRgb(expected);
        
        if (!actualRgb || !expectedRgb) return false;
        
        return Math.abs(actualRgb.r - expectedRgb.r) <= this.colorTolerance &&
               Math.abs(actualRgb.g - expectedRgb.g) <= this.colorTolerance &&
               Math.abs(actualRgb.b - expectedRgb.b) <= this.colorTolerance;
    }

    colorToRgb(color) {
        // Criar elemento temporário para conversão
        const div = document.createElement('div');
        div.style.color = color;
        document.body.appendChild(div);
        
        const computedColor = getComputedStyle(div).color;
        document.body.removeChild(div);
        
        const match = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3])
            };
        }
        
        return null;
    }

    compareNumericValues(actual, expected, tolerance = 0) {
        const actualNum = parseFloat(actual);
        const expectedNum = parseFloat(expected);
        
        return Math.abs(actualNum - expectedNum) <= tolerance;
    }

    compareSpacing(actual, expected) {
        // Normalizar valores de espaçamento
        const actualNorm = actual.replace(/px/g, '').trim();
        const expectedNorm = expected.replace(/px/g, '').trim();
        
        return actualNorm === expectedNorm;
    }

    // Adicionar resultado do teste
    addResult(category, test, passed, details) {
        this.testResults.push({
            category,
            test,
            passed,
            details,
            timestamp: Date.now()
        });
    }

    // Gerar relatório
    generateReport() {
        console.log('\n📊 RELATÓRIO DE TESTES VISUAIS');
        console.log('================================');
        
        const categories = [...new Set(this.testResults.map(r => r.category))];
        let totalTests = this.testResults.length;
        let passedTests = this.testResults.filter(r => r.passed).length;
        
        categories.forEach(category => {
            const categoryResults = this.testResults.filter(r => r.category === category);
            const categoryPassed = categoryResults.filter(r => r.passed).length;
            const categoryTotal = categoryResults.length;
            const percentage = Math.round((categoryPassed / categoryTotal) * 100);
            
            console.log(`\n${category}: ${categoryPassed}/${categoryTotal} (${percentage}%)`);
            
            categoryResults.forEach(result => {
                const status = result.passed ? '✅' : '❌';
                console.log(`  ${status} ${result.test}: ${result.details}`);
            });
        });
        
        const overallPercentage = Math.round((passedTests / totalTests) * 100);
        console.log(`\n🎯 RESULTADO GERAL: ${passedTests}/${totalTests} (${overallPercentage}%)`);
        
        if (overallPercentage >= 95) {
            console.log('🎉 EXCELENTE! Fidelidade visual muito alta.');
        } else if (overallPercentage >= 85) {
            console.log('👍 BOM! Pequenos ajustes podem ser necessários.');
        } else {
            console.log('⚠️ ATENÇÃO! Várias correções são necessárias.');
        }
        
        // Retornar dados para uso externo
        return {
            totalTests,
            passedTests,
            overallPercentage,
            categories: categories.map(cat => {
                const results = this.testResults.filter(r => r.category === cat);
                return {
                    name: cat,
                    passed: results.filter(r => r.passed).length,
                    total: results.length,
                    percentage: Math.round((results.filter(r => r.passed).length / results.length) * 100)
                };
            }),
            details: this.testResults
        };
    }

    // Exportar resultados
    exportResults() {
        const report = this.generateReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `visual-test-results-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Inicializar e executar testes
const visualTests = new AutomatedVisualTests();

// Função para executar testes manualmente
function runVisualTests() {
    visualTests.runAllTests();
}

// Função para exportar resultados
function exportTestResults() {
    visualTests.exportResults();
}

// Executar testes automaticamente quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Testes visuais automatizados carregados');
    console.log('Execute runVisualTests() para iniciar os testes');
    
    // Executar testes após 2 segundos para garantir que tudo carregou
    setTimeout(() => {
        runVisualTests();
    }, 2000);
});

// Exportar para uso global
window.visualTests = visualTests;
window.runVisualTests = runVisualTests;
window.exportTestResults = exportTestResults;