// ==========================================
// NAVBAR - Sticky & Scroll Effects
// ==========================================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ==========================================
// MOBILE MENU
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ACTIVE NAV LINK BASED ON SCROLL
// ==========================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==========================================
// ACTIVIDADES SLIDER
// ==========================================

const actividadesTrack = document.getElementById('actividadesTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.querySelectorAll('#sliderDots .dot');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.actividad-card').length;

function updateSlider() {
    const offset = -currentSlide * 100;
    actividadesTrack.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    sliderDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

// Dot navigation
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto-slide every 5 seconds
let autoSlideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}, 5000);

// Pause auto-slide on hover
const actividadesSection = document.querySelector('.actividades-slider');
actividadesSection.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

actividadesSection.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    } else if (e.key === 'ArrowRight') {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
});

// ==========================================
// PAGINATION DOTS (Randomised Words Section)
// ==========================================

const paginationDots = document.querySelectorAll('.pagination-dot');
let currentPage = 0;

paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        paginationDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        currentPage = index;
        // You can add content switching logic here if needed
    });
});

// ==========================================
// SCROLL ANIMATIONS (Simple AOS Alternative)
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// CARD HOVER EFFECTS
// ==========================================

const lecturaCards = document.querySelectorAll('.lectura-card');

lecturaCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// DYNAMIC YEAR IN FOOTER
// ==========================================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${currentYear} Cúmulo - Semillero de Astronomía. Todos los derechos reservados.`;
}

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%c✨ Bienvenido a Cúmulo ✨', 'font-size: 20px; color: #FFA912; font-weight: bold;');
console.log('%c🌌 Explora el universo con nosotros', 'font-size: 14px; color: #5054AF;');
console.log('%c🔭 Desarrollado con pasión por la astronomía', 'font-size: 12px; color: #191241;');

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events for performance
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
});

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// FORM HANDLING (if you add a form later)
// ==========================================

// Example form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // You can add AJAX submission here
    // For now, just show a success message
    alert('¡Gracias por tu interés en Cúmulo! Te contactaremos pronto.');
    e.target.reset();
}

// Add this to your form element: onsubmit="handleFormSubmit(event)"

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

// Add keyboard navigation for cards
document.querySelectorAll('.lectura-card, .actividad-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
        
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.focus();
        }
    });
}

if (navMenu) {
    trapFocus(navMenu);
}

// ==========================================
// PRINT STYLES OPTIMIZATION
// ==========================================

window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});