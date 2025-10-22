document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Handle loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 1000);
    }, 2500);
    
    // Create floating hearts in the background
    createFloatingHearts();
    
    // Initialize music control
    initMusicControl();
    
    // Initialize navigation dots
    initNavigation();
    
    // Initialize card animations
    initScrollAnimations();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize photo gallery
    initPhotoGallery();
});

// Create floating hearts in background
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Random position, size and animation duration
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 30 + 15}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(heart);
    }
}

// Initialize music controls
function initMusicControl() {
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    
    musicToggle.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicToggle.classList.remove('muted');
        } else {
            music.pause();
            musicToggle.classList.add('muted');
        }
    });
}

// Initialize navigation dots
function initNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.timeline-section');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = dot.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active dot on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 200;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                navDots.forEach(dot => dot.classList.remove('active'));
                
                if (section.id) {
                    const activeDot = document.querySelector(`.nav-dot[data-section="${section.id}"]`);
                    if (activeDot) {
                        activeDot.classList.add('active');
                    }
                } else if (index < navDots.length) {
                    navDots[index].classList.add('active');
                }
            }
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Animate content cards
    gsap.utils.toArray('.content-card').forEach(card => {
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animate milestones
    gsap.utils.toArray('.animated-milestone').forEach(milestone => {
        gsap.fromTo(milestone, 
            { opacity: 0, scale: 0.9 },
            { 
                opacity: 1, 
                scale: 1, 
                duration: 1,
                scrollTrigger: {
                    trigger: milestone,
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Celebration title animation
    gsap.fromTo('.celebration-title', 
        { opacity: 0, scale: 0.8 },
        { 
            opacity: 1, 
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
                trigger: '.celebration-title',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
    
    // Photo gallery animation
    gsap.fromTo('.photo-gallery', 
        { opacity: 0, y: 50 },
        { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.photo-gallery',
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    // Future scenes animation
    gsap.utils.toArray('.future-scene').forEach((scene, index) => {
        gsap.fromTo(scene, 
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            { 
                opacity: 1, 
                x: 0,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: scene,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Future vignettes animation
    gsap.utils.toArray('.vignette').forEach((vignette, index) => {
        gsap.fromTo(vignette, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0,
                duration: 0.8,
                delay: index * 0.3,
                scrollTrigger: {
                    trigger: vignette,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Final message animation
    gsap.fromTo('.final-message h2', 
        { opacity: 0, scale: 0.5 },
        { 
            opacity: 1, 
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
            scrollTrigger: {
                trigger: '.final-message',
                start: "top 60%",
                toggleActions: "play none none none"
            }
        }
    );
    
    gsap.fromTo('.heart-animation', 
        { opacity: 0 },
        { 
            opacity: 1,
            duration: 1,
            delay: 0.5,
            scrollTrigger: {
                trigger: '.final-message',
                start: "top 60%",
                toggleActions: "play none none none"
            }
        }
    );
    
    gsap.fromTo('.signature', 
        { opacity: 0, y: 20 },
        { 
            opacity: 1, 
            y: 0,
            duration: 1,
            delay: 1,
            scrollTrigger: {
                trigger: '.final-message',
                start: "top 60%",
                toggleActions: "play none none none"
            }
        }
    );
    
    // Parallax effects for background elements
    gsap.to('.parallax-stars', {
        y: 300,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
}

// Initialize interactive elements
function initInteractiveElements() {
    const interactiveElements = document.querySelectorAll('.interactive-element');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            element.classList.toggle('expanded');
        });
    });
}

// Initialize photo gallery
function initPhotoGallery() {
    const gallery = document.querySelector('.gallery-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const itemWidth = document.querySelector('.gallery-item').offsetWidth;
    
    let scrollAmount = 0;
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;
    
    nextBtn.addEventListener('click', () => {
        scrollAmount += itemWidth + 20; // item width + gap
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        gallery.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    prevBtn.addEventListener('click', () => {
        scrollAmount -= itemWidth + 20; // item width + gap
        if (scrollAmount < 0) scrollAmount = 0;
        gallery.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}
