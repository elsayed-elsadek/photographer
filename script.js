// Import translations
import { translations } from './translations.js';

// Initialize AOS with better settings for performance and responsiveness
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        delay: 100,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize language
    initLanguage();

    // Initialize blog carousel
    initBlogCarousel();

    // Initialize full screen image functionality
    initFullScreenImages();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize navbar scroll effect
    initNavbarScroll();
});

// Initialize language
function initLanguage() {
    let currentLang = localStorage.getItem('language') || 'en';
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
    
    applyTranslations(currentLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            localStorage.setItem('language', lang);
            applyTranslations(lang);
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Apply translations to the page
function applyTranslations(lang) {
    document.documentElement.lang = lang;
    
    if (lang === 'ru') {
        document.body.classList.add('ru-lang');
    } else {
        document.body.classList.remove('ru-lang');
    }
    
    const translation = translations[lang];
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        if (translation[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translation[key];
            } else {
                element.innerHTML = translation[key];
            }
        }
    });
}

// Initialize full screen image functionality
function initFullScreenImages() {
    const blogImages = document.querySelectorAll('.blog-img, .vibe-item img');
    const fullScreenImage = document.getElementById('fullScreenImage');
    const fullScreenImg = document.getElementById('fullScreenImg');
    const closeButton = document.getElementById('closeButton');

    // Add pointer cursor to all clickable images
    blogImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
    });

    // Click handler for images
    blogImages.forEach(img => {
        img.addEventListener('click', (e) => {
            openFullScreenImage(img);
        });
        
        // Add keyboard support
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFullScreenImage(img);
            }
        });
    });

    // Close button handler
    closeButton.addEventListener('click', closeFullScreenImage);
    
    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullScreenImage.style.display === 'flex') {
            closeFullScreenImage();
        }
    });

    // Close when clicking outside image
    fullScreenImage.addEventListener('click', (e) => {
        if (e.target === fullScreenImage) {
            closeFullScreenImage();
        }
    });
}

function openFullScreenImage(img) {
    const fullScreenImage = document.getElementById('fullScreenImage');
    const fullScreenImg = document.getElementById('fullScreenImg');
    
    fullScreenImage.style.display = 'flex';
    fullScreenImg.src = img.src;
    fullScreenImg.alt = img.alt || 'Full screen image';
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    setTimeout(() => {
        fullScreenImage.classList.add('show');
    }, 10);
    
    // Focus close button for keyboard users
    document.getElementById('closeButton').focus();
}

function closeFullScreenImage() {
    const fullScreenImage = document.getElementById('fullScreenImage');
    fullScreenImage.classList.remove('show');
    setTimeout(() => {
        fullScreenImage.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close navbar if mobile menu is open
                const navbar = document.querySelector('.navbar-collapse');
                if (navbar.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    toggler.click();
                }
            }
        });
    });
}

// Initialize navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
    });
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Initialize blog carousel (empty function as it's not implemented yet)
function initBlogCarousel() {
    // Implementation can be added here if needed
}