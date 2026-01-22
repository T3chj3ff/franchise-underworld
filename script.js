// Simple Scroll Reveal Script
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hero Animations (CSS classes handle the transition, we just ensure loaded)
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.3}s, transform 0.8s ease ${index * 0.3}s`;
        
        // Trigger reflow
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });

    // 2. Scroll Observer for other sections
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => {
        // Initial state set in JS to avoid accessibility issues if JS fails
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        
        observer.observe(el);
    });

    // Add class for the visible state
    // We append a style tag for the .visible class to keep logic centralized
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .delay-1 { transition-delay: 0.2s !important; }
        .delay-2 { transition-delay: 0.4s !important; }
    `;
    document.head.appendChild(style);
});
