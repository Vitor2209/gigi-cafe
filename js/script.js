/**
 * ============================================
 * GIGI CAFÉ - JAVASCRIPT
 * ============================================
 * 
 * Features:
 * 1. Mobile menu toggle
 * 2. Smooth scrolling
 * 3. Header scroll effect
 * 4. Menu category tabs
 * 5. Scroll animations
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Elements
    // ============================================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.header__nav-link');
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuLists = document.querySelectorAll('.menu__list');

    // ============================================
    // 1. Mobile Menu Toggle
    // ============================================
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // 2. Smooth Scrolling
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 3. Header Scroll Effect
    // ============================================
    let lastScroll = 0;
    
    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Initial check
    handleHeaderScroll();

    // ============================================
    // 4. Menu Category Tabs
    // ============================================
    if (menuTabs.length > 0 && menuLists.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('menu__tab--active'));
                
                // Add active class to clicked tab
                this.classList.add('menu__tab--active');
                
                // Get category
                const category = this.getAttribute('data-category');
                
                // Hide all menu lists
                menuLists.forEach(list => list.classList.remove('menu__list--active'));
                
                // Show selected menu list
                const targetList = document.getElementById(`menu-${category}`);
                if (targetList) {
                    targetList.classList.add('menu__list--active');
                }
            });
        });
    }

    // ============================================
    // 5. Scroll Animations
    // ============================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }
    
    if (animatedElements.length > 0) {
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Initial check
    }

    // ============================================
    // 6. Active Navigation Link
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // ============================================
    // 7. Image Loading Animation
    // ============================================
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    console.log('Gigi Café website loaded successfully!');
});
