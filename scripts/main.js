const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// =============================================
// LOADER SCREEN
// =============================================
function hideLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1400);
}
if (document.readyState === 'complete') {
    hideLoader();
} else {
    window.addEventListener('load', hideLoader);
}

// =============================================
// SCROLL PROGRESS BAR
// =============================================
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollProgress ? progress + '%' : '0%';
    });
}

// =============================================
// MAGNETIC CURSOR
// =============================================
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

if (dot && ring) {
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let initialized = false;

    // Start hidden to avoid zero-coordinate top-left blinking
    dot.style.opacity = '0';
    ring.style.opacity = '0';

    document.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
        if (!initialized) {
            dot.style.opacity = '1';
            ring.style.opacity = '1';
            initialized = true;
        }
    });

    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        if (initialized) {
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        }
    });

    function animateCursor() {
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';

        ringX += (dotX - ringX) * 0.12;
        ringY += (dotY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousedown', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    document.addEventListener('mouseup', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Hover effect: grow cursor on interactive elements
    const hoverTargets = 'a, button, .btn, .btn-send, .project-link, .contact-link, .nav-link, .nav-logo, input, textarea, [role="button"]';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) {
            dot.classList.add('cursor-hover');
            ring.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) {
            dot.classList.remove('cursor-hover');
            ring.classList.remove('cursor-hover');
        }
    });
}

// =============================================
// THREE.JS PARTICLES (HERO)
// =============================================
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas && window.innerWidth > 768 && !prefersReduced && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: heroCanvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x00E5A0,
        size: 0.015,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 5;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// =============================================
// GSAP HERO ANIMATIONS
// =============================================
if (typeof gsap !== 'undefined' && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);

    function runGsapHero() {
        // Set all hero elements to visible so GSAP can control them
        document.querySelectorAll('.hero [data-animate], .hero .terminal-block').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });

        const tl = gsap.timeline({ delay: 1.5 });

        tl.from('.status-badge', {
            y: -30, opacity: 0, duration: 0.6, ease: 'power3.out'
        })
            .from('.hero-name .char', {
                y: 120, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'power4.out'
            }, '-=0.3')
            .from('.hero-sub', {
                y: 20, opacity: 0, duration: 0.6, ease: 'power3.out'
            }, '-=0.3')
            .from('.hero-cta', {
                scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)'
            }, '-=0.2')
            .from('.terminal-block', {
                x: 60, opacity: 0, duration: 0.8, ease: 'power3.out'
            }, '-=0.8');

        // Section Headings: Scroll-Triggered Slide Animation
        gsap.utils.toArray('section h2.section-title').forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out'
            });
        });

        window.addEventListener('beforeunload', () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        });
    }

    if (document.readyState === 'complete') {
        runGsapHero();
    } else {
        window.addEventListener('load', runGsapHero);
    }
}

// =============================================
// VANILLA TILT CARDS
// =============================================
function initTiltEffect() {
    if (window.innerWidth > 768 && !prefersReduced && typeof VanillaTilt !== 'undefined') {
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            VanillaTilt.init(projectCards, {
                max: 8,
                speed: 400,
                glare: true,
                'max-glare': 0.15,
                scale: 1.03,
                perspective: 1000,
                easing: 'cubic-bezier(.03,.98,.52,.99)',
            });
        }
    }
}

