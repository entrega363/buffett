// JavaScript principal do HatchCanvas

// Aguarda o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('HatchCanvas Copy - Site carregado');
    initializeApp();
});

// Função principal de inicialização
function initializeApp() {
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initScrollIndicator();
    initFormValidation();
    initCounterAnimation();
    initTypingEffect();
    console.log('Todas as funcionalidades inicializadas');
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');
    
    if (mobileToggle && headerNav) {
        mobileToggle.addEventListener('click', function() {
            const isActive = mobileToggle.classList.contains('active');
            
            if (isActive) {
                mobileToggle.classList.remove('active');
                headerNav.classList.remove('mobile-active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            } else {
                mobileToggle.classList.add('active');
                headerNav.classList.add('mobile-active');
                mobileToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                headerNav.classList.remove('mobile-active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', utils.debounce(() => {
            if (window.innerWidth > 768) {
                mobileToggle.classList.remove('active');
                headerNav.classList.remove('mobile-active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }, 250));
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar link ativo
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Atualizar link ativo na navegação
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    if (revealElements.length === 0) {
        // Adicionar classes automaticamente aos elementos
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                section.classList.add('scroll-reveal');
            } else {
                section.classList.add('scroll-reveal-left');
            }
        });
        
        const cards = document.querySelectorAll('.feature-card, .gallery-item');
        cards.forEach(card => {
            card.classList.add('scroll-reveal');
        });
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
        observer.observe(el);
    });
}

// ===== INDICADOR DE SCROLL =====
function initScrollIndicator() {
    // Criar indicador se não existir
    let indicator = document.querySelector('.scroll-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        document.body.appendChild(indicator);
    }
    
    window.addEventListener('scroll', utils.debounce(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        indicator.style.width = scrollPercent + '%';
    }, 10));
}/
/ ===== VALIDAÇÃO DE FORMULÁRIO =====
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validação básica
            if (validateForm(data)) {
                showFormSuccess();
                form.reset();
            } else {
                showFormError();
            }
        });
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Validar nome
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Nome deve ter pelo menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Email inválido');
        isValid = false;
    }
    
    // Validar assunto
    if (!data.subject || data.subject.trim().length < 3) {
        showFieldError('subject', 'Assunto deve ter pelo menos 3 caracteres');
        isValid = false;
    }
    
    // Validar mensagem
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'Nome deve ter pelo menos 2 caracteres');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldName, 'Email inválido');
                return false;
            }
            break;
        case 'subject':
            if (value.length < 3) {
                showFieldError(fieldName, 'Assunto deve ter pelo menos 3 caracteres');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'Mensagem deve ter pelo menos 10 caracteres');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const formGroup = field.closest('.form-group');
    
    // Remover erro anterior
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Adicionar novo erro
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error-color)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--spacing-xs)';
    errorElement.style.display = 'block';
    
    formGroup.appendChild(errorElement);
    field.classList.add('error-state');
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('error-state');
}

function showFormSuccess() {
    showNotification('Mensagem enviada com sucesso!', 'success');
}

function showFormError() {
    showNotification('Por favor, corrija os erros no formulário.', 'error');
}

function showNotification(message, type) {
    // Criar notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}-state`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-md);
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform var(--transition-normal);
        background-color: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== ANIMAÇÃO DE CONTADOR =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// ===== EFEITO DE TYPING =====
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Piscar cursor por um tempo
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Iniciar quando elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// ===== UTILITÁRIOS =====
const utils = {
    // Função para debounce (otimização de performance)
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Função para detectar dispositivo móvel
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Função para detectar se elemento está visível
    isElementVisible: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Função para scroll suave para elemento
    scrollToElement: function(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// ===== NAVEGAÇÃO ATIVA BASEADA NO SCROLL =====
window.addEventListener('scroll', utils.debounce(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}, 100));