// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Responsive navigation menu for mobile
const navBrand = document.querySelector('.nav-brand');
const navLinks = document.querySelector('.nav-links');

navBrand.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
    }
});

// Reset nav links display on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    }
});

// Initialize navigation menu state
if (window.innerWidth <= 768) {
    navLinks.style.display = 'none';
}

// Add active state to current section in navigation
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});