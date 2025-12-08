// ===================================
// SMOOTH SCROLLING & NAVIGATION
// ===================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link
    updateActiveNavLink();
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===================================
// TYPING ANIMATION
// ===================================

const typingText = document.getElementById('typingText');
const roles = [
    'Full Stack Developer',
    'ML/AI Enthusiast',
    'Cybersecurity Explorer',
    'Problem Solver',
    'Open Source Contributor'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next role
    }
    
    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
typeRole();

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    animateOnScroll.observe(element);
});

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(element => {
    animateOnScroll.observe(element);
});

// ===================================
// BACK TO TOP BUTTON
// ===================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// CONTACT FORM HANDLING WITH EMAILJS
// ===================================

// Initialize EmailJS (replace with your credentials)
(function() {
    emailjs.init("5aqCUevY548PMhDx2"); // Your EmailJS public key
})();

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm('service_t10t0rn', 'template_p8xhwjq', contactForm)
        .then(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, (error) => {
            showNotification('Failed to send message. Please try again or email me directly.', 'error');
            console.error('EmailJS error:', error);
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #807094 0%, #ef98a7 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
        color: #fcfcfb;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease;
        font-weight: 600;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add notification animations to the page
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// DYNAMIC PROJECT IMAGES
// ===================================

// You'll replace these with actual project images
const projectImages = {
    'whatsapp-img': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%2325D366"/%3E%3Ctext x="400" y="200" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle"%3EWhatsApp Clone%3C/text%3E%3C/svg%3E',
    'netflix-img': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23E50914"/%3E%3Ctext x="400" y="200" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle"%3ENetflix Clone%3C/text%3E%3C/svg%3E',
    'wheat-img': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23FFB800"/%3E%3Ctext x="400" y="200" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle"%3EWheat Disease AI%3C/text%3E%3C/svg%3E',
    'campus-img': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%234FACFE"/%3E%3Ctext x="400" y="200" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle"%3EKIIT Pathfinder%3C/text%3E%3C/svg%3E',
    'weather-img': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%2300F2FE"/%3E%3Ctext x="400" y="200" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle"%3EWeather App%3C/text%3E%3C/svg%3E',
    'cyber-img': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23764BA2"/%3E%3Ctext x="400" y="200" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle"%3ECybersecurity Analysis%3C/text%3E%3C/svg%3E'
};

// Set project images
Object.keys(projectImages).forEach(id => {
    const img = document.getElementById(id);
    if (img) {
        img.src = projectImages[id];
    }
});

// ===================================
// CURSOR TRAIL EFFECT (PREMIUM TOUCH)
// ===================================

class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        // Create cursor dots
        for (let i = 0; i < 10; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #807094 0%, #ef98a7 100%);
                border-radius: 50%;
                pointer-events: none;
                opacity: ${1 - i * 0.1};
                z-index: 99999;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(dot);
            this.dots.push({ element: dot, x: 0, y: 0 });
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Animate dots
        this.animate();
    }
    
    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;
        
        this.dots.forEach((dot, index) => {
            dot.element.style.left = `${x - 4}px`;
            dot.element.style.top = `${y - 4}px`;
            
            const nextDot = this.dots[index + 1] || this.dots[0];
            x += (nextDot.x - x) * 0.3;
            y += (nextDot.y - y) * 0.3;
            
            dot.x = x;
            dot.y = y;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Only enable on desktop
if (window.innerWidth > 768) {
    new CursorTrail();
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// EASTER EGGS
// ===================================

// Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            triggerEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerEasterEgg() {
    showNotification('🎉 You found the secret! You\'re a true developer!', 'success');
    
    // Add party mode
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #807094;');
console.log('%cWelcome to my portfolio. If you\'re reading this, you might be interested in the code!', 'font-size: 14px; color: #ef98a7;');
console.log('%cFeel free to check out my GitHub: https://github.com/Suchitdas18', 'font-size: 14px; color: #604f71;');
console.log('%c💡 Pro tip: Try the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) for a surprise!', 'font-size: 12px; color: #807094;');

// ===================================
// INITIALIZE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Add initial animation to hero section
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('aos-animate');
    }, 100);
});
