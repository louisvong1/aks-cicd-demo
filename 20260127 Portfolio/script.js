// ===== Scroll-based Navigation Highlighting =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

// Add scrolled class to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Highlight active section in navigation
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===== Smooth Scroll for Navigation Links =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations for Cards =====
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.expertise-card, .stat-card, .timeline-item, .contact-card');

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initialize cards with hidden state
document.querySelectorAll('.expertise-card, .stat-card, .timeline-item, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== Parallax Effect for Background Orbs =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.05 * (index + 1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Interactive Cursor Effect for Cards =====
const cards = document.querySelectorAll('.expertise-card, .contact-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Typing Effect for Hero Title (Optional Enhancement) =====
const createTypingEffect = () => {
    const nameElement = document.querySelector('.title-name');
    if (!nameElement) return;

    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.opacity = '1';

    let index = 0;
    const typeSpeed = 100;

    const typeWriter = () => {
        if (index < originalText.length) {
            nameElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        }
    };

    setTimeout(typeWriter, 1000);
};

// Uncomment the line below to enable typing effect
// createTypingEffect();

// ===== Dynamic Stats Counter Animation =====
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numberMatch = finalValue.match(/\d+/);

        if (numberMatch) {
            const target = parseInt(numberMatch[0]);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = finalValue.replace(/\d+/, Math.ceil(current).toString());
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = finalValue;
                }
            };

            // Start animation when stat card is visible
            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        statObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            statObserver.observe(stat.closest('.stat-card'));
        }
    });
};

window.addEventListener('load', animateStats);

// ===== Floating Animation for Hero Visual =====
const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
    let mouseX = 0;
    let mouseY = 0;
    let cardX = 0;
    let cardY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    const animateFloating = () => {
        cardX += (mouseX - cardX) * 0.05;
        cardY += (mouseY - cardY) * 0.05;

        floatingCard.style.transform = `translate(${cardX}px, ${cardY}px)`;
        requestAnimationFrame(animateFloating);
    };

    animateFloating();
}

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Console Message =====
console.log('%c👋 Welcome to Louis Vong\'s Portfolio!',
    'font-size: 20px; font-weight: bold; color: #00d4ff;'
);
console.log('%cLooking for a Solution Architect? Let\'s connect!',
    'font-size: 14px; color: #9d00ff;'
);

// ===== Fetch Visit Count from Backend API =====
document.addEventListener('DOMContentLoaded', () => {
    const countElement = document.getElementById('visit-count');

    // 這裡填入你 K8s Python Service 的網址 (74.176.141.105:5000)
    fetch('/api')
        .then(response => response.json())
        .then(data => {
            // 把後端回傳的數字填入 HTML
            countElement.textContent = data.count;
        })
        .catch(error => {
            console.error('Error fetching count:', error);
            countElement.textContent = 'Offline';
        });
});