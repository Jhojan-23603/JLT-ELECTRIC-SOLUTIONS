/**
 * JLT ELECTRIC - Professional Electrician Website
 * Téc. Electricista Jhonatan Luna Titirico - Bolivia
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('#navbar ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('#navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Projects tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.nombre || !data.telefono || !data.tipo || !data.mensaje) {
                showNotification('Por favor complete todos los campos obligatorios', 'error');
                return;
            }
            
            // Email validation
            if (data.email && !isValidEmail(data.email)) {
                showNotification('Por favor ingrese un correo electrónico válido', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('¡Mensaje enviado correctamente! Nos contactaremos con usted pronto.', 'success');
            
            // Reset form
            this.reset();
            
            // In a real scenario, you would send the data to a server here
            console.log('Form data:', data);
        });
    }

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Create particles
    createParticles();

    // Console welcome message
    console.log('%c⚡ JLT ELECTRIC - Téc. Electricista Jhonatan Luna Titirico', 'color: #FFD700; font-size: 20px; font-weight: bold;');
    console.log('%cBolivia - Servicios Eléctricos Profesionales', 'color: #1a1a2e; font-size: 14px;');
    console.log('%c© 2025 Todos los derechos reservados', 'color: #666; font-size: 12px;');

    // Inicializar calculadoras
    calcularAhorro();
    calcularCapacidad();
    
    // Inicializar chat widget cerrado
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        chatWidget.classList.add('closed');
    }
});

// Chat Widget Functions
function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    chatWidget.classList.toggle('closed');
}

function sendChatOption(option) {
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<div class="chat-bubble">${option}</div>`;
    messagesContainer.appendChild(userMessage);
    
    // Add bot response after delay
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        
        let response = '';
        if (option.includes('emergencia')) {
            response = 'Entendido. Para emergencias eléctricas, te conecto directamente con un técnico disponible 24/7. Haz clic en "Hablar con un técnico" abajo.';
        } else if (option.includes('cotización')) {
            response = 'Perfecto! Haz clic en el botón verde "Hablar con un técnico" y cuéntanos qué necesitas. Te enviaremos una cotización en menos de 1 hora.';
        } else if (option.includes('información')) {
            response = 'Claro! Ofrecemos instalaciones eléctricas, cambio a LED, aterramientos, mantenimiento y emergencias 24/7. ¿Sobre cuál servicio necesitas más información?';
        } else if (option.includes('visita')) {
            response = 'Excelente! Cuéntanos tu ubicación y preferencia de fecha/hora por WhatsApp y coordinaremos una visita técnica gratuita para evaluar tu proyecto.';
        }
        
        botMessage.innerHTML = `<div class="chat-bubble">${response}</div>`;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
}

// Modal Functions
function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('quoteModal');
    if (event.target === modal) {
        closeQuoteModal();
    }
}

// Quick Quote Form
const quickQuoteForm = document.getElementById('quickQuoteForm');
if (quickQuoteForm) {
    quickQuoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tipo = document.getElementById('quoteType').value;
        const ubicacion = document.getElementById('quoteLocation').value;
        const telefono = document.getElementById('quotePhone').value;
        const urgencia = document.getElementById('quoteUrgency').checked;
        
        let mensaje = `Hola, solicito una cotización:\n`;
        mensaje += `- Tipo: ${tipo}\n`;
        mensaje += `- Ubicación: ${ubicacion}\n`;
        mensaje += `- Teléfono: ${telefono}\n`;
        if (urgencia) mensaje += `- ES EMERGENCIA/URGENTE`;
        
        const encodedMsg = encodeURIComponent(mensaje);
        window.open(`https://wa.me/59171227559?text=${encodedMsg}`, '_blank');
        
        closeQuoteModal();
        showNotification('Redirigiendo a WhatsApp...', 'success');
    });
}

// Diagnostic Questionnaire
function evaluarDiagnostico() {
    const sintomas = document.querySelectorAll('.symptom-item input:checked');
    const resultDiv = document.getElementById('diagnosticResult');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultDesc = document.getElementById('resultDescription');
    const emergencyBtn = document.getElementById('emergencyBtn');
    
    if (sintomas.length === 0) {
        showNotification('Por favor selecciona al menos un síntoma', 'error');
        return;
    }
    
    let riesgoAlto = 0;
    let riesgoMedio = 0;
    
    sintomas.forEach(s => {
        const risk = s.getAttribute('data-risk');
        if (risk === 'alto') riesgoAlto++;
        if (risk === 'medio') riesgoMedio++;
    });
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
    
    if (riesgoAlto > 0) {
        resultIcon.className = 'result-icon danger';
        resultIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        resultTitle.textContent = '⚠️ ¡RIESGO ELÉCTRICO DETECTADO!';
        resultDesc.innerHTML = `Has marcado <strong>${riesgoAlto} síntoma(s) de alto riesgo</strong>. Esto indica una situación potencialmente peligrosa que requiere atención INMEDIATA de un electricista profesional. No esperes más, tu seguridad es lo primero.`;
        emergencyBtn.style.display = 'inline-flex';
    } else if (riesgoMedio > 0) {
        resultIcon.className = 'result-icon warning';
        resultIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        resultTitle.textContent = '⚡ Revisión Recomendada';
        resultDesc.innerHTML = `Has marcado <strong>${riesgoMedio} síntoma(s)</strong> que indican posibles problemas en tu instalación eléctrica. Te recomendamos agendar una revisión preventiva para evitar mayores complicaciones.`;
        emergencyBtn.style.display = 'none';
    } else {
        resultIcon.className = 'result-icon safe';
        resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        resultTitle.textContent = '✅ Instalación Aparentemente en Buen Estado';
        resultDesc.innerHTML = 'Los síntomas que marcaste son de bajo riesgo, pero te recomendamos una revisión preventiva anual para mantener tu instalación en óptimas condiciones.';
        emergencyBtn.style.display = 'none';
    }
}

// Capacity Calculator
function calcularCapacidad() {
    const capacidadMedidor = parseInt(document.getElementById('capacidadMedidor').value) || 0;
    const voltaje = 220; // Voltaje en Bolivia
    const potenciaMaxima = capacidadMedidor * voltaje; // Watts totales disponibles
    
    // Obtener cantidades de artefactos
    const artefactos = {
        leds: { cantidad: parseInt(document.getElementById('leds').value) || 0, potencia: 10 },
        tv: { cantidad: parseInt(document.getElementById('tv').value) || 0, potencia: 150 },
        computadora: { cantidad: parseInt(document.getElementById('computadora').value) || 0, potencia: 300 },
        refrigerador: { cantidad: parseInt(document.getElementById('refrigerador').value) || 0, potencia: 400 },
        microondas: { cantidad: parseInt(document.getElementById('microondas').value) || 0, potencia: 1200 },
        cocina: { cantidad: parseInt(document.getElementById('cocina').value) || 0, potencia: 3000 },
        terma: { cantidad: parseInt(document.getElementById('terma').value) || 0, potencia: 1500 },
        lavadora: { cantidad: parseInt(document.getElementById('lavadora').value) || 0, potencia: 800 }
    };
    
    // Calcular consumo total
    let consumoTotal = 0;
    for (let key in artefactos) {
        consumoTotal += artefactos[key].cantidad * artefactos[key].potencia;
    }
    
    // Calcular porcentaje de uso
    const porcentajeUso = Math.min((consumoTotal / potenciaMaxima) * 100, 100);
    
    // Actualizar medidores
    const consumptionMeter = document.getElementById('consumptionMeter');
    const capacityMeter = document.getElementById('capacityMeter');
    const consumptionText = document.getElementById('consumptionText');
    const capacityText = document.getElementById('capacityText');
    const verdict = document.getElementById('capacityVerdict');
    const recommendation = document.getElementById('capacityRecommendation');
    
    if (consumptionMeter) {
        consumptionMeter.style.width = `${Math.min((consumoTotal / 10000) * 100, 100)}%`;
        consumptionText.textContent = `${consumoTotal}W / ${potenciaMaxima}W`;
        
        capacityMeter.style.width = `${porcentajeUso}%`;
        capacityText.textContent = `${porcentajeUso.toFixed(1)}%`;
        
        // Cambiar color según porcentaje
        if (porcentajeUso < 60) {
            capacityMeter.style.background = '#28a745';
            verdict.className = 'capacity-verdict safe';
            verdict.innerHTML = '<i class="fas fa-check-circle"></i><p><strong>¡Todo bien!</strong><br>Tu instalación soporta cómodamente todos tus artefactos.</p>';
            recommendation.style.display = 'none';
        } else if (porcentajeUso < 85) {
            capacityMeter.style.background = '#ffc107';
            verdict.className = 'capacity-verdict warning';
            verdict.innerHTML = '<i class="fas fa-exclamation-circle"></i><p><strong>Atención</strong><br>Estás usando más del 60% de tu capacidad. Evita usar varios artefactos de alto consumo simultáneamente.</p>';
            recommendation.style.display = 'block';
            recommendation.innerHTML = '<i class="fas fa-lightbulb"></i> <strong>Recomendación:</strong> Considera no usar la terma y la cocina eléctrica al mismo tiempo.';
        } else {
            capacityMeter.style.background = '#dc3545';
            verdict.className = 'capacity-verdict danger';
            verdict.innerHTML = '<i class="fas fa-exclamation-triangle"></i><p><strong>¡Sobrecarga!</strong><br>Tu instalación está al límite. Puedes tener cortes de luz o daños en los equipos.</p>';
            recommendation.style.display = 'block';
            recommendation.innerHTML = '<i class="fas fa-arrow-up"></i> <strong>Acción recomendada:</strong> Solicita una evaluación para aumentar la capacidad de tu medidor.';
        }
    }
}

// Blog Modal
function showBlogModal(topic) {
    const contenidos = {
        'tablero': {
            title: '5 Señales de que tu Tablero Necesita Revisión',
            content: `
                <h4>1. Enchufes o interruptores calientes</h4>
                <p>Si al tocar los enchufes o interruptores sientes calor, esto indica una conexión deficiente o sobrecarga.</p>
                
                <h4>2. Olor a quemado</h4>
                <p>Cualquier olor a plástico o cable quemado es una señal de alerta inmediata. Desconecta todo y llama a un electricista.</p>
                
                <h4>3. Chispas al conectar</h4>
                <p>Las chispas ocasionales pueden ser normales, pero si son frecuentes o grandes, indican un problema grave.</p>
                
                <h4>4. Interruptores que saltan constantemente</h4>
                <p>Si los breakers se disparan frecuentemente, tu instalación está sobrecargada o hay cortocircuitos.</p>
                
                <h4>5. Tablero con más de 20 años</h4>
                <p>Los tableros antiguos no cumplen con las normas actuales de seguridad y pueden representar un riesgo.</p>
                
                <p><strong>¿Notas alguna de estas señales?</strong> No esperes a que sea tarde. Contáctanos para una evaluación profesional.</p>
            `
        },
        'verano': {
            title: 'Cómo Reducir tu Factura de Luz en Verano',
            content: `
                <h4>1. Usa ventiladores en lugar de aire acondicionado</h4>
                <p>Los ventiladores consumen 90% menos energía que un aire acondicionado y son muy efectivos en climas secos como La Paz.</p>
                
                <h4>2. Aprovecha la ventilación natural</h4>
                <p>Abre ventanas estratégicamente para crear corrientes de aire cruzado durante las horas más frescas del día.</p>
                
                <h4>3. Mantén tus electrodomésticos limpios</h4>
                <p>Un refrigerador con bobinas sucias consume hasta 30% más energía. Límpialas cada 3 meses.</p>
                
                <h4>4. Desconecta aparatos en standby</h4>
                <p>Los equipos en standby pueden representar hasta 10% de tu consumo mensual. Usa zapatillas con interruptor.</p>
                
                <h4>5. Cambia a iluminación LED</h4>
                <p>Los focos LED generan menos calor y consumen 85% menos. Usa nuestra calculadora para ver tu ahorro.</p>
            `
        },
        'enchufes': {
            title: '¿Cuándo Cambiar tus Enchufes y Tomas?',
            content: `
                <h4>Señales de que necesitas cambiarlos:</h4>
                <ul>
                    <li>Los enchufes se salen fácilmente o no hacen buen contacto</li>
                    <li>Hay decoloración o manchas oscuras alrededor</li>
                    <li>Escuchas chispidos o zumbidos</li>
                    <li>Los cables se calientan al usar</li>
                    <li>Tienen más de 15 años de uso</li>
                </ul>
                
                <h4>¿Por qué es importante?</h4>
                <p>Los enchufes desgastados son una de las principales causas de incendios eléctricos domésticos. El cambio es rápido, económico y puede salvar vidas.</p>
                
                <p><strong>Costo aproximado:</strong> Entre Bs. 15-30 por toma incluyendo instalación.</p>
            `
        },
        'protectores': {
            title: 'Protectores de Tensión: ¿Necesitas uno?',
            content: `
                <h4>¿Qué es un protector de tensión?</h4>
                <p>Es un dispositivo que protege tus electrodomésticos contra subidas y bajadas de voltaje, desconectando la corriente automáticamente.</p>
                
                <h4>¿Quién debería tener uno?</h4>
                <ul>
                    <li>Si vives en zonas con fluctuaciones frecuentes de luz</li>
                    <li>Si tienes equipos electrónicos valiosos (computadoras, TVs, neveras)</li>
                    <li>Si tu zona tiene sobretensiones por tormentas</li>
                    <li>Si has tenido equipos dañados por "quemadas"</li>
                </ul>
                
                <h4>Tipos disponibles:</h4>
                <ul>
                    <li><strong>Individual:</strong> Para un solo equipo (Bs. 50-150)</li>
                    <li><strong>General:</strong> Protege toda la casa (Bs. 200-500)</li>
                    <li><strong>Con estabilizador:</strong> Regula y protege (Bs. 400-1500)</li>
                </ul>
            `
        }
    };
    
    const data = contenidos[topic];
    if (data) {
        // Create modal dynamically
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <h3><i class="fas fa-lightbulb" style="color: var(--primary-color);"></i> ${data.title}</h3>
                <div style="line-height: 1.8; color: var(--gray-text);">
                    ${data.content}
                </div>
                <div style="margin-top: 30px; padding: 20px; background: rgba(255,215,0,0.1); border-radius: 10px; text-align: center;">
                    <p style="margin-bottom: 15px;"><strong>¿Tienes dudas sobre tu instalación?</strong></p>
                    <a href="https://wa.me/59171227559" class="btn btn-primary" target="_blank">
                        <i class="fab fa-whatsapp"></i> Consultar Gratis
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        };
    }
}

// Checklist Form
const checklistForm = document.getElementById('checklistForm');
if (checklistForm) {
    checklistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate download
        showNotification('¡Checklist enviado a tu correo! Revisa tu bandeja de entrada.', 'success');
        
        // In real scenario, you would send to a backend
        setTimeout(() => {
            window.open('https://wa.me/59171227559?text=Hola,%20descargué%20el%20checklist%20de%20seguridad', '_blank');
        }, 2000);
        
        this.reset();
    });
}

// FAQ Toggle Function
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Cerrar todos los FAQ abiertos
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir el clickeado si no estaba activo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Calculadora de Ahorro LED
function calcularAhorro() {
    // Obtener valores
    const cantidad = parseInt(document.getElementById('cantidad').value) || 0;
    const potencia = parseInt(document.getElementById('potencia').value) || 0;
    const potenciaLed = parseInt(document.getElementById('potenciaLed').value) || 0;
    const horas = parseInt(document.getElementById('horas').value) || 0;
    const costo = parseFloat(document.getElementById('costo').value) || 0;

    if (cantidad > 0 && potencia > 0 && potenciaLed > 0 && horas > 0 && costo > 0) {
        // Cálculos consumo actual
        const consumoDiario = (cantidad * potencia * horas) / 1000; // kWh
        const consumoMensual = consumoDiario * 30;
        const costoMensualActual = consumoMensual * costo;

        // Cálculos consumo LED específico (según selección del usuario)
        const consumoDiarioLED = (cantidad * potenciaLed * horas) / 1000;
        const consumoMensualLED = consumoDiarioLED * 30;
        const costoMensualLED = consumoMensualLED * costo;

        // Ahorros
        const ahorroMensual = costoMensualActual - costoMensualLED;
        const ahorroAnual = ahorroMensual * 12;
        const porcentaje = Math.round(((costoMensualActual - costoMensualLED) / costoMensualActual) * 100);

        // Cálculo de reducción de CO2 (aproximadamente 0.5 kg CO2 por kWh ahorrado en Bolivia)
        const kWhAhorradosAnuales = (consumoMensual - consumoMensualLED) * 12;
        const reduccionCO2 = kWhAhorradosAnuales * 0.5;

        // Actualizar resultados
        document.getElementById('consumoActual').textContent = 'Bs. ' + costoMensualActual.toFixed(2);
        document.getElementById('consumoLed').textContent = 'Bs. ' + costoMensualLED.toFixed(2);
        document.getElementById('ahorroMensual').textContent = 'Bs. ' + ahorroMensual.toFixed(2);
        document.getElementById('ahorroAnual').textContent = 'Bs. ' + ahorroAnual.toFixed(2);
        document.getElementById('porcentaje').textContent = porcentaje + '%';
        document.getElementById('reduccionCO2').textContent = reduccionCO2.toFixed(1) + ' kg';
    }
}

// Event listeners para la calculadora
document.addEventListener('DOMContentLoaded', function() {
    const calcInputs = document.querySelectorAll('#cantidad, #potencia, #potenciaLed, #horas, #costo');
    calcInputs.forEach(input => {
        input.addEventListener('input', calcularAhorro);
        input.addEventListener('change', calcularAhorro);
    });
    
    // Animación de estadísticas
    const statsSection = document.querySelector('.stats-animated');
    if (statsSection) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statsObserver.observe(statsSection);
    }
});

// Animación de números de estadísticas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number-large');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateStat = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target + (stat.parentElement.querySelector('.stat-label-large').textContent.includes('%') ? '' : '+');
            }
        };
        
        updateStat();
    });
}

// Notification function
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const animationDelay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: ${Math.random() * 100}%;
            animation-duration: ${animationDuration}s;
            animation-delay: ${animationDelay}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
