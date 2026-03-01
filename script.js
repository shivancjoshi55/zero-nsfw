/* ===================================================================
   SHERYIANS CODING SCHOOL — FRONTEND CLONE
   JavaScript: Interactivity
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===================== ELEMENTS =====================
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const faqItems = document.querySelectorAll('.faq-item');
    const navLinks = document.querySelectorAll('.nav-link');

    // ===================== STICKY HEADER ON SCROLL =====================
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }, { passive: true });

    // ===================== HAMBURGER MENU =====================
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ===================== ACTIVE NAV LINK =====================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (matchingLink) matchingLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ===================== FAQ ACCORDION =====================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all others
            faqItems.forEach(i => i.classList.remove('open'));

            // Toggle clicked
            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            } else {
                question.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ===================== SCROLL REVEAL ANIMATIONS =====================
    // Add .fade-up class to all major sections
    const animatedElements = document.querySelectorAll(
        '.bento-card, .impact-card, .course-card, .testimonial-card, .placement-card, .faq-item, .section-badge, .section-title'
    );

    animatedElements.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // ===================== SMOOTH SCROLL OFFSET =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================== PARALLAX FLARES (subtle) =====================
    const flares = document.querySelectorAll('.hero-flare');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        flares.forEach((flare, i) => {
            const factor = i === 0 ? 1 : -1;
            flare.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    }, { passive: true });

});