// =============================================
// DYNAMIC PROJECT RENDERING
// =============================================
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer || typeof projects === 'undefined') {
        console.error('Projects container or data not found');
        return;
    }

    projectsContainer.innerHTML = projects.map((project, index) => `
        <div class="project-card" data-stagger="${index}">
            <div class="project-header">
                <div class="project-icon">${project.image || ''}</div>
                <span class="project-status">${project.status || 'Completed'}</span>
            </div>
            <h3 class="project-title">${project.name}</h3>
            ${project.description ? `<p class="project-value-prop">${project.description}</p>` : ''}
            ${project.valueProp ? `<p class="project-value-prop">${project.valueProp}</p>` : ''}
            ${project.bullets ? `<ul class="project-bullets">
                ${project.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
            </ul>` : ''}
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Source Code →</a>
                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo →</a>` : ''}
            </div>
        </div>
    `).join('');

    // Re-initialize tilt effect for newly spawned cards
    initTiltEffect();

    // Observer newly added cards
    const prjCards = document.querySelectorAll('.project-card');
    if (typeof generalObserver !== 'undefined') {
        prjCards.forEach(c => generalObserver.observe(c));
    }
}

document.addEventListener('DOMContentLoaded', renderProjects);

// =============================================
// ANIMATED HEADINGS (Underline in-view)
// =============================================
const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
}, { threshold: 0.5 });
document.querySelectorAll('section h2.section-title').forEach(h => headingObserver.observe(h));

// =============================================
// ANIMATED COUNTERS (STATS)
// =============================================
function animateCounter(el, target, duration = 1500, isDecimal = false) {
    if (!el) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = isDecimal ? target.toFixed(2) : Math.floor(target) + '+';
            clearInterval(timer);
        } else {
            el.textContent = isDecimal ? start.toFixed(2) : Math.floor(start) + '+';
        }
    }, 16);
}

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(document.getElementById('stat-projects'), 5);
                animateCounter(document.getElementById('stat-internships'), 2);
                animateCounter(document.getElementById('stat-cgpa'), 8.22, 1500, true);
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsStrip);
}

// =============================================
// ANIMATED SKILL BARS
// =============================================
const skillBarsSection = document.querySelector('.skill-bars');
if (skillBarsSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.skill-fill').forEach(bar => {
                    const target = bar.getAttribute('data-target');
                    bar.style.width = target + '%';
                    const label = bar.closest('.skill-bar-item').querySelector('.skill-percent');
                    let count = 0;
                    const interval = setInterval(() => {
                        count++;
                        if (label) label.textContent = count + '%';
                        if (count >= target) clearInterval(interval);
                    }, 1200 / target);
                });
                skillObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    skillObserver.observe(skillBarsSection);
}

// =============================================
// TIMELINE ANIMATION (WORK EXPERIENCE)
// =============================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item-cv').forEach(item => {
    timelineObserver.observe(item);
});

const timelineLine = document.querySelector('.timeline');
if (timelineLine) {
    const lineObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const line = document.querySelector('.timeline-line');
            if (line) line.classList.add('animate');
        }
    });
    lineObserver.observe(timelineLine);
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
const backBtn = document.getElementById('back-to-top');
if (backBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =============================================
// MOBILE MENU & NAVBAR
// =============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('mobile-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.padding = '0.8rem 2rem';
            navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
        } else {
            navbar.style.padding = '1.2rem 2rem';
            navbar.style.boxShadow = 'none';
        }
    }
});

// =============================================
// TERMINAL TYPEWRITER EFFECT
// =============================================
const terminalText = [
    "Initializing kevaljamnapara.me...",
    "Loading dependencies...",
    "Mounting React components...",
    "Training ML models... [OK]",
    "Deploying to production... ✓",
    "System ready. Welcome!"
];

const terminalOutput = document.getElementById('terminal-output');
let lineIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (!terminalOutput) return;

    if (lineIndex < terminalText.length) {
        if (charIndex === 0) {
            terminalOutput.innerHTML += '<div><span class="prompt">$</span> <span class="typing-line"></span></div>';
        }

        const currentLine = document.querySelectorAll('.typing-line')[lineIndex];

        if (charIndex < terminalText[lineIndex].length) {
            currentLine.textContent += terminalText[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, Math.random() * 40 + 20);
        } else {
            lineIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 400);
        }
    } else {
        terminalOutput.innerHTML += '<div><span class="prompt">$</span> <span class="terminal-cursor">_</span></div>';
    }
}

const heroSectionTyped = document.getElementById('home');
if (heroSectionTyped && terminalOutput) {
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !terminalOutput.hasAttribute('data-typed')) {
            terminalOutput.setAttribute('data-typed', 'true');
            // Give GSAP time to reveal terminal before typing
            setTimeout(typeWriter, 2000);
        }
    }, { threshold: 0.5 });
    heroObserver.observe(heroSectionTyped);
}

// =============================================
// STAGGERED SCROLL REVEAL (GENERAL)
// =============================================
const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Wait for gsap hero animation if it's the hero container
            if (entry.target.id === 'home' || entry.target.closest('#home')) {
                // GSAP handles hero elements, but container needs active class
                entry.target.classList.add('visible', 'active');
            } else {
                entry.target.classList.add('visible', 'active');
            }
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('[data-animate], .reveal, .sidebar-block, .stat-card, section, .work-card').forEach(el => {
    generalObserver.observe(el);
});
