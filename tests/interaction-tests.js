// Testes de Interação e Animação - HatchCanvas Copy

class InteractionTestSuite {
    constructor() {
        this.testResults = [];
        this.animationTests = [];
        this.interactionTests = [];
        this.performanceMetrics = {};
        
        this.init();
    }

    init() {
        this.setupTestEnvironment();
        this.defineTests();
        console.log('🎭 Sistema de testes de interação inicializado');
    }

    setupTestEnvironment() {
        // Criar elementos de teste se necessário
        this.createTestElements();
        
        // Configurar observers
        this.setupPerformanceObserver();
        this.setupMutationObserver();
        this.setupIntersectionObserver();
    }

    createTestElements() {
        // Criar elementos temporários para testes
        const testContainer = document.createElement('div');
        testContainer.id = 'interaction-test-container';
        testContainer.style.cssText = `
            position: fixed;
            top: -1000px;
            left: -1000px;
            width: 100px;
            height: 100px;
            opacity: 0;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(testContainer);
    }

    defineTests() {
        // Testes de Hover Effects
        this.interactionTests = [
            { name: 'Botões respondem ao hover', test: () => this.testButtonHover() },
            { name: 'Links mudam cor ao hover', test: () => this.testLinkHover() },
            { name: 'Cards elevam ao hover', test: () => this.testCardHover() },
            { name: 'Imagens têm overlay ao hover', test: () => this.testImageHover() },
            { name: 'Ícones animam ao hover', test: () => this.testIconHover() }
        ];

        // Testes de Animações
        this.animationTests = [
            { name: 'Transições são suaves', test: () => this.testTransitionSmoothness() },
            { name: 'Animações têm duração adequada', test: () => this.testAnimationDuration() },
            { name: 'Scroll reveal funciona', test: () => this.testScrollReveal() },
            { name: 'Loading animations funcionam', test: () => this.testLoadingAnimations() },
            { name: 'Micro-interações respondem', test: () => this.testMicroInteractions() }
        ];
    }

    // Executar todos os testes
    async runAllTests() {
        console.log('🚀 Iniciando testes de interação...');
        
        this.testResults = [];
        
        try {
            // Testes de interação
            for (const test of this.interactionTests) {
                const result = await this.runTest(test, 'interaction');
                this.testResults.push(result);
            }
            
            // Testes de animação
            for (const test of this.animationTests) {
                const result = await this.runTest(test, 'animation');
                this.testResults.push(result);
            }
            
            // Testes específicos
            await this.testFormInteractions();
            await this.testNavigationInteractions();
            await this.testMobileInteractions();
            
            this.generateReport();
            
        } catch (error) {
            console.error('Erro durante testes de interação:', error);
        }
    }

    async runTest(testDef, category) {
        const startTime = performance.now();
        
        try {
            const result = await testDef.test();
            const endTime = performance.now();
            
            return {
                category,
                name: testDef.name,
                passed: result.passed !== false,
                details: result.details || '',
                duration: Math.round(endTime - startTime),
                timestamp: Date.now()
            };
            
        } catch (error) {
            const endTime = performance.now();
            
            return {
                category,
                name: testDef.name,
                passed: false,
                error: error.message,
                duration: Math.round(endTime - startTime),
                timestamp: Date.now()
            };
        }
    }

    // Testes específicos de hover
    async testButtonHover() {
        const buttons = document.querySelectorAll('.btn, button');
        let buttonsWithHover = 0;
        
        for (const button of buttons) {
            const styles = getComputedStyle(button);
            const transition = styles.transition;
            
            if (transition && transition !== 'all 0s ease 0s') {
                buttonsWithHover++;
            }
        }
        
        return {
            passed: buttonsWithHover > 0,
            details: `${buttonsWithHover}/${buttons.length} botões com hover effects`
        };
    }

    async testLinkHover() {
        const links = document.querySelectorAll('a, .nav-link');
        let linksWithHover = 0;
        
        for (const link of links) {
            // Simular hover
            link.dispatchEvent(new MouseEvent('mouseenter'));
            
            const styles = getComputedStyle(link);
            const transition = styles.transition;
            
            if (transition && transition !== 'all 0s ease 0s') {
                linksWithHover++;
            }
            
            link.dispatchEvent(new MouseEvent('mouseleave'));
        }
        
        return {
            passed: linksWithHover > 0,
            details: `${linksWithHover}/${links.length} links com hover effects`
        };
    }

    async testCardHover() {
        const cards = document.querySelectorAll('.card, .feature-card, .gallery-item');
        let cardsWithHover = 0;
        
        for (const card of cards) {
            const styles = getComputedStyle(card);
            const transition = styles.transition;
            const transform = styles.transform;
            
            if (transition.includes('transform') || transition.includes('box-shadow')) {
                cardsWithHover++;
            }
        }
        
        return {
            passed: cardsWithHover > 0,
            details: `${cardsWithHover}/${cards.length} cards com hover effects`
        };
    }

    async testImageHover() {
        const images = document.querySelectorAll('.gallery-item img, .hero-image');
        let imagesWithOverlay = 0;
        
        for (const img of images) {
            const parent = img.parentElement;
            const overlay = parent.querySelector('.overlay, .gallery-overlay');
            
            if (overlay) {
                imagesWithOverlay++;
            }
        }
        
        return {
            passed: imagesWithOverlay > 0,
            details: `${imagesWithOverlay}/${images.length} imagens com overlay`
        };
    }

    async testIconHover() {
        const icons = document.querySelectorAll('.icon, .social-link, .feature-icon');
        let iconsWithAnimation = 0;
        
        for (const icon of icons) {
            const styles = getComputedStyle(icon);
            const transition = styles.transition;
            
            if (transition && transition !== 'all 0s ease 0s') {
                iconsWithAnimation++;
            }
        }
        
        return {
            passed: iconsWithAnimation > 0,
            details: `${iconsWithAnimation}/${icons.length} ícones com animação`
        };
    }

    // Testes de animação
    async testTransitionSmoothness() {
        const elementsWithTransition = document.querySelectorAll('*');
        let smoothTransitions = 0;
        let totalTransitions = 0;
        
        for (const element of elementsWithTransition) {
            const styles = getComputedStyle(element);
            const transition = styles.transition;
            
            if (transition && transition !== 'all 0s ease 0s') {
                totalTransitions++;
                
                // Verificar se a duração está em um range adequado (100ms - 500ms)
                const durationMatch = transition.match(/(\d+(?:\.\d+)?)s/);
                if (durationMatch) {
                    const duration = parseFloat(durationMatch[1]) * 1000;
                    if (duration >= 100 && duration <= 500) {
                        smoothTransitions++;
                    }
                }
            }
        }
        
        const percentage = totalTransitions > 0 ? (smoothTransitions / totalTransitions) * 100 : 0;
        
        return {
            passed: percentage >= 80,
            details: `${smoothTransitions}/${totalTransitions} transições suaves (${Math.round(percentage)}%)`
        };
    }

    async testAnimationDuration() {
        const animatedElements = document.querySelectorAll('[class*="animate"], .scroll-reveal');
        let appropriateDurations = 0;
        
        for (const element of animatedElements) {
            const styles = getComputedStyle(element);
            const animationDuration = styles.animationDuration;
            
            if (animationDuration && animationDuration !== '0s') {
                const duration = parseFloat(animationDuration) * 1000;
                
                // Duração apropriada: 200ms - 1000ms
                if (duration >= 200 && duration <= 1000) {
                    appropriateDurations++;
                }
            }
        }
        
        return {
            passed: appropriateDurations > 0,
            details: `${appropriateDurations}/${animatedElements.length} animações com duração adequada`
        };
    }

    async testScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal, [data-aos]');
        
        if (revealElements.length === 0) {
            return {
                passed: false,
                details: 'Nenhum elemento com scroll reveal encontrado'
            };
        }
        
        // Simular scroll para testar reveal
        let revealedElements = 0;
        
        for (const element of revealElements) {
            // Verificar se elemento tem observer ou classe de animação
            const hasAnimation = element.classList.contains('revealed') || 
                                element.style.opacity !== '0';
            
            if (hasAnimation) {
                revealedElements++;
            }
        }
        
        return {
            passed: revealedElements > 0,
            details: `${revealedElements}/${revealElements.length} elementos com scroll reveal`
        };
    }

    async testLoadingAnimations() {
        const loadingElements = document.querySelectorAll('.loading, .spinner, [class*="load"]');
        
        return {
            passed: loadingElements.length > 0,
            details: `${loadingElements.length} elementos de loading encontrados`
        };
    }

    async testMicroInteractions() {
        const interactiveElements = document.querySelectorAll('button, .btn, input, textarea');
        let elementsWithMicroInteractions = 0;
        
        for (const element of interactiveElements) {
            // Testar focus
            element.focus();
            const focusStyles = getComputedStyle(element, ':focus');
            
            if (focusStyles.outline !== 'none' || focusStyles.boxShadow !== 'none') {
                elementsWithMicroInteractions++;
            }
            
            element.blur();
        }
        
        return {
            passed: elementsWithMicroInteractions > 0,
            details: `${elementsWithMicroInteractions}/${interactiveElements.length} elementos com micro-interações`
        };
    }

    // Testes específicos de formulário
    async testFormInteractions() {
        const forms = document.querySelectorAll('form');
        
        for (const form of forms) {
            // Testar validação visual
            const inputs = form.querySelectorAll('input, textarea');
            
            for (const input of inputs) {
                // Simular entrada inválida
                input.value = '';
                input.dispatchEvent(new Event('blur'));
                
                // Verificar se há feedback visual
                const hasErrorState = input.classList.contains('error') || 
                                    input.classList.contains('invalid') ||
                                    getComputedStyle(input).borderColor.includes('red');
                
                this.testResults.push({
                    category: 'form',
                    name: `Validação visual - ${input.name || input.type}`,
                    passed: hasErrorState,
                    details: hasErrorState ? 'Feedback visual presente' : 'Sem feedback visual',
                    timestamp: Date.now()
                });
            }
        }
    }

    // Testes de navegação
    async testNavigationInteractions() {
        // Testar menu mobile
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            // Simular clique
            mobileToggle.click();
            
            const menu = document.querySelector('.header-nav');
            const isActive = menu && menu.classList.contains('mobile-active');
            
            this.testResults.push({
                category: 'navigation',
                name: 'Menu mobile toggle',
                passed: isActive,
                details: isActive ? 'Menu abre ao clicar' : 'Menu não responde',
                timestamp: Date.now()
            });
            
            // Fechar menu
            if (isActive) {
                mobileToggle.click();
            }
        }
        
        // Testar scroll suave
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        if (navLinks.length > 0) {
            const smoothScrollEnabled = getComputedStyle(document.documentElement)
                .scrollBehavior === 'smooth';
            
            this.testResults.push({
                category: 'navigation',
                name: 'Scroll suave',
                passed: smoothScrollEnabled,
                details: smoothScrollEnabled ? 'Scroll suave habilitado' : 'Scroll suave não encontrado',
                timestamp: Date.now()
            });
        }
    }

    // Testes mobile específicos
    async testMobileInteractions() {
        // Simular viewport mobile
        const originalWidth = window.innerWidth;
        
        // Testar touch targets
        const touchElements = document.querySelectorAll('button, .btn, a, input');
        let adequateTouchTargets = 0;
        
        for (const element of touchElements) {
            const rect = element.getBoundingClientRect();
            const minSize = 44; // Tamanho mínimo recomendado
            
            if (rect.width >= minSize && rect.height >= minSize) {
                adequateTouchTargets++;
            }
        }
        
        this.testResults.push({
            category: 'mobile',
            name: 'Touch targets adequados',
            passed: adequateTouchTargets > 0,
            details: `${adequateTouchTargets}/${touchElements.length} elementos com tamanho adequado`,
            timestamp: Date.now()
        });
    }

    // Performance observers
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            // Observer para animações
            const animationObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure') {
                        this.performanceMetrics[entry.name] = entry.duration;
                    }
                }
            });
            
            try {
                animationObserver.observe({ entryTypes: ['measure'] });
            } catch (e) {
                console.warn('Performance Observer não suportado para measures');
            }
        }
    }

    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class') {
                    
                    // Detectar mudanças de classe que indicam animações
                    const target = mutation.target;
                    const newClasses = target.className;
                    
                    if (newClasses.includes('animate') || 
                        newClasses.includes('revealed') ||
                        newClasses.includes('active')) {
                        
                        console.log('Animação detectada:', target, newClasses);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        // Verificar se elemento tem animação de scroll reveal
                        if (element.classList.contains('scroll-reveal')) {
                            console.log('Scroll reveal ativado:', element);
                        }
                    }
                });
            });
            
            // Observar elementos com scroll reveal
            const revealElements = document.querySelectorAll('.scroll-reveal');
            revealElements.forEach(el => observer.observe(el));
        }
    }

    // Gerar relatório
    generateReport() {
        console.log('\n🎭 RELATÓRIO DE TESTES DE INTERAÇÃO');
        console.log('=====================================');
        
        const categories = [...new Set(this.testResults.map(r => r.category))];
        let totalTests = this.testResults.length;
        let passedTests = this.testResults.filter(r => r.passed).length;
        
        categories.forEach(category => {
            const categoryResults = this.testResults.filter(r => r.category === category);
            const categoryPassed = categoryResults.filter(r => r.passed).length;
            const categoryTotal = categoryResults.length;
            const percentage = Math.round((categoryPassed / categoryTotal) * 100);
            
            console.log(`\n${category.toUpperCase()}: ${categoryPassed}/${categoryTotal} (${percentage}%)`);
            
            categoryResults.forEach(result => {
                const status = result.passed ? '✅' : '❌';
                console.log(`  ${status} ${result.name}: ${result.details || result.error || ''}`);
            });
        });
        
        const overallPercentage = Math.round((passedTests / totalTests) * 100);
        console.log(`\n🎯 RESULTADO GERAL: ${passedTests}/${totalTests} (${overallPercentage}%)`);
        
        // Performance metrics
        if (Object.keys(this.performanceMetrics).length > 0) {
            console.log('\n⚡ MÉTRICAS DE PERFORMANCE:');
            Object.entries(this.performanceMetrics).forEach(([name, duration]) => {
                console.log(`  ${name}: ${duration.toFixed(2)}ms`);
            });
        }
        
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
            performanceMetrics: this.performanceMetrics,
            details: this.testResults
        };
    }

    // Testar elemento específico
    async testElementInteraction(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            return { passed: false, details: 'Elemento não encontrado' };
        }
        
        const tests = [];
        
        // Testar hover
        element.dispatchEvent(new MouseEvent('mouseenter'));
        const hoverStyles = getComputedStyle(element);
        tests.push({
            name: 'Hover effect',
            passed: hoverStyles.transition !== 'all 0s ease 0s',
            details: `Transition: ${hoverStyles.transition}`
        });
        element.dispatchEvent(new MouseEvent('mouseleave'));
        
        // Testar focus (se aplicável)
        if (element.tabIndex >= 0 || ['INPUT', 'BUTTON', 'A'].includes(element.tagName)) {
            element.focus();
            const focusStyles = getComputedStyle(element);
            tests.push({
                name: 'Focus state',
                passed: focusStyles.outline !== 'none' || focusStyles.boxShadow !== 'none',
                details: `Outline: ${focusStyles.outline}, Box-shadow: ${focusStyles.boxShadow}`
            });
            element.blur();
        }
        
        // Testar clique (se aplicável)
        if (['BUTTON', 'A'].includes(element.tagName) || element.classList.contains('btn')) {
            element.dispatchEvent(new MouseEvent('mousedown'));
            const activeStyles = getComputedStyle(element);
            tests.push({
                name: 'Active state',
                passed: activeStyles.transform !== 'none' || activeStyles.boxShadow !== 'none',
                details: `Transform: ${activeStyles.transform}`
            });
            element.dispatchEvent(new MouseEvent('mouseup'));
        }
        
        return {
            passed: tests.some(t => t.passed),
            details: tests.map(t => `${t.name}: ${t.passed ? 'OK' : 'FAIL'}`).join(', '),
            tests
        };
    }

    // Exportar resultados
    exportResults() {
        const report = this.generateReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `interaction-test-results-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Inicializar sistema de testes
const interactionTests = new InteractionTestSuite();

// Funções globais
window.runInteractionTests = () => interactionTests.runAllTests();
window.testElement = (selector) => interactionTests.testElementInteraction(selector);
window.exportInteractionResults = () => interactionTests.exportResults();

// Auto-executar após carregamento
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 Testes de interação carregados');
    console.log('Execute runInteractionTests() para iniciar');
    
    // Executar automaticamente após 3 segundos
    setTimeout(() => {
        interactionTests.runAllTests();
    }, 3000);
});

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractionTestSuite;
}